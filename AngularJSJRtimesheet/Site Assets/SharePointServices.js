function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);
  return date;
}
var constEnum = { //not really an enum, just an object that serves a constant purpose
  MAX_RECORDS_PER_LIST : 20,
  LAST_N_MONTHS_TO_FETCH : -3
}

tsApp.service('SharePointJSOMService', function ($q, $http) {
   	console.log('in SharePointJSOMService');            
	hostweburl=_spPageContextInfo.webAbsoluteUrl;   	
	var TSID;
	
    this.getAllTimesheetListByREST = function ($scope, listTitle) {
        var deferred = $.Deferred();
        //First we must call the EnsureSetup method
        JSRequest.EnsureSetup();

   		console.log('in SharePointJSOMService call function getAllTimesheetListByREST');            
   	
		var today = new Date();
		var dateOfLastRecordToShow=addMonths(today , constEnum.LAST_N_MONTHS_TO_FETCH);
		console.log(dateOfLastRecordToShow.toISOString());

        var restQueryUrl = hostweburl + "/_api/web/lists/getByTitle('" + listTitle + "')/items?$select=ID,Title,TSStatus,TSApproverComment,TSPayPeriodFromTo/FromTo"+
        ",TSCostCode/Description,TSNumber,TSTotalMinute,Modified,Created,Editor/Title&$expand=TSPayPeriodFromTo,TSCostCode,Editor"+
        "&$filter=Modified gt datetime'"+dateOfLastRecordToShow.toISOString()+"'"+
        "&$orderby=Modified desc,Created desc&$top="+constEnum.MAX_RECORDS_PER_LIST;
		
		console.log('restQueryUrl = '+restQueryUrl);
        var executor = new SP.RequestExecutor(hostweburl);
        executor.executeAsync({
            url: restQueryUrl,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data, textStatus, xhr) {
                deferred.resolve(JSON.parse(data.body));
            },
            error: function (xhr, textStatus, errorThrown) {
                deferred.reject(JSON.stringify(xhr));
            }
        });
        return deferred.promise();
    };


    function addTimesheet($scope ,listTitle) {
        var deferred = $.Deferred();       
   		console.log('in SharePointJSOMService call function addTimesheet $scope.timesheet.costCodeId='+$scope.timesheet.costCodeId.ID);            
   		      
		var context = new SP.ClientContext(hostweburl);
		web  = context.get_web();
		context.load(web);
		var list = web.get_lists().getByTitle(listTitle);

        // create the ListItemInformational object
        var listItemInfo = new SP.ListItemCreationInformation();
        var listItem = list.addItem(listItemInfo);
        listItem.set_item('Title', $scope.timesheet.title);
        
		var ccLookupField = new SP.FieldLookupValue();
		ccLookupField.set_lookupId($scope.timesheet.costCodeId.ID);
		listItem.set_item("TSCostCode", ccLookupField);
        
        //listItem.set_item('TSCostCodeId', $scope.timesheet.costCodeId.ID);
        listItem.update();
        context.executeQueryAsync(
            function () {
                TSID = listItem.get_id();
                console.log('ID of inserted record is = '+TSID );
                deferred.resolve(TSID);
            },
            function (sender, args) {
                deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            }
        );

        return deferred.promise();
    };

    this.addTimesheetUpdateTSNumber = function ($scope ,listTitle) {

   		console.log('in SharePointJSOMService call function updateTimesheetNumber ');            
        var deferredUpdate = $.Deferred();  
   		addTimesheet($scope, listTitle).then(
        function (TSID) {
				console.log("in Then TSID="+TSID );
		        var context = new SP.ClientContext(hostweburl);
				web  = context.get_web();
				context.load(web);
				var list = web.get_lists().getByTitle(listTitle);
		        var listItem = list.getItemById(TSID);
		        
		        var timesheetNumber = 'TS-'+TSID;
		        console.log("timesheetNumber ="+timesheetNumber );
		        listItem.set_item('TSNumber', timesheetNumber );
		
		        listItem.update();
		        console.log("update timesheetNumber successfully");
		        context.executeQueryAsync(
		            Function.createDelegate(this, function (sender, args) {
		            	var TimesheetNumber = listItem.get_item('TSNumber');
		                deferredUpdate.resolve(TimesheetNumber);
		            }),
		            Function.createDelegate(this, function (sender, args) {
		                deferredUpdate.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
		            })
		        );
		        
			},
			function (sender, args) {
	                console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
	        }
	       );
		   return deferredUpdate.promise();
    }
   
    this.getCostCodeListByREST = function ($scope, listTitle) {
        var deferred = $.Deferred();

   		console.log('in SharePointJSOMService call function getCostCodeListByREST');     
   		var currentUserID= _spPageContextInfo.userId;  
   		console.log("userID="+currentUserID);
        var restQueryUrl = hostweburl + "/_api/web/lists/getByTitle('" + listTitle + "')/items?$select="+
        "CostCodeID/Description,CostCodeID/ID,EmpName/Title&$expand=CostCodeID,EmpName"+
        "&$filter=EmpName/ID eq '"+"19'"+
        "&$orderby=CostCodeID/Description desc";
		//+currentUserID
		console.log('restQueryUrl = '+restQueryUrl);
        var executor = new SP.RequestExecutor(hostweburl);
        executor.executeAsync({
            url: restQueryUrl,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data, textStatus, xhr) {
                deferred.resolve(JSON.parse(data.body));
            },
            error: function (xhr, textStatus, errorThrown) {
                deferred.reject(JSON.stringify(xhr));
            }
        });
        return deferred.promise();
    };



});
   