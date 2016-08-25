	var TSListName = 'TimeSheetList';
	var EmpListName = 'Employees';
	var PayPeriodListName = 'Pay Period';
	var TSNumberPrefix = 'TS-';
	var tsApp = angular.module('tsApp', ["ngRoute"]);
	
	tsApp.constant('FORM_STATUS', {
			statusNewForm : 'New Form',
	        statusForApproval : 'For Approval',
	        statusApproved : 'Approved by Manager',
			statusDeclined : 'Declined by Manager',
			statusEditForm : 'For Edit'
	});

	tsApp.config(['$routeProvider',
	  function($routeProvider) {
	    $routeProvider
	      .when('/Staffs', {
			templateUrl: 'Staffs.aspx',
			controller: 'timesheetCtrl'
	      })
	      .when('/Managers', {
			templateUrl: 'Managers.aspx',
			controller: 'managerCtrl'
	      })
	      .when('/Admins', {
			templateUrl: 'Admin.aspx',
			controller: 'adminCtrl'
	      })
	      .when('/AddNewTS/:TSN/:PageMode', {
			templateUrl: 'NewTS.aspx',
			controller: 'addNewTimesheetCtrl'
	      })      
	      .otherwise("/");
	}]);

	var timesheet = 
		{Id:0, title:"", status:"", totalMinute:0, payPeriodId:{ID:0, Description:""}, costCodeId:{ID:0, Description:""}, number:null, requestorComment:"", approverComment:"", visible:true};
	var costCodesCurrentUser = [];
	var payPeriodsNearby = [];
console.log("in App js ");

$(document).ready(function () {
	console.log("in App js in document ready");
});
