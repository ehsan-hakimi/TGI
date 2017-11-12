<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script>
$(function () {
       bindButtonClick();
});

function bindButtonClick() {
     $("#btnList").on("click", createList);
}
function createList(){
    
//alert(_spPageContextInfo.webAbsoluteUrl);
    var clientContext = new SP.ClientContext.get_current();
    var oWebsite = clientContext.get_web();

    var listCreationInfo = new SP.ListCreationInformation();
    listCreationInfo.set_title('InspectionReport');
    listCreationInfo.set_templateType(SP.ListTemplateType.genericList);

    var oList = oWebsite.get_lists().add(listCreationInfo);
$('#divResults').hide();
    clientContext.load(oList);
    clientContext.executeQueryAsync(
        onQuerySucceeded, 
        onQueryFailed
    );
}
function onQuerySucceeded() {
    var result = 'list created.';
	$('#divResults').text(result); 
	$('#divResults').show();
	$('#divResults').css('color', 'green');
	console.log('passed');
}

function onQueryFailed(sender, args) {
    $('#divResults').text('Request failed. ' + args.get_message() + 
        '\n' + args.get_stackTrace());
	$('#divResults').show();
	$('#divResults').css('color', 'red');
	console.log('failed');
}
</script>