<style class="text/css">
/*.form-horizontal .form-group::after{display:inline-block;	}*/

</style>
<div class="container">
<br/>
	<div class="panel panel-primary">
	<div class="panel-heading">Timesheet form</div>
	
	<div class="panel-body">
	<div class="form-horizontal" role="form">		        

		<div ng-show="warningMsg" class="alert alert-warning">
		  <span>{{warningMsg}}</span>
		</div>

		<div ng-show="successMsg" class="alert alert-success">
		  <span>{{successMsg}}</span>
		</div>

		<div class="form-group">
		    <label for="timesheetTitle" class="control-label col-sm-2">Title:</label>
		    <div class="col-sm-10">
		        <input type="text" class="form-control" ng-model="timesheet.title" ng-required="true" placeholder="TimeSheet Title" id="timesheetTitle"/>
		    </div>
		</div>
		<div class="form-group"  ng-show="timesheet.number">
			<div class="col-sm-offset-1 col-sm-2">
			<a href="#/AddNewLog" class="btn btn-primary btn-md" role="button">
			  	<span class="glyphicon glyphicon-plus-sign"></span> Add a new log
			</a>
			</div>
		</div>
		
		<div class="form-group"></div>
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
