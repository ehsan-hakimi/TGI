<script>
$(function () {
       bindFieldClick();
});

function bindFieldClick() {
     $("#btnField").on("click", createFields);
}
function createFields(){
    
	var ctx = new SP.ClientContext.get_current();
	var curWeb = ctx.get_web();
		  
	var myList = curWeb.get_lists().getByTitle('InspectionReport');
	ctx.load(myList);
	//Create the field

	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f295}" StaticName="TestField" Name="TestField" DisplayName="TestField" Type="Text" Overwrite="TRUE" Required="TRUE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);

    ctx.executeQueryAsync(
        onFieldSucceeded, 
        onFieldFailed
    );
}
function onFieldSucceeded() {
    var result = 'field created.';
	$('#divResults').text(result); 
	$('#divResults').show();
	$('#divResults').css('color', 'green');
	console.log('Passed field');
}

function onFieldFailed(sender, args) {
    $('#divResults').text('Request failed. ' + args.get_message() + 
        '\n' + args.get_stackTrace());
	$('#divResults').show();
	$('#divResults').css('color', 'red');
	console.log('Failed field');
}
</script>