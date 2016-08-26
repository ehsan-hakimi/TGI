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
            totalHours: convertMinuteToHour(ts.TSTotalMinute),
            approver: ts.Editor.Title,
            approverComment: ts.TSApproverComment,
            modified: dateInRightFormat(ts.Modified),
            created: dateInRightFormat(ts.Created),
          });
          //$scope is not updating so force with this command
          if (!$scope.$$phase) {
            $scope.$apply();
          }
        });
      })
      .fail(function(err) {
        console.info(JSON.stringify(err));
      });
  }
}]);

tsApp.controller('addNewTimesheetCtrl', ['$scope', 'FORM_STATUS', 'Page_Mode', 'SharePointJSOMService', '$routeParams','$location', function($scope, FORM_STATUS, Page_Mode, SharePointJSOMService, $routeParams, $location) {
    console.log('in addNewTimesheetCtrl TSN='+$routeParams.TSN); 
    $scope.costCodes = [];
    $scope.payPeriods = [];
	$scope.timesheet = timesheet;    
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
	    $scope.warningMsg = "Warning! You should save form first by clicking save button then you are able to add your time logs.";

	    $scope.timesheet.number = null;
	    $scope.timesheet.costCodeId.ID = 0;
	    $scope.timesheet.payPeriodId.ID = 0;
	    $scope.timesheet.title="";		       			  	    
    }else{//mode Edit
		if($routeParams.Page_Mode === Page_Mode['initialSave'])
			$scope.successMsg = "(Page_Mode initialSave) Success: Form saved successfully. Now you can enter you time logs.";				
		
		var fetch = fetchTimesheet($scope , $routeParams.TSN);
		
		fetch.then(function(){
			if(!($scope.timesheet.status == FORM_STATUS['statusNewForm'] ) && !($scope.timesheet.status == FORM_STATUS['statusEditForm'] ) ){
				$scope.$apply(function () {             
					var errorMessage = {'error':{'message':{'value':'Tmiesheet with this status is not editable.'}}};
					$scope.errorMsg = errorMessage.error.message.value;
					console.info("Timesheet ID = "+$scope.timesheet.number+" Try for editing the timesheet which is in approval process!! You can't edit forms with this status");
				});//end of apply
			  }//end of if status not equal edit mode
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
      $event.preventDefault();

      $.when(SharePointJSOMService.addTimesheetUpdateTSNumber($scope, TSListName))
        .done(function(TimesheetNumber) {

	          console.log('in addNewTimesheetCtrl when done TimesheetNumber= '+TimesheetNumber);
	          $scope.timesheet.number = TimesheetNumber;
			  $routeParams.TSN = TimesheetNumber;
			  $routeParams.Page_Mode = Page_Mode['initialSave'];

		  $scope.$apply(function () {
			  $scope.warningMsg = "";
		      $scope.successMsg = "Success: Form saved successfully. Now you can enter you time logs.";
		  	 $location.path("/AddNewTS/"+$routeParams.TSN+"/"+$routeParams.Page_Mode);
	      });  
        })
        .fail(function(err) {
        	console.info(JSON.stringify(err));
	        $scope.$apply(function () {
	            $scope.warningMsg = "Unable to save your timesheet. Please try again and if you see this message again, you should contact System Administrator or HR team";
	        });        	
        });
    };//end of function addTimesheet()
    
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
      
}]);


tsApp.controller('managerCtrl', ['$scope', function($scope) {

	$scope.message = 'This is manager screen';
}]);

tsApp.controller('adminCtrl', ['$scope', function($scope) {

	$scope.message = 'This is admin screen';
}]);
