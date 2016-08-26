<style class="text/css">
/*.form-horizontal .form-group::after{display:inline-block;	}*/

</style>
<div class="container">
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
		
		<div class="form-group row height-fix" ng-show="timesheet.number">
		    <label class="col-sm-2 control-label padding-fix" for="TSnumberLable">Timesheet Number:</label>
		    <div class="col-sm-2">
		        <span ng-bind="timesheet.number" class="label label-warning" id="TSnumberLable"></span>
		    </div>
		    
		    <label class="col-sm-offset-4 col-sm-2 control-label padding-fix" for="TSstatusLable">Timesheet Status:</label>
		    <div class="col-sm-2">
		        <span ng-bind="timesheet.status" class="label label-warning" id="TSstatusLable"></span>
		    </div>
		    
		</div>

		<div class="form-group height-fix">
		    <label for="timesheetTitle" class="col-sm-2 control-label">Title:</label>
		    <div class="col-sm-4">
		        <input type="text" class="form-control" ng-model="timesheet.title" ng-required="true" placeholder="TimeSheet Title" id="timesheetTitle"/>
		    </div>
		</div>
		
		<div class="form-group">
		    <label for="timesheetCC" class="col-sm-2 control-label">Cost Code:</label>
		    <div class="col-sm-6">
		    		<select ng-model="timesheet.costCodeId" ng-required="true" class="form-control" ng-change="changeCCDropdown($event)"
		    				ng-options="costCode.Description for costCode in costCodes track by costCode.ID" id="timesheetCC" >

		    		</select> 
		    </div>
		</div>
		
		<div class="form-group">
		    <label for="timesheetPP" class="col-sm-2 control-label">Pay Period:</label>
		    <div class="col-sm-6">
		    		<select ng-model="timesheet.payPeriodId" ng-required="true" class="form-control" 
		    				ng-options="payPeriod.Description for payPeriod in payPeriods track by payPeriod.ID" id="timesheetPP" >
		    		</select> 
		    </div>
		</div>

		<div class="form-group"  ng-show="timesheet.number">
			<div class="col-sm-offset-1 col-sm-2">
			<a href="#/AddNewLog" class="btn btn-primary btn-md" role="button">
			  	<span class="glyphicon glyphicon-plus-sign"></span> Add a new log
			</a>
			</div>
		</div>
		
		<div class="form-group">
		    <label for="TSrequestorComment" class="col-sm-2 control-label">Requestor Comment:</label>
		    <div class="col-sm-4">
		        <textarea  class="form-control" ng-model="timesheet.requestorComment"  cols="80" rows="4" name="string" placeholder="enter your comment to notify approver" id="TSrequestorComment"></textarea>
		    </div>		
		</div>
		
		<div class="alert alert-info" ng-hide="isNewMode()">
		    <label for="TSapproverComment" >Approver Comment:</label>
		        <span ng-bind="timesheet.approverComment" id="TSapproverComment"></span>
		</div>
		
		<div class="form-group" ng-hide="timesheet.number">
		    <div class="col-sm-offset-2 col-sm-2">
		        <input class="btn-primary active" type="submit" value="Save" ng-click="addTimesheet($event)" />
		    </div>
		</div>

		<div class="form-group" ng-show="timesheet.number">
			<div class="col-sm-offset-10 col-sm-2">
		        <input class="btn-primary active" type="submit" value="Save & Exit" ng-click="addTimesheet($event)" />
			</div>
		</div>
		
	</div>	
	</div>
	</div>
</div>
