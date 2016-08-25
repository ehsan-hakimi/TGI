function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);
  return date;
}
var constEnum = { //not really an enum, just an object that serves a constant purpose
  MAX_RECORDS_PER_LIST : 20,
  LAST_N_MONTHS_TO_FETCH_ALL_TIMESHEET : -3,
  LAST_N_MONTHS_TO_FETCH_NEARBY_PAYPERIODS : -2,
  NEXT_N_MONTHS_TO_FETCH_NEARBY_PAYPERIODS: 1,
  PageMode : 'S'
}

tsApp.service('SharePointJSOMService', function ($q, $http) {        
	hostweburl=_spPageContextInfo.webAbsoluteUrl;   	
	var TSID;
	
    this.getAllTimesheetListByREST = function ($scope, listTitle) {
        var deferred = $.Deferred();
        //First we must call the EnsureSetup method
        JSRequest.EnsureSetup();

   		console.log('in SharePointJSOMService call function getAllTimesheetListByREST');            
   	
		var today = new Date();
		var dateOfLastRecordToShow=addMonths(today , constEnum.LAST_N_MONTHS_TO_FETCH_ALL_TIMESHEET);
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


    function addTimesheet ($scope ,listTitle) {
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

		var ppLookupField = new SP.FieldLookupValue();
		ppLookupField.set_lookupId($scope.timesheet.payPeriodId.ID);
		listItem.set_item("TSPayPeriodFromTo", ppLookupField);
        
        listItem.update();
        context.executeQueryAsync(
            function () {
                TSID = listItem.get_id();
                console.log('ID of inserted record is = '+TSID );
                deferred.resolve(TSID);
            },
            function (sender, args) {
                deferred.reject(sender, args);
            }
        );

        return deferred.promise();
    };

    this.addTimesheetUpdateTSNumber = function ($scope ,listTitle) {
              
        var deferredUpdate = $.Deferred();  
        var saveTS = addTimesheet($scope, listTitle);

   		saveTS.done(
        function (TSID) {
				console.log("in Then TSID="+TSID );
		        var context = new SP.ClientContext(hostweburl);
				web  = context.get_web();
				context.load(web);
				var list = web.get_lists().getByTitle(listTitle);
		        var listItem = list.getItemById(TSID);
		        
		        var timesheetNumber = TSNumberPrefix + TSID;
		        console.log("in SharePointJSOMService call function updateTimesheetNumber timesheetNumber ="+timesheetNumber );
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
		        
			});
			
		saveTS.fail(
			function (sender, args) {
	        	console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
	        	deferredUpdate.reject('Request deferredUpdate failed. ' + args.get_message() + '\n' + args.get_stackTrace());
	        });
	        
		   return deferredUpdate.promise();
    }
    
    this.getTimesheetByREST= function ($scope, listTitle , TSnumber) {
    	//function will work fine if receive TSNumber as a parameter or even ID as a parameter 
        var deferred = $.Deferred();
        var timesheetID = 'NaN';
        var errorMessage;        
        
        if((TSnumber.length > 3) && (TSnumber.substring(0, 3) === TSNumberPrefix))
			timesheetID = TSnumber.substring(3, TSnumber.length);
		else //check and replace TSNumber with ID
			timesheetID = TSnumber;
			
		if(!isNaN(parseInt(timesheetID))){
			timesheetID = parseInt(timesheetID);
	   		console.log("in SharePointJSOMService call function getTimesheetByREST");
	        var restQueryUrl = hostweburl + "/_api/web/lists/getByTitle('" + listTitle + "')/items('"+timesheetID+"')";
	
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
	            	console.log("textStatus="+xhr.statusCode+xhr.statusText);

	            	if((xhr.statusCode==404) && (xhr.statusText=='Not Found'))
	            		errorMessage = jQuery.parseJSON(xhr.body);
	                deferred.reject(JSON.stringify(xhr),errorMessage );
	            }
	        });
	        
		} else{
        	errorMessage = {'error':{'message':{'value':'Tmiesheet Number is not valid.'}}};
        	
        	console.info("Tmiesheet Number is not valid");
        	deferred.reject("Tmiesheet Number is not valid", errorMessage );
        }
        return deferred.promise();
    };
    
   
    this.getCostCodeListByREST = function ($scope, listTitle) {
        var deferred = $.Deferred();

   		var currentUserID= _spPageContextInfo.userId;  
   		console.log("in SharePointJSOMService call function getCostCodeListByREST userID="+currentUserID);
        var restQueryUrl = hostweburl + "/_api/web/lists/getByTitle('" + listTitle + "')/items?$select="+
        "CostCodeID/Description,CostCodeID/ID,EmpName/Title&$expand=CostCodeID,EmpName"+
        "&$filter=EmpName/ID eq '"+currentUserID+"'"+
        "&$orderby=CostCodeID/Description desc";
		//+
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

    this.getPayPeriodsByREST = function ($scope, listTitle) {
        var deferred = $.Deferred();

   		var lastTwoMonth = addMonths(new Date(), constEnum.LAST_N_MONTHS_TO_FETCH_NEARBY_PAYPERIODS );
   		var nextMonth = addMonths(new Date(), constEnum.NEXT_N_MONTHS_TO_FETCH_NEARBY_PAYPERIODS );
   		lastTwoMonth =lastTwoMonth.toISOString();  
   		nextMonth = nextMonth.toISOString();  
   		console.log("in SharePointJSOMService call function getPayPeriodsByREST lastTwoMonth ="+lastTwoMonth +" and nextMonth "+nextMonth );
        var restQueryUrl = hostweburl + "/_api/web/lists/getByTitle('" + listTitle + "')/items?$select="+
        "ID,FromDate,FromToDate"+
        "&$filter=enabled eq 1 and(FromDate ge '"+lastTwoMonth +"')and(FromDate le '"+nextMonth +"')"+
        "&$orderby=FromDate asc";

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
   