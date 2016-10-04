function convertUserLocalDateToAUTimezone(d) {

    // d is based on users browser timezone
    // convert to msec
    // add local time zone offset 
    // get UTC time in msec
    var offset = d.getTimezoneOffset();
    	
    utc = d.getTime() + (offset * 60000);
    
    // create new Date object for different city
    // using supplied offset 10 for Australia timezone. SP site reginal setting should be AU +10 sydney
//    var dateTimezoneAU = new Date(utc );
    var dateTimezoneAU = new Date(utc + (3600000*10));
    
    // return time as a string
    return  dateTimezoneAU;
}
 
function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);
  return date;
}

var constEnum = { //not really an enum, just an object that serves a constant purpose
  MAX_RECORDS_PER_LIST : 20,
  LAST_N_MONTHS_TO_FETCH_ALL_TIMESHEET : -3,
  LAST_N_MONTHS_TO_FETCH_NEARBY_PAYPERIODS : -2,
  NEXT_N_MONTHS_TO_FETCH_NEARBY_PAYPERIODS: 1
}

tsApp.service('SharePointJSOMService', function ($q, $http) {     
	var serviceSPJSOM = this;
   
	hostweburl=_spPageContextInfo.webAbsoluteUrl;   	
	var TSID;
	
    this.getAllTimesheetListByREST = function ( listTitle) {
        var deferred = $.Deferred();
        //First we must call the EnsureSetup method
        JSRequest.EnsureSetup();

   		console.log('in SharePointJSOMService call function getAllTimesheetListByREST');            
   	
		var today = new Date();
		var dateOfLastRecordToShow = addMonths(today , constEnum.LAST_N_MONTHS_TO_FETCH_ALL_TIMESHEET);
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
		var list = context.get_web().get_lists().getByTitle(listTitle);

        // create the ListItemInformational object
        var listItemInfo = new SP.ListItemCreationInformation();
        var listItem = list.addItem(listItemInfo);
        listItem.set_item('Title', $scope.timesheet.title);
        listItem.set_item('TSTotalMinute', 0);
        listItem.set_item('TSRequesterComment', $scope.timesheet.requestorComment);
                        
		var ccLookupField = new SP.FieldLookupValue();
		ccLookupField.set_lookupId($scope.timesheet.costCodeId.ID);
		listItem.set_item("TSCostCode", ccLookupField);

		var ppLookupField = new SP.FieldLookupValue();
		ppLookupField.set_lookupId($scope.timesheet.payPeriodId.ID);
		listItem.set_item("TSPayPeriodFromTo", ppLookupField);
        
        listItem.update();
        context.load(listItem);
        
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
    
    this.updateTimesheet = function ($scope ,listTitle) {
        var deferred = $.Deferred();       
   		console.log('in SharePointJSOMService call function updateTimesheet ');            
   		      
		var context = new SP.ClientContext(hostweburl);
		var list = context.get_web().get_lists().getByTitle(listTitle);
		
        var listItem = list.getItemById($scope.timesheet.Id);
        
        listItem.set_item('Title', $scope.timesheet.title);
        listItem.set_item('TSRequesterComment', $scope.timesheet.requestorComment);
                        
		var ccLookupField = new SP.FieldLookupValue();
		ccLookupField.set_lookupId($scope.timesheet.costCodeId.ID);
		listItem.set_item("TSCostCode", ccLookupField);

		var ppLookupField = new SP.FieldLookupValue();
		ppLookupField.set_lookupId($scope.timesheet.payPeriodId.ID);
		listItem.set_item("TSPayPeriodFromTo", ppLookupField);
        
        listItem.update();
        context.load(listItem);
        
        context.executeQueryAsync(
            function () {
                TSID = listItem.get_id();
                console.log('ID of updated record is = '+TSID );
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
	        //var restQueryUrl = hostweburl + "/_api/web/lists/getByTitle('" + listTitle + "')/items('"+timesheetID+"')";
	        var restQueryUrl = hostweburl +"/_api/web/lists/getByTitle('" + listTitle + "')/items?$select=ID,TSNumber,Title,TSStatus,TSTotalMinute,TSPayPeriodFromToId,TSCostCodeId,TSRequesterComment,TSApproverComment,TSVisible,"+
	        								"TSPayPeriodFromTo/FromDate,TSPayPeriodFromTo/ToDate0&$expand=TSPayPeriodFromTo&$filter=ID eq '"+timesheetID+"'";
	
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
        	errorMessage = {'error':{'message':{'value':'Timesheet Number is not valid.'}}};
        	
        	console.info("Timesheet Number is not valid");
        	deferred.reject("Timesheet Number is not valid", errorMessage );
        }
        return deferred.promise();
    };
    
   
    this.getCostCodeListByREST = function ( listTitle) {
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

    this.getPayPeriodsByREST = function ( listTitle) {
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

	this.deleteTimesheet = function (listNameTS, listNameTL, itemId , tsNumber){
        var deferred = $.Deferred();       
   		console.log('in SharePointJSOMService call function deleteTimesheet ='+itemId );            
   		      
		var context = new SP.ClientContext(hostweburl);
	    var listItem = context.get_web().get_lists().getByTitle(listNameTS).getItemById(itemId);
	    listItem.deleteObject();
		$.when(this.getAllTimelogsByREST( listNameTL, tsNumber))
	      .done(function(jsonObject) {
	        angular.forEach(jsonObject.d.results, function(tl) {
				serviceSPJSOM.deleteTimeLog(listNameTL, tl.Id);
	        });
	      })
	      .fail(function(err) {
	        console.info(JSON.stringify(err));
	      });
		
	    context.executeQueryAsync(
	            function () {
	                deferred.resolve();
	            },
	            function (sender, args) {
	                deferred.reject(sender, args);
	            }
	    );
        return deferred.promise(); 
	}	

//*****************************************Start Time Log section *************************************************

    this.getAllTimelogsByREST = function ( listTitle, timesheetID) {
        var deferred = $.Deferred();
        //First we must call the EnsureSetup method
        JSRequest.EnsureSetup();

   		console.log('in SharePointJSOMService call function getAllTimelogsByREST');            
   	
        var restQueryUrl = hostweburl + "/_api/web/lists/getByTitle('" + listTitle + "')/items?$select=ID,Title,TSLogDate,TSStartTime,TSFinishTime,TSLogBreak,TSLogSubtotalMinutes"+
        "&$filter=Title eq '"+timesheetID+"'"+
        "&$orderby=TSLogDate asc,TSStartTime asc";
		
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

    this.addTimeLog  = function (data, listTitle, timesheetNumber, subtotalMins) {
        var deferred = $.Deferred();       
   		console.log('in SharePointJSOMService call function addTimeLog');            
   		      
		var context = new SP.ClientContext(hostweburl);
		var list = context.get_web().get_lists().getByTitle(listTitle);

        // create the ListItemInformational object
        var listItemInfo = new SP.ListItemCreationInformation();
        var listItem = list.addItem(listItemInfo);
        listItem.set_item('Title', timesheetNumber);
        listItem.set_item('TSLogDate', convertUserLocalDateToAUTimezone(data.LogDate));
        listItem.set_item('TSStartTime', data.StartTime);
        listItem.set_item('TSFinishTime', data.FinishTime);
        listItem.set_item('TSLogBreak', data.LogBreak);
        listItem.set_item('TSLogSubtotalMinutes', subtotalMins);                

        listItem.update();
        context.load(listItem);
        
        context.executeQueryAsync(
            function () {
                TimeLogID = listItem.get_id();
                console.log('ID of inserted time log record is = '+TimeLogID );
                deferred.resolve(TimeLogID);
            },
            function (sender, args) {
                deferred.reject(sender, args);
            }
        );

        return deferred.promise();
    };
    
    this.updateTimeLog  = function (data, listTitle, timeLogID, subtotalMins) {
        var deferred = $.Deferred();       
   		console.log('in SharePointJSOMService call function updateTimeLog');            
   		      
		var context = new SP.ClientContext(hostweburl);
		var list = context.get_web().get_lists().getByTitle(listTitle);

        var listItem = list.getItemById(timeLogID);

        listItem.set_item('TSLogDate', data.LogDate);
        listItem.set_item('TSStartTime', data.StartTime);
        listItem.set_item('TSFinishTime', data.FinishTime);
        listItem.set_item('TSLogBreak', data.LogBreak);
        listItem.set_item('TSLogSubtotalMinutes', subtotalMins);                

        listItem.update();
        context.load(listItem);
        
        context.executeQueryAsync(
            function () {
                TimeLogID = listItem.get_id();
                console.log('ID of updated time log record is = '+TimeLogID );
                deferred.resolve(TimeLogID);
            },
            function (sender, args) {
                deferred.reject(sender, args);
            }
        );

        return deferred.promise();
    };
    
	this.deleteTimeLog = function(listTitle, itemId){
        var deferred = $.Deferred();       
   		console.log('in SharePointJSOMService call function deleteTimeLog '+itemId);            
   		      
		var context = new SP.ClientContext(hostweburl);
	    var listItem = context.get_web().get_lists().getByTitle(listTitle).getItemById(itemId);
	    listItem.deleteObject();
	
	    context.executeQueryAsync(
	            function () {
	                console.log('ID of deleted time log record is = ');
	                deferred.resolve();
	            },
	            function (sender, args) {
	                deferred.reject(sender, args);
	            }
	    );
        return deferred.promise(); 
	}	
//*****************************************End Time Log section *************************************************

});
   