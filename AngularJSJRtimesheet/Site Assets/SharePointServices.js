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
        return deferred;
    };


    this.addTimesheet = function (listTitle, title) {
        var deferred = $.Deferred();
   		console.log('in SharePointJSOMService call function addTimesheet');            
   		      
		var context = new SP.ClientContext(hostweburl);
		web  = context.get_web();
		context.load(web);
		var list = web.get_lists().getByTitle(listTitle);

        // create the ListItemInformational object
        var listItemInfo = new SP.ListItemCreationInformation();
        var listItem = list.addItem(listItemInfo);
        listItem.set_item('Title', title);
        listItem.update();

        context.executeQueryAsync(
            function () {
                var id = listItem.get_id();
                console.log('ID of inserted record is = '+id);
                deferred.resolve(id);
            },
            function (sender, args) {
                deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            }
        );

        return deferred;
    };

        //save function on controller. This method probably hasn't been called yet
    this.saveTimesheet = function (scope, listTitle) {
        var deferred = $.Deferred();
   		console.log('in SharePointJSOMService call function saveTimesheet');            
   		
         var context = new SP.ClientContext(hostweburl);
    	 web  = context.get_web();

        context.load(web);
        var list = web.get_lists().getByTitle(TSListName);


        var listItem = list.getItemById(scope.ts.id);
        listItem.set_item('Title', scope.ts.text);
        var status = 'Not started';
        listItem.update();

        context.executeQueryAsync(
            Function.createDelegate(this, function (sender, args) {
            }),
            Function.createDelegate(this, function (sender, args) {
                deferred.reject('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            })
        );
        return deferred.promise;
    }
    
});
   