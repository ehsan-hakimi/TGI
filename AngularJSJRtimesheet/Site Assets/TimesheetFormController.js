	function calculateSubtotalMinutes(startTime, finishTime, breakTime){
		var subtotalMinutes = 0;
		var start = convertStringTimeToMinute(startTime);
		var end = convertStringTimeToMinute(finishTime);
		subtotalMinutes = end - start;
		if(subtotalMinutes > 0 )
			subtotalMinutes = subtotalMinutes - breakTime;
		return subtotalMinutes;
	}
	function convertStringTimeToMinute(timeToConvert){
		var result = timeToConvert.split(":");
		var totalMinutes = 0;
		if( !isNaN(Number(result[0])) && !isNaN(Number(result[1])) )
			totalMinutes = Number(result[0])*60 + Number(result[1]);
		return totalMinutes;
	}
	function convertMinuteToHour(totalMinutes) {
	var totalHours;
	if (!isNaN(totalMinutes)) {
	  var minutes = totalMinutes % 60;
	  var hours = ((totalMinutes - minutes) / 60);
	
	  if (minutes < 10)
	    minutes = "0" + minutes;
	  totalHours = hours + ":" + minutes;
	} else {
	  totalHours = "0:0";
	}
	return totalHours;
	}
	
	function dateInRightFormat(SPdateformat) {
	var australiaTimeZoneModified;
	australiaTimeZoneDate = new Date(SPdateformat);
	return australiaTimeZoneDate.toLocaleDateString() + " " + australiaTimeZoneDate.getHours() + ":" + australiaTimeZoneDate.getMinutes();
	}

tsApp.controller('timesheetCtrl', ['$scope', 'FORM_STATUS', 'Page_Mode', 'SharePointJSOMService', function($scope, FORM_STATUS, Page_Mode, SharePointJSOMService) {
  SP.SOD.executeOrDelayUntilScriptLoaded(showAllTSLists, "SP.js");

  function showAllTSLists() {
    console.log('in timesheetCtrl showAllTSLists() function');
    $scope.timesheets = [];
    $scope.FORM_STATUS = FORM_STATUS;
	$scope.Page_Mode = Page_Mode;    

    $.when(SharePointJSOMService.getAllTimesheetListByREST($scope, TSListName))
      .done(function(jsonObject) {

        console.log('in timesheetCtrl when SharePointJSOMService.getAllTimesheetListByREST');
        angular.forEach(jsonObject.d.results, function(ts) {

          $scope.timesheets.push({
            TSID: ts.Id,
            title: ts.Title,
            Payperiod: ts.TSPayPeriodFromTo.FromTo,
            Costcode: ts.TSCostCode.Description,
            number: ts.TSNumber,
            status: ts.TSStatus,
            totalHours: ts.TSTotalMinute,
            approver: ts.Editor.Title,
            approverComment: ts.TSApproverComment,
            modified: dateInRightFormat(ts.Modified),
            created: dateInRightFormat(ts.Created)
          });
        });
          //$scope is not updating so force with this command
          if (!$scope.$$phase) {
            $scope.$apply();
          }
      })
      .fail(function(err) {
        console.info(JSON.stringify(err));
      });
  }
}]);


