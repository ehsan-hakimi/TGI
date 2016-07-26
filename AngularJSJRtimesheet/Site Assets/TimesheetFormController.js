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
    $scope.timesheetForm = [];      
    
    $scope.addTimesheet = function($event) {
      $event.preventDefault();

      $.when(SharePointJSOMService.addTimesheet(TSListName, $scope.timesheet.title))
        .done(function(id) {

          console.log('in addNewTimesheetCtrl when SharePointJSOMService.addTimesheet');
		  $scope.warningMsg = "";
	      $scope.successMsg = "Success: Form saved successfully. Now you can enter you time logs.";
          $scope.timesheetForm.push({
            text: $scope.timesheet.title,
            id: timesheet.Id
          });
		console.log("timesheet="+timesheet.title+" "+timesheet.Id);
          //$scope is not updating so force with this command
          if (!$scope.$$phase) {
            $scope.$apply();
          }

          $scope.timesheet.title = '';

        })
        .fail(function(err) {
          console.info(JSON.stringify(err));
        });

    };
  
}]);

tsApp.controller('managerCtrl', ['$scope', function($scope) {

	$scope.message = 'This is manager screen';
}]);

tsApp.controller('adminCtrl', ['$scope', function($scope) {

	$scope.message = 'This is admin screen';
}]);
