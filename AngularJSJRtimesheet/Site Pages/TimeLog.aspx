<style type="text/css">
.btn-sm-nopadding{
padding: 1px 3px;
min-width:4em;
}
.center-timelog {
    margin: 0 auto;
    width: 90%;
}
/*a fix for angularUI datepicker issue when popup display for time logs*/
ul.uib-datepicker-popup {
	white-space:normal;
}
/*a fix for time log when we are in edit mode to show correct size for editable controls*/
.editable-wrap .editable-controls {
	width:100%; 
	margin: 0px auto;
}
/*a fix for size of angularUI bootstrap date picker calendar icon */
.xeditable-datepicker .editable-bsdate .editable-controls .input-group .input-group-btn .btn{
	min-width:1em;
}
/*a fix for height of editable table row when in edit mode*/
.editable-wrap {
	white-space: normal;
}
.editable-wrap .editable-error{
	white-space:normal;
	min-width:200px;
}
</style>

<div class="center-timelog">
<table class="table table-bordered table-hover table-responsive" >
<thead class="thead-default">
  <tr class="form-group"> 
    <th class="col-md-1">Title</th>
    <th class="col-md-2">Date</th>
    <th class="col-md-1">Start time</th>
    <th class="col-md-1">Finish time</th>
    <th class="col-md-1">Breaks</th>
    <th class="col-md-1">Sub total</th>
    <th class="col-md-2">Edit</th>
    <th class="col-md-3"></th>
  </tr>
</thead>
<tbody>
  <tr ng-repeat="tl in timesheet.timelogs" class="form-group">
    <td class="col-md-1">
<!-- editable title (text with validation) -->
        <span editable-text="tl.title" e-name="Title" e-form="timeLogForm" onbeforesave="checkTitle($data)">    
    	{{tl.title}}</span>
    </td>
    <td class="col-md-2 xeditable-datepicker">
		<span e-form="timeLogForm" e-name="LogDate" editable-bsdate="tl.logDate" e-ng-model="tl.logDate" e-is-open="opened.$data" e-ng-click="open($event,'$data')" e-datepicker-popup="yyyy/MM/dd" e-datepicker-options="calOptions" e-readonly="true">    	
    	{{tl.logDate| date : "yyyy/MM/dd": "+1000" }}</span>
    </td>    
	<td class="col-md-1">
	<span e-form="timeLogForm" e-name="StartTime" editable-text="tl.startTime" onbeforesave="checkStartTime($data)" e-maxlength=5 >
		{{tl.startTime }} </span>
	</td>		        
    <td class="col-md-1">
    	<span e-form="timeLogForm" e-name="FinishTime" editable-text="tl.finishTime" onbeforesave="checkFinishTime($data)" e-maxlength=5 >
    	{{tl.finishTime}}</span>
    </td>
    <td class="col-md-1">
    <span e-form="timeLogForm" e-name="LogBreak" editable-number="tl.logBreaks" e-maxlength=2 onbeforesave="checkBreak($data)">
    	{{tl.logBreaks}}</span>
    </td>
    <td class="col-md-1">{{tl.subTotalMinutes | minuteToHour}}</td>
	<td style="white-space: nowrap" class="col-md-2">
	<!-- form -->
<head>
<meta name="WebPartPageExpansion" content="full" />
</head>
<form editable-form name="timeLogForm" onbeforesave="saveTimeLog($event, $data, timeLogForm)" ng-show="timeLogForm.$visible" class="form-buttons form-inline" shown="inserted == tl">
	  <button type="submit" ng-disabled="timeLogForm.$waiting" class="btn btn-primary">
	    save
	  </button>
	  <button type="button" ng-disabled="timeLogForm.$waiting" ng-click="timeLogForm.$cancel()" class="btn btn-default">
	    cancel
	  </button>
</form>
	<div class="buttons" ng-hide="timeLogForm.$visible">
	  <button type="button" class="btn btn-primary btn-sm btn-sm-nopadding" ng-click="timeLogForm.$show()"><span class="glyphicon glyphicon-edit"></span> Edit</button>
	  <button type="button" class="btn btn-danger btn-sm btn-sm-nopadding" ng-click="removeTimeLog($index, tl.TLID)"><span class="glyphicon glyphicon-remove"></span> Del</button>
	</div>  
	</td> 
	<td class="col-md-3"></td>   
 </tr>	
</tbody>
</table>
	<button class="btn btn-primary btn-md" type="button" ng-click="addTimeLog()">
		<span class="glyphicon glyphicon-plus-sign"></span> Add a new log
	</button>

</div>