tsApp.controller('addNewTimesheetCtrl', ['$scope', 'FORM_STATUS', 'Page_Mode', 'SharePointJSOMService', '$routeParams','$location', 'blockUI',
								function($scope, FORM_STATUS, Page_Mode, SharePointJSOMService, $routeParams, $location, blockUI) {
								
    console.log('in addNewTimesheetCtrl TSN='+$routeParams.TSN); 
    $scope.costCodes = [];
    $scope.payPeriods = [];
	$scope.timesheet = timesheet;  
	$scope.timesheet.timelogs = [];  
	$scope.warningMsg ="";
	$scope.successMsg="";
	$scope.Page_Mode = Page_Mode;
    
    console.log("before call length is ="+costCodesCurrentUser.length);
    if (costCodesCurrentUser.length === 0) { getCostCodesCurretUser(); }
    else{ $scope.costCodes=costCodesCurrentUser;	} 
    
    if (payPeriodsNearby.length === 0) { getPayPeriodsNearby();	}
    else{ $scope.payPeriods = payPeriodsNearby ; } 
    	  
    if($routeParams.TSN == 0){ //mode New
    	console.log("in New mode");
	    $scope.warningMsg = "Warning! You should save form by clicking Next button then you are able to add your time logs.";

	    $scope.timesheet.number = null;
	    $scope.timesheet.costCodeId.ID = 0;
	    $scope.timesheet.payPeriodId.ID = 0;
	    $scope.timesheet.title="";		       			  	    
	    $scope.timesheet.requestorComment ="";
    }else{//mode Edit
		if($routeParams.Page_Mode === Page_Mode['initialSave']){
			$scope.successMsg = "Form saved successfully. Now you can enter you time logs.";				
		}
		$scope.warningMsg = "Please press Save & Exite button for saving all of your changes in time logs.";
		var fetch = fetchTimesheet($scope , $routeParams.TSN);
		
		fetch.then(function(){
			if(!($scope.timesheet.status == FORM_STATUS['statusNewForm'] ) && !($scope.timesheet.status == FORM_STATUS['statusEditForm'] ) ){
				$scope.$apply(function () {             
					var errorMessage = {'error':{'message':{'value':'Tmiesheet with this status is not editable.'}}};
					$scope.errorMsg = errorMessage.error.message.value;
					console.info("Timesheet ID = "+$scope.timesheet.number+" Try for editing the timesheet which is in approval process!! You can't edit forms with this status");
				});//end of apply
			  }//end of if status not equal edit mode
	          showTimeLogs($scope.timesheet.number);
        });//end of then
		console.log("in Edit mode $scope.warningMsg= "+$scope.warningMsg+" $scope.successMsg= "+$scope.successMsg+" $scope.errorMsg = "+$scope.errorMsg );
    } //end of if Edit Mode
    
    $scope.changeCCDropdown= function($event) {
      //$event.preventDefault();
      
	}//end of function changeCCDropdown()
	
	$scope.isNewMode = function(){
		return !(FORM_STATUS['statusNewForm'] === $scope.timesheet.status);
	}
	
    $scope.addTimesheet = function($event) {
      
	  blockUI.start('We are saving your timesheet. Please wait!');
      $event.preventDefault();
      $.when(SharePointJSOMService.addTimesheetUpdateTSNumber($scope, TSListName))
        .done(function(TimesheetNumber) {

	          console.log('in addNewTimesheetCtrl when done TimesheetNumber= '+TimesheetNumber);
	          $scope.timesheet.number = TimesheetNumber;
			  $routeParams.TSN = TimesheetNumber;
			  $routeParams.Page_Mode = Page_Mode['initialSave'];

		  $scope.$apply(function () {
		  	 blockUI.stop();
		  	 $location.path("/AddNewTS/"+$routeParams.TSN+"/"+$routeParams.Page_Mode);
	      });  
        })
        .fail(function(err) {
        	console.info(JSON.stringify(err));
	        $scope.$apply(function () {
	            $scope.errorMsg = "Unable to save your timesheet. Please try again and if you see this message again, you should contact System Administrator or HR team";
	        });        	
        });
    };//end of function addTimesheet()
	
    $scope.updateTimesheet = function($event) {
      
	  blockUI.start('We are updating your timesheet. Please wait!');
	  $event.preventDefault();
	  
      $.when(SharePointJSOMService.updateTimesheet($scope, TSListName))
        .done(function(TimesheetNumber) {

	          console.log('in updateTimesheet ');
	          $scope.timesheet.number = TimesheetNumber;
	          $scope.$apply(function () {
		          blockUI.stop();
			  	  $location.path("/Staffs");
			  });  
        })
        .fail(function(err) {
        	console.info(JSON.stringify(err));
	        $scope.$apply(function () {
	            $scope.warningMsg = "Unable to update your timesheet. Please try again and if you see this message again, you should contact System Administrator or HR team";
	        });        	
        });
    };//end of function updateTimesheet()
    
    function fetchTimesheet($scope , timesheetNumber){

    var fetchPromise = $.when(SharePointJSOMService.getTimesheetByREST($scope,TSListName ,timesheetNumber))
      .done(function(data) { 
		  $scope.$apply(function () {             
	          var ts = data.d;
	          
	          $scope.timesheet.Id = ts.ID;
	          $scope.timesheet.number = ts.TSNumber;
	          $scope.timesheet.title = ts.Title;
	          $scope.timesheet.status = ts.TSStatus;
	          $scope.timesheet.totalMinute = ts.TSTotalMinute;
	          $scope.timesheet.payPeriodId.ID = ts.TSPayPeriodFromToId;
	          $scope.timesheet.costCodeId.ID = ts.TSCostCodeId;
	          
	          $scope.timesheet.requestorComment = ts.TSRequesterComment;
	          $scope.timesheet.approverComment = ts.TSApproverComment;
	          $scope.timesheet.visible = ts.TSVisible;
		  });			          
      })
      .fail(function(err,msg) {    	
			    console.info(JSON.stringify(err));
		      	//if(JSON.stringify(msg).length > 0)
				$scope.errorMsg = msg.error.message.value;
      });   
      return fetchPromise;
    };//end of function fetchTimesheet()
    
	function getCostCodesCurretUser(){
	
	    $.when(SharePointJSOMService.getCostCodeListByREST($scope,EmpListName ))
	      .done(function(jsonObject) {
	        angular.forEach(jsonObject.d.results, function(cc) {
	
	          $scope.costCodes.push({
	            Description: cc.CostCodeID.Description,
	            ID: cc.CostCodeID.ID
	          });
	          //$scope is not updating so force with this command
	          if (!$scope.$$phase) {
	            $scope.$apply();
	          }          
	        });
	        costCodesCurrentUser = $scope.costCodes;
	        console.log("in timesheetCtrl when call getCostCodesCurretUser() costCodesCurrentUser length is ="+costCodesCurrentUser.length+" and $scope.costCodes length is ="+$scope.costCodes.length);
	      })
	      .fail(function(err) {
	        console.info(JSON.stringify(err));
	      });
	
	}//end of function getCostCodesCurretUser()
	
	function getPayPeriodsNearby(){
	
	    $.when(SharePointJSOMService.getPayPeriodsByREST($scope,PayPeriodListName ))
	      .done(function(jsonObject) {
	        angular.forEach(jsonObject.d.results, function(pp) {
	
	          $scope.payPeriods.push({
	            Description: pp.FromToDate,
	            ID: pp.ID
	          });
	          //$scope is not updating so force with this command
	          if (!$scope.$$phase) {
	            $scope.$apply();
	          }          
	        });
	        payPeriodsNearby = $scope.payPeriods;
	        console.log("in timesheetCtrl when call getPayPeriodsNearby() payPeriodsNearby length is ="+payPeriodsNearby.length+" and $scope.payPeriods length is ="+$scope.payPeriods.length);
	      })
	      .fail(function(err) {
	        console.info(JSON.stringify(err));
	      });
			
	}//end of function getPayPeriodNearby()
	
//************************************Inline Edit for TimeLogs start **************************************
    function showTimeLogs(timesheetID){

	    $.when(SharePointJSOMService.getAllTimelogsByREST($scope, TimeLogListName,timesheetID))
	      .done(function(jsonObject) {
	        console.log('in ctrl when SharePointJSOMService.getAllTimelogsByREST');
	        angular.forEach(jsonObject.d.results, function(tl) {
	          $scope.timesheet.timelogs.push({
	            TLID: tl.Id,
	            title: tl.Title,
	            logDate: new Date(tl.TSLogDate),
	            startTime: tl.TSStartTime,
	            finishTime: tl.TSFinishTime,
	            logBreaks: tl.TSLogBreak,
	            subTotalMinutes: tl.TSLogSubtotalMinutes
	          });
	        });
          //$scope is not updating so force with this command
          if (!$scope.$$phase) {
            $scope.$apply();
          }
          console.log("time logs count is = "+$scope.timesheet.timelogs.length);
	      })
	      .fail(function(err) {
	        console.info(JSON.stringify(err));
	      });
	};

	$scope.checkTitle = function(data) {
	   /* if (data !== 'TS-88') {
	      return "Title should be `TS-88`";
	    }*/
	  };
	$scope.checkStartTime = function(data){
		regexp=/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
		if(!regexp.test(data))
			return "Enter a correct format (HH:mm) for start time. (example 08:09)"
	}
	$scope.checkFinishTime = function(data){
		regexp=/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
		if(!regexp.test(data))
			return "Enter a correct format (HH:mm) for finish time. (example 08:09)"
	}
	$scope.checkBreak = function(data){
		if((data == null) || (isNaN(Number(data))) )
			return "Enter a number between 0-99 minutes as a break";
			
	}
	
	  $scope.saveTimeLog= function($event, data, timeLogForm) {
        var subtotalMins = calculateSubtotalMinutes(data.StartTime, data.FinishTime, data.LogBreak);
        if(subtotalMins == 0){        
	        	errorMessage = {'error':{'message':{'value':'TimeLog start/finish times are not valid.'}}};
	        	console.info("TimeLog times are not valid");
	        	$scope.warningMsg = "TimeLog start/finish times are not valid.";
	        	timeLogForm.$setError('StartTime', 'Time log sub total amount should be more than 1 minute.');
	        	 return "TimeLog start/finish times are not valid.";
		} 		
		if($scope.timesheet.selectedTimeLog.ID == 0){ //insert mode
			blockUI.start('We are saving your logs. Please wait!');
			//$event.preventDefault();
			
			$.when(SharePointJSOMService.addTimeLog(data , TimeLogListName , $scope.timesheet.number ,subtotalMins ))
			.done(function(TimeLogNumber) {
			
			      console.log('in addNewTimesheetCtrl saveTimeLog when done TimeLogNumber= '+TimeLogNumber);			
			  $scope.$apply(function () {
			  	 blockUI.stop();
			  	 //$location.path("/EditTS/"+$scope.timesheet.number+"/"+Page_Mode['editMode']);
			  	 $scope.timesheet.timelogs =  [];
			  	 $scope.warningMsg = "Please press Save & Exite button for saving all of your changes in time logs.";
			  	 showTimeLogs($scope.timesheet.number );
			  });  
			})
			.fail(function(err) {
				console.info(JSON.stringify(err));
			    $scope.$apply(function () {
			        $scope.errorMsg = "Unable to save your timelog. Please try again and if you see this message again, you should contact System Administrator or HR team";
			    });        	

			});
		
		}else{ //update mode
	
		}
	  };
	
	  // remove TimeLogs 
	  $scope.removeTimeLog = function(index , TLID) {
	    //$scope.timesheet.timelogs.splice(index, 1);
		blockUI.start('We are deleting your time logs. Please wait!');	    
		$.when(SharePointJSOMService.deleteTimeLog (TimeLogListName , TLID))
		.done(function() {
		      console.log('in addNewTimesheetCtrl removeTimeLog when done TimeLogID deleted record is = ');			
		  $scope.$apply(function () {
		  	 blockUI.stop();
		  	 $scope.timesheet.timelogs =  [];
		  	 showTimeLogs($scope.timesheet.number );
		  });  
		})
		.fail(function(err) {
			console.info(JSON.stringify(err));
		    $scope.$apply(function () {
		        $scope.errorMsg = "Unable to save your timelog. Please try again and if you see this message again, you should contact System Administrator or HR team";
		    });        	

		});
	    
	  };

	  // add TimeLogs 
	  $scope.addTimeLog = function($event) {
	    $scope.inserted = {
            title: '',
            logDate: null,
            startTime: null,
            finishTime: null,
            logBreaks: 0,
            subTotalMinutes: null
	      };
	    $scope.timesheet.timelogs.push($scope.inserted);
	  };
	  
	$scope.opened = {};
	
	$scope.open = function($event, elementOpened) {
		$event.preventDefault();
		$event.stopPropagation();
	
		$scope.opened[elementOpened] = !$scope.opened[elementOpened];
	};	
	$scope.calOptions = {
		minDate: new Date(),
		showWeeks: false
	};  
//***********************************Inline Edit for TimeLogs END************************************    
}]);
tsApp.filter('minuteToHour', function(){
  return function(number){
    if(isNaN(number)){
    	return number;
    } else if(Number(number) >= 0){
	    var h = Math.floor(number / 60);
		var m = number % 60;
		m = m < 10 ? '0' + m : m;
		return h + ':' + m;
    } else {
    	return number;
    }
  }
});

tsApp.controller('managerCtrl', ['$scope', function($scope) {

	$scope.message = 'This is manager screen';
}]);

tsApp.controller('adminCtrl', ['$scope', function($scope) {

	$scope.message = 'This is admin screen';
}]);
