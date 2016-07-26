<%@ Assembly Name="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c"%> 
<%@ Import Namespace="Microsoft.SharePoint.WebPartPages" %> 
<%@ Import Namespace="Microsoft.SharePoint" %> 
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>
<%@ Page Language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" meta:progid="SharePoint.WebPartPage.Document" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
	<meta http-equiv="x-ua-compatible" content="ie=edge" />

	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="/bootstrap/3.3.6/css/bootstrap.min.css"/>
	<style type="text/css">
		#titleAreaBox, #s4-titlerow{
			 display: none !important;
	         width:0px !important;
	         background-color:fuchsia !important;
		}
		.container{
			margin-left:15px;
			margin-right:15px;
		}
		#s4-ribbonrow{display:none}
		.thead-default{background-color:#fafafa;}
		.table-hover>tbody>tr:hover>td, .table-hover>tbody>tr:hover>th {
		  background-color: #d9edf7; /*rgb(51, 122, 183);
		  color:#eeeeee;*/
		}
		@media only screen and (max-device-width: 480px)  {
		     #sideNavBox,#s4-titlerow, #titleAreaBox ,#DeltaFormDigest{
		          display: none !important;
		          width:0px !important;
		          background-color:fuchsia !important;
		     }
		     #contentBox{
		     	margin-left:20px;
			}
		} 
	</style>

	<!-- jQuery library -->
	<script type="text/javascript" src="/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	
	<!-- Latest compiled JavaScript -->
	<script type="text/javascript" src="/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	
	<script type="text/javascript" src="/ajax/4.0/1/MicrosoftAjax.js"></script>
	<script type="text/javascript" src="/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
	<script type="text/javascript" src="../SiteAssets/App.js"></script>
	<script type="text/javascript" src="../SiteAssets/TimesheetFormController.js"></script>
	<script type="text/javascript" src="../SiteAssets/SharePointServices.js"></script>
</asp:Content>
    

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
	<SharePoint:ScriptLink name="sp.RequestExecutor.js" runat="server" LoadAfterUI="true" Localizable="false" __designer:Preview="&lt;script type=&quot;text/javascript&quot; src=&quot;/_layouts/15/ScriptResx.ashx?culture=en%2Dus&amp;amp;name=SP%2ERes&amp;amp;rev=yNk%2FhRzgBn40LJVP%2BqfgdQ%3D%3D&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;/_layouts/15/sp.requestexecutor.js?rev=dZGyCwb1vZ9rQUNSZQi0Cw%3D%3D&quot;&gt;&lt;/script&gt;
