<script>
$(function () {
       updateFieldClick();
});

function updateFieldClick() {
     $("#btnUpdateTitle").on("click", updateFields);
}
function updateFields(){
    
	var ctx = new SP.ClientContext.get_current();
	var curWeb = ctx.get_web();
		  
	var myList = curWeb.get_lists().getByTitle('InspectionReport');
	ctx.load(myList);
	//Create the field

	var field = myList.get_fields().getByInternalNameOrTitle("Title");
	field.set_title("Test nnn");
	field.update();
	ctx.load(field);

    ctx.executeQueryAsync(
        onFieldUpdateSucceeded, 
        onFieldUpdateFailed
    );
}
function onFieldUpdateSucceeded() {
    var result = 'title updated.';
	$('#divResults').text(result); 
	$('#divResults').show();
	$('#divResults').css('color', 'green');
	console.log('update title');
}

function onFieldUpdateFailed(sender, args) {
    $('#divResults').text('Request failed. ' + args.get_message() + 
        '\n' + args.get_stackTrace());
	$('#divResults').show();
	$('#divResults').css('color', 'red');
	console.log('failed update title');
}
</script>