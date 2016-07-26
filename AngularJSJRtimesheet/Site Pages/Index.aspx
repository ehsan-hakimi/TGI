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
	<SharePoint:CssRegistration ID="CssRegistration" Name="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" After="corev15.css" runat="server" __designer:Preview="&lt;link id=&quot;CssRegistration&quot; rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;&quot;/&gt;
" __designer:Values="&lt;P N=&#39;ID&#39; ID=&#39;1&#39; T=&#39;CssRegistration&#39; /&gt;&lt;P N=&#39;Name&#39; T=&#39;https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css&#39; /&gt;&lt;P N=&#39;After&#39; T=&#39;corev15.css&#39; /&gt;&lt;P N=&#39;InDesign&#39; T=&#39;False&#39; /&gt;&lt;P N=&#39;Page&#39; ID=&#39;2&#39; /&gt;&lt;P N=&#39;TemplateControl&#39; R=&#39;2&#39; /&gt;&lt;P N=&#39;AppRelativeTemplateSourceDirectory&#39; R=&#39;-1&#39; /&gt;"/>

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
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	
	<!-- Latest compiled JavaScript -->
	<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	
	<script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js"></script>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular-route.min.js"></script>	
	<script type="text/javascript" src="../SiteAssets/App.js"></script>
	<script type="text/javascript" src="../SiteAssets/TimesheetFormController.js"></script>
	<script type="text/javascript" src="../SiteAssets/SharePointServices.js"></script>
</asp:Content>
    

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
	<SharePoint:ScriptLink name="sp.RequestExecutor.js" runat="server" LoadAfterUI="true" Localizable="false" __designer:Preview="&lt;script type=&quot;text/javascript&quot; src=&quot;/_layouts/15/ScriptResx.ashx?culture=en%2Dus&amp;amp;name=SP%2ERes&amp;amp;rev=yNk%2FhRzgBn40LJVP%2BqfgdQ%3D%3D&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;/_layouts/15/sp.requestexecutor.js?rev=dZGyCwb1vZ9rQUNSZQi0Cw%3D%3D&quot;&gt;&lt;/script&gt;
" __designer:Values="&lt;P N=&#39;Name&#39; T=&#39;sp.RequestExecutor.js&#39; /&gt;&lt;P N=&#39;Localizable&#39; T=&#39;False&#39; /&gt;&lt;P N=&#39;LoadAfterUI&#39; T=&#39;True&#39; /&gt;&lt;P N=&#39;InDesign&#39; T=&#39;False&#39; /&gt;&lt;P N=&#39;ID&#39; ID=&#39;1&#39; T=&#39;ctl00&#39; /&gt;&lt;P N=&#39;Page&#39; ID=&#39;2&#39; /&gt;&lt;P N=&#39;TemplateControl&#39; R=&#39;2&#39; /&gt;&lt;P N=&#39;AppRelativeTemplateSourceDirectory&#39; R=&#39;-1&#39; /&gt;"/>
	
 <div ng-app="tsApp">
	  <h3>TGI Timesheet system for casual staff</h3>
	  <br/>
		  <a href="#/Staffs" class="btn btn-info" role="button">
		  	<span class="glyphicon glyphicon-user"></span>
		  	Staff
		  </a>
 		  <a href="#/Managers" class="btn btn-info" role="button">
		  		  		  	<span class="glyphicon glyphicon-ok-sign"></span>
		  		  		  	Managers
		  </a>
		  <a href="#/Admins" class="btn btn-info" role="button">
		  		  	<span class="glyphicon glyphicon-cog"></span>
		  		  	Admin
		  </a>
	<div ng-view></div>
 </div>
</asp:Content>