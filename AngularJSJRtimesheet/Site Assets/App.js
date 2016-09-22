	var TSListName = 'TimeSheetList';
	var TimeLogListName = 'TSDetails';
	var EmpListName = 'Employees';
	var PayPeriodListName = 'Pay Period';
	var TSNumberPrefix = 'TS-';
	
	var tsApp = angular.module('tsApp', ['blockUI','ngRoute','xeditable','ui.bootstrap']);
	
	tsApp.constant('FORM_STATUS', {
			statusNewForm : 'New Form',
	        statusForApproval : 'For Approval',
	        statusApproved : 'Approved by Manager',
			statusDeclined : 'Declined by Manager',
			statusEditForm : 'For Edit'
	});
	tsApp.constant('Page_Mode', {
			initialSave : 'S',
	        editMode : 'E'
	});
	tsApp.run(function(editableOptions) {
	  editableOptions.theme = 'bs3'; 
	});	  
	tsApp.config(['$routeProvider','blockUIConfig',
	  function($routeProvider,blockUIConfig) {
	  
		blockUIConfig.message = 'Please wait...!';
		blockUIConfig.delay = 100;
		blockUIConfig.autoInjectBodyBlock = false;
		
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
	      .when('/AddNewTS/:TSN/:Page_Mode', {
			templateUrl: 'NewTS.aspx',
			controller: 'addNewTimesheetCtrl'
	      })	      
	      .when('/EditTS/:TSN/:Page_Mode', {
			templateUrl: 'NewTS.aspx',
			controller: 'addNewTimesheetCtrl'
	      })            
	      .otherwise("/");
	}]);

	var timesheet = 
		{Id:0, title:"", status:"", totalMinute:0, payPeriodId:{ID:0, Description:""}, costCodeId:{ID:0, Description:""}, number:null, requestorComment:"", approverComment:"", visible:true, selectedTimeLog:{ID:0 }, timelogs:[] };
	var costCodesCurrentUser = [];
	var payPeriodsNearby = [];
	
console.log("in App js ");

$(document).ready(function () {
	console.log("in App js in document ready");
});
