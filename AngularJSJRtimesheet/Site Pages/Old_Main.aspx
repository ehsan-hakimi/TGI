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
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
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
		.btn-group-vertical > a{
		    margin-bottom:10px;
		    border-radius:10px !important;
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
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	
	<!-- Latest compiled JavaScript -->
	<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
</asp:Content>
    

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

	<div class="container" ng-app="tsApp">
	  <h3>TGI Timesheet system for casual staff</h3>
	  <br/>
	  <div class="btn-group btn-group-vertical">
		  <a href="/#Staff" class="btn btn-info" role="button">
		  	<span class="glyphicon glyphicon-user"></span>
		  	Staff
		  </a>
		  <a href="/#Managers" class="btn btn-info" role="button">
		  		  		  	<span class="glyphicon glyphicon-ok-sign"></span>
		  		  		  	Managers
		  </a>
		  <a href="#/Admins" class="btn btn-info" role="button">
		  		  	<span class="glyphicon glyphicon-cog"></span>
		  		  	Admin
		  </a>
	  </div>
	</div>

</asp:Content>