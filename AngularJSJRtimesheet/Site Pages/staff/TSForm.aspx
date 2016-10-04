<div class="block-ui-main" block-ui="main">
<div class="container" >
<br/>
	<div class="panel panel-primary">
	<div class="panel-heading">Timesheet form</div>
	
	<div class="panel-body">

	<div ng-show="errorMsg" class="alert alert-danger">
	  <span ng-bind="errorMsg"></span>
	</div>

	<div class="form-horizontal" role="form" ng-hide="errorMsg">		        

		<div ng-show="warningMsg" class="alert alert-warning">
		  <span ng-bind="warningMsg"></span>
		</div>

		<div ng-show="successMsg" class="alert alert-success">
		  <span ng-bind="successMsg"></span>
		</div>
		
		<div class="form-group" ng-show="timesheet.number">
		    <label class="col-xs-6 col-sm-3 col-md-2 control-label padding-fix wrap-fix" for="TSnumberLable">Timesheet Number:</label>
		    <div class="col-xs-6 col-sm-3 col-md-2">
		        <span ng-bind="timesheet.number" class="label label-warning control-label" id="TSnumberLable"></span>
		    </div>
 <!-- Add the extra clearfix for only the required viewport -->
  <div class="clearfix visible-xs-block"></div>
  		    
		    <label class="col-xs-6 col-sm-3 col-md-2 col-md-offset-4 control-label padding-fix wrap-fix" for="TSstatusLable">Timesheet Status:</label>
		    <div class="col-xs-6 col-sm-3 col-md-2">
		        <span ng-bind="timesheet.status" class="label label-warning control-label" id="TSstatusLable"></span>
		    </div>
		    
		</div>
	<div ng-form name="TSForm" novalidate >
		<div class="form-group">
		    <label for="timesheetTitle" class="col-sm-2 control-label">Title:</label>
		    <div class="col-sm-4">
		        <input type="text" class="form-control" ng-model="timesheet.title" required name="myInput" placeholder="TimeSheet Title" id="timesheetTitle"/>
		    </div>	<span style="color:red" ng-show="TSForm.myInput.$error.required">This is a requierd field!</span>
		</div>
		
		<div class="form-group">
		    <label for="timesheetCC" class="col-sm-2 control-label">Cost Code:</label>
		    <div class="col-sm-6">
		    		<select ng-model="timesheet.costCodeId" required name="coscodeField" class="form-control" ng-change="changeCCDropdown($event)"
		    				ng-options="costCode.Description for costCode in costCodes track by costCode.ID" id="timesheetCC" >

		    		</select> 
		    </div>	<span style="color:red" ng-show="TSForm.coscodeField.$invalid">This is a requierd field!</span>
		</div>
		
		<div class="form-group">
		    <label for="timesheetPP" class="col-sm-2 control-label">Pay Period:</label>
		    <div class="col-sm-6">
		    		<select ng-model="timesheet.payPeriodId" required name="payperiodField" class="form-control" 
		    				ng-options="payPeriod.Description for payPeriod in payPeriods track by payPeriod.ID" id="timesheetPP" >
		    		</select> 
		    </div>	<span style="color:red" ng-show="TSForm.payperiodField.$invalid">This is a requierd field!</span>
		</div>
		
	</div>	<!--end of ng-form-->
		<div  ng-show="timesheet.number">
			<div ng-include="'staff/TimeLog.aspx'"></div>
		</div>
		
		<div class="form-group">
		    <label for="TSrequestorComment" class="col-sm-2 control-label">Requestor Comment:</label>
		    <div class="col-sm-4">
		        <textarea  class="form-control" ng-model="timesheet.requestorComment"  cols="80" rows="4" name="string" placeholder="enter your comment to notify approver" id="TSrequestorComment"></textarea>
		    </div>		
		</div>
		
		<div class="alert alert-info" ng-hide="isNewMode()">
		    <label for="TSapproverComment" class="control-label">Approver Comment:</label>
		        <span ng-bind="timesheet.approverComment" id="TSapproverComment"></span>
		</div>
		
		<div class="form-group" ng-hide="timesheet.number">
		    <div class="col-sm-offset-2 col-sm-2">
		        <input class="btn-primary active" type="submit" value="Next" ng-click="addTimesheet($event);" />
		    </div>
		</div>

		<div class="form-group" ng-show="timesheet.number">
			<div class="col-sm-offset-10 col-sm-2">
		        <input class="btn-primary active" type="submit" value="Save & Exit" ng-click="updateTimesheet($event);" />
			</div>
		</div>
		
	</div>	
	</div>
	</div>
</div>
</div>
