<script src="//code.jquery.com/jquery-1.10.1.min.js"></script>

<script type="text/javascript">
    $(document).ready(function() {
    alert('before');
        HillbillyCascade({
            //parentFormField: "State", //Display name on form of field from parent list
            childList: "Pay Period", //List name of child list
            childLookupField: "FromToDate", //Internal field name in Child List used in lookup
            childFormField: "TimeSheet Pay Period From To", //Display name on form of the child field
            filterColumn: "enabled" //Internal field name in Child List of the parent field
        });

    });
    
    function HillbillyCascade(params)
    {

        //var parent = $("select[Title='"+params.parentFormField+"'], select[Title='"+params.parentFormField+" Required Field']");
        
        /*$(parent).change(function(){
            DoHillbillyCascade(this.value,params);        
        }); 
        
        var currentParent = $(parent).val();
        if (currentParent != 0)        
        {
            DoHillbillyCascade(currentParent,params);
        }*/
        DoHillbillyCascade(params);
        alert('after');
    }
        

    //function DoHillbillyCascade(parentID,params)
	function DoHillbillyCascade(params)
    {
    alert('inside');
        var child = $("select[Title='"+params.childFormField+"'], select[Title='"+
            params.childFormField+" Required Field']," +
           "select[Title='"+params.childFormField+" possible values']");
        
        $(child).empty();
    
        var options = "";
		
        var call = $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('"+params.childList+
                "')/items?$select=Id,"+params.childLookupField+
				"&$orderby=FromDate desc"+
                "&$filter="+params.filterColumn+" eq 1",
            type: "GET",
            dataType: "json",
            headers: {
                Accept: "application/json;odata=verbose"
            }
       
        });
        call.done(function (data,textStatus, jqXHR){
        
            for (index in data.d.results)
            {
                options += "<option value='"+ data.d.results[index].Id +"'>"+
                    data.d.results[index][params.childLookupField]+"</option>";
            }
            $(child).append(options);

        });
        call.fail(function (jqXHR,textStatus,errorThrown){
            alert("Error retrieving information from list: " + params.childList + jqXHR.responseText);
            $(child).append(options);
        });
        
    }
    
</script>
