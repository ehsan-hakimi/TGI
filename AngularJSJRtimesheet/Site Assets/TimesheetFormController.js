tsApp.controller('timesheetCtrl', ['$scope', 'FORM_STATUS', 'SharePointJSOMService', function($scope, FORM_STATUS, SharePointJSOMService) {
  console.log('in timesheetCtrl');
  SP.SOD.executeOrDelayUntilScriptLoaded(showAllTSLists, "SP.js");

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

  function showAllTSLists() {
    console.log('in timesheetCtrl showAllTSLists() function');
    $scope.timesheets = [];
    $scope.FORM_STATUS = FORM_STATUS;

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

tsApp.controller('addNewTimesheetCtrl', ['$scope', 'FORM_STATUS', 'SharePointJSOMService', function($scope, FORM_STATUS, SharePointJSOMService) {
    console.log('in addNewTimesheetCtrl');
    $scope.warningMsg = "Warning! You should save form first by clicking save button then you are able to add your time logs.";
    $scope.timesheet = timesheet;
    $scope.costCodes = [];
    console.log("before call length is ="+costCodesCurrentUser.length);
    if (costCodesCurrentUser.length == 0){getCostCodesCurretUser();}
    else {$scope.costCodes=costCodesCurrentUser;}
    console.log("Timesheet costCode="+timesheet.costCodeId.Description);
    
    
    $scope.changeCCDropdown= function($event) {
      //$event.preventDefault();
      //alert("$scope.timesheet.costCodeId="+$scope.timesheet.costCodeId);
	}
	
    $scope.addTimesheet = function($event) {
      $event.preventDefault();

      $.when(SharePointJSOMService.addTimesheetUpdateTSNumber($scope, TSListName))
        .done(function(TimesheetNumber) {

          console.log('in addNewTimesheetCtrl when SharePointJSOMService.addTimesheet TimesheetNumber='+TimesheetNumber);
          $scope.timesheet.number = TimesheetNumber;
		  $scope.warningMsg = "";
	      $scope.successMsg = "Success: Form saved successfully. Now you can enter you time logs.";

          //$scope is not updating so force with this command
          if (!$scope.$$phase) {
            $scope.$apply();
          }
          //$scope.timesheet.title = '';
        })
        .fail(function(err) {
          console.info(JSON.stringify(err));
        });

    };//end of function addTimesheet()
    
	function getCostCodesCurretUser(){
	
    $.when(SharePointJSOMService.getCostCodeListByREST($scope,"Employees"))
      .done(function(jsonObject) {

        console.log('in timesheetCtrl when call getCostCodesCurretUser');

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
        console.log("in method getCostCodesCurretUser() costCodesCurrentUser length is ="+costCodesCurrentUser.length+" and $scope.costCodes length is ="+$scope.costCodes.length);
      })
      .fail(function(err) {
        console.info(JSON.stringify(err));
      });
	
	}//end of function getCostCodesCurretUser()
  
}]);

tsApp.controller('managerCtrl', ['$scope', function($scope) {

	$scope.message = 'This is manager screen';
}]);

tsApp.controller('adminCtrl', ['$scope', function($scope) {

	$scope.message = 'This is admin screen';
}]);
