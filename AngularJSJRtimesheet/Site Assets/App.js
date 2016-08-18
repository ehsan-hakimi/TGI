	var TSListName = 'TimeSheetList';
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
	      .when('/AddNewTS', {
			templateUrl: 'NewTS.aspx',
			controller: 'addNewTimesheetCtrl'
	      })
	      .otherwise("/");
	}]);

	var timesheet = 
		{Id:0, title:"", status:"", totalMinute:0, payPeriodId:0, payPeriodTxt:"", costCodeId:0, costCodeTxt:"", number:null, requestorComment:"", approverComment:"", visible:true};
	var costCodesCurrentUser = [];
console.log("in App js ");

$(document).ready(function () {
	console.log("in App js in document ready");
});