" __designer:Values="&lt;P N=&#39;Name&#39; T=&#39;sp.RequestExecutor.js&#39; /&gt;&lt;P N=&#39;Localizable&#39; T=&#39;False&#39; /&gt;&lt;P N=&#39;LoadAfterUI&#39; T=&#39;True&#39; /&gt;&lt;P N=&#39;InDesign&#39; T=&#39;False&#39; /&gt;&lt;P N=&#39;ID&#39; ID=&#39;1&#39; T=&#39;ctl00&#39; /&gt;&lt;P N=&#39;Page&#39; ID=&#39;2&#39; /&gt;&lt;P N=&#39;TemplateControl&#39; R=&#39;2&#39; /&gt;&lt;P N=&#39;AppRelativeTemplateSourceDirectory&#39; R=&#39;-1&#39; /&gt;"/>
	
 <div ng-app="tsApp" ng-controller="timesheetCtrl">

	<div class="container panel-group" >
	  <h3>Staff page - TGI Timesheet system</h3>

	  <div class="panel panel-primary">
		<div class="panel-heading">Timesheet pending action</div>
		<ul class="list-group">
        <li class="list-group-item list-group-item-info">Draft (Timesheet not submitted)</li>
	    <div class="panel-body table-responsive">      
		  <table class="table table-hover">
		    <thead class="thead-default">
		      <tr>
		        <th class="hidden-xs hidden-sm">Title</th>
		        <th>Form Number</th>
		        <th>Pay Period</th>
		        <th class="hidden-xs">Cost Code</th>
		        <th>Total hours</th>
		        <th class="hidden-xs hidden-sm">Status</th>
		        <th class="hidden-xs hidden-sm">Created</th>
     		    <th class="hidden-xs hidden-sm">Modified</th>
		        <th>Action</th>		        
		      </tr>
		    </thead>
		    <tbody>
		      <tr ng-repeat="ts in timesheets |filter:{ status: FORM_STATUS['statusNewForm'] }">
		        <td class="hidden-xs hidden-sm">{{ts.title}}</td>
				<td>{{ts.number}}</td>		        
		        <td>{{ts.Payperiod}}</td>
		        <td class="hidden-xs">{{ts.Costcode}}</td>
		        <td>{{ts.totalHours}}</td>
		        <td class="hidden-xs hidden-sm">{{ts.status}}</td>
		        <td class="hidden-xs hidden-sm">{{ts.created}}</td>
		        <td class="hidden-xs hidden-sm">{{ts.modified}}</td>
		        <td>{{ts.TSID}}</td>
		      </tr>
		    </tbody>
		  </table>
		  <br/><a href="NewTS.aspx" class="btn btn-primary btn-md" role="button">
		  	<span class="glyphicon glyphicon-plus-sign"></span>
		  	Add a new Timesheet
		  </a>
  		</div>


        <li class="list-group-item list-group-item-info">Timesheet return for editing</li>
        </ul>
	    <div class="panel-body table-responsive">          
		  <table class="table table-hover">
		    <thead class="thead-default">
		      <tr>
		        <th class="hidden-xs hidden-sm">Title</th>
		        <th>Form Number</th>
		        <th>Pay Period</th>
		        <th class="hidden-xs">Cost Code</th>
		        <th>Total hours</th>
		        <th class="hidden-xs hidden-sm">Status</th>
		        <th class="hidden-xs">Approver</th>
		        <th class="hidden-xs hidden-sm">Approver comment</th>
		        <th class="hidden-xs hidden-sm">Modified</th>
		        <th>Action</th>		        
		      </tr>
		    </thead>
		    <tbody>
		      <tr ng-repeat="ts in timesheets |filter:{ status: FORM_STATUS['statusEditForm'] }">
		        <td class="hidden-xs hidden-sm">{{ts.title}}</td>
		        <td>{{ts.number}}</td>		        
		        <td>{{ts.Payperiod}}</td>
		        <td class="hidden-xs">{{ts.Costcode}}</td>
		        <td>{{ts.totalHours}}</td>
		        <td class="hidden-xs hidden-sm">{{ts.status}}</td>
		        <td class="hidden-xs">{{ts.approver}}</td>
		        <td class="hidden-xs hidden-sm">{{ts.approverComment}}</td>
		        <td class="hidden-xs hidden-sm">{{ts.modified}}</td>
		        <td>{{ts.TSID}}</td>
		      </tr>
		    </tbody>
		  </table>
  		</div>			
  					
	  </div>	  
	  
	  <div class="panel panel-warning">
		<div class="panel-heading">Waiting for manager approval</div>
	    <div class="panel-body table-responsive">          
		  <table class="table table-hover">
		    <thead class="thead-default">
		      <tr>
		        <th class="hidden-xs hidden-sm">Title</th>
		        <th>Form Number</th>		        
		        <th>Pay Period</th>
		        <th class="hidden-xs">Cost Code</th>
		        <th>Total hours</th>
		        <th class="hidden-xs hidden-sm">Status</th>
		        <th class="hidden-xs">Approver</th>
		        <th class="hidden-xs hidden-sm">Modified</th>
		        <th>Action</th>
		      </tr>
		    </thead>
		    <tbody>
		      <tr ng-repeat="ts in timesheets |filter:{ status: FORM_STATUS['statusForApproval'] }">
		        <td class="hidden-xs hidden-sm">{{ts.title}}</td>
		        <td>{{ts.number}}</td>		        
		        <td>{{ts.Payperiod}}</td>
		        <td class="hidden-xs">{{ts.Costcode}}</td>
		        <td>{{ts.totalHours}}</td>
		        <td class="hidden-xs hidden-sm">{{ts.status}}</td>
		        <td class="hidden-xs">{{ts.approver}}</td>
		        <td class="hidden-xs hidden-sm">{{ts.modified}}</td>
     		    <td>{{ts.TSID}}</td>
		      </tr>
		    </tbody>
		  </table>
  		</div>
	  </div>

	  <div class="panel panel-success">
		<div class="panel-heading">Approved or Paid records</div>
	    <div class="panel-body table-responsive">          
		  <table class="table table-hover">
		    <thead class="thead-default">
		      <tr>
		        <th class="hidden-xs hidden-sm">Title</th>
		        <th>Form Number</th>		        
		        <th>Pay Period</th>
		        <th class="hidden-xs">Cost Code</th>
		        <th>Total hours</th>
		        <th class="hidden-xs hidden-sm">Status</th>
		        <th class="hidden-xs">Approver</th>
		        <th class="hidden-xs hidden-sm">Approver comment</th>
		        <th class="hidden-xs hidden-sm">Modified</th>
		        <th>Action</th>		        
		      </tr>
		    </thead>
		    <tbody>
		      <tr ng-repeat="ts in timesheets |filter:{ status: FORM_STATUS['statusApproved'] }">
		        <td class="hidden-xs hidden-sm">{{ts.title}}</td>
		        <td>{{ts.number}}</td>		        
		        <td>{{ts.Payperiod}}</td>
		        <td class="hidden-xs">{{ts.Costcode}}</td>
		        <td>{{ts.totalHours}}</td>
		        <td class="hidden-xs hidden-sm">{{ts.status}}</td>
		        <td class="hidden-xs">{{ts.approver}}</td>
		        <td class="hidden-xs hidden-sm">{{ts.approverComment}}</td>
		        <td class="hidden-xs hidden-sm">{{ts.modified}}</td>
		        <td>{{ts.TSID}}</td>
		      </tr>
		    </tbody>
		  </table>
  		</div>
	  </div>

	  <div class="panel panel-danger">
		<div class="panel-heading">Rejected records</div>
	    <div class="panel-body table-responsive">          
		  <table class="table table-hover">
		    <thead class="thead-default">
		      <tr>
		        <th class="hidden-xs hidden-sm">Title</th>
		        <th>Form Number</th>		        
		        <th>Pay Period</th>
		        <th class="hidden-xs">Cost Code</th>
		        <th>Total hours</th>
		        <th class="hidden-xs hidden-sm">Status</th>
		        <th class="hidden-xs">Approver</th>
		        <th class="hidden-xs hidden-sm">Approver comment</th>
		        <th class="hidden-xs hidden-sm">Modified</th>
		        <th>Action</th>		        
		      </tr>
		    </thead>
		    <tbody>
		      <tr ng-repeat="ts in timesheets |filter:{ status: FORM_STATUS['statusDeclined'] }">
		        <td class="hidden-xs hidden-sm">{{ts.title}}</td>
		        <td>{{ts.number}}</td>		        
		        <td>{{ts.Payperiod}}</td>
		        <td class="hidden-xs">{{ts.Costcode}}</td>
		        <td>{{ts.totalHours}}</td>
		        <td class="hidden-xs hidden-sm">{{ts.status}}</td>
		        <td class="hidden-xs">{{ts.approver}}</td>
		        <td class="hidden-xs hidden-sm">{{ts.approverComment}}</td>
		        <td class="hidden-xs hidden-sm">{{ts.modified}}</td>
		        <td>{{ts.TSID}}</td>
		      </tr>
		    </tbody>
		  </table>
  		</div>		
	  </div>


	</div>
 </div>
</asp:Content>