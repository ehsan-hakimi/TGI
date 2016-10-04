	var TSListName = 'TimeSheetList';
	var TimeLogListName = 'TSDetails';
	var EmpListName = 'Employees';
	var PayPeriodListName = 'Pay Period';
	var TSNumberPrefix = 'TS-';
	
	var adminModule = angular.module('AdminModule', []);	
	var staffModule = angular.module('StaffModule', ['blockUI','ngRoute','xeditable','ui.bootstrap']);
		
	var tsApp = angular.module('tsApp', ['StaffModule','AdminModule']);
	
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
			templateUrl: 'staff/Staffs.aspx',
			controller: 'staffTimesheetListCtrl'
	      })
	      .when('/Managers', {
			templateUrl: 'manager/Managers.aspx',
			controller: 'managerCtrl'
	      })
	      .when('/Admins', {
			templateUrl: 'admin/Admin.aspx',
			controller: 'adminCtrl'
	      })
	      .when('/AddNewTS/:TSN/:Page_Mode', {
			templateUrl: 'staff/TSForm.aspx',
			controller: 'staffTimesheetAddUpdateCtrl'
	      })	      
	      .when('/EditTS/:TSN/:Page_Mode', {
			templateUrl: 'staff/TSForm.aspx',
			controller: 'staffTimesheetAddUpdateCtrl'
	      })	                  
	      .otherwise("/");
	}]);

	var timesheet = 
		{Id:0, title:"", status:"", totalMinute:0, payPeriodId:{ID:0, Description:""}, costCodeId:{ID:0, Description:""}, number:null, requestorComment:"", approverComment:"", visible:true, selectedTimeLog:{ID:0 }, timelogs:[] };
	var costCodesCurrentUser = [];
	var payPeriodsNearby = [];
	
console.log("in tsApp js ");

$(document).ready(function () {
	console.log("in tsApp js in document ready");
});
