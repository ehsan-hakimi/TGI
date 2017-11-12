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

	var field1 = myList.get_fields().getByInternalNameOrTitle("Title");
	field1.set_title("Product Being Tested");
	field1.update();
	ctx.load(field1);

	var field2 = myList.get_fields().getByInternalNameOrTitle("InspectionDate");
	field2.set_title("Inspection Date");
	field2.update();
	ctx.load(field2);
	
	var field3 = myList.get_fields().getByInternalNameOrTitle("ProductForInspection");
	field3.set_title("Product For");
	field3.update();
	ctx.load(field3);
	
	var field4 = myList.get_fields().getByInternalNameOrTitle("PersonsTesting");
	field4.set_title("Person(s) Testing");
	field4.update();
	ctx.load(field4);
	
	var field5 = myList.get_fields().getByInternalNameOrTitle("SingleTaskOperations");
	field5.set_title("Single Task Operations (keyboard work) 1200mm x 800mm");
	field5.update();
	ctx.load(field5);
	
	var field6 = myList.get_fields().getByInternalNameOrTitle("MixedTaskOperations");
	field6.set_title("Mixed Task Operations (keyboard and clerical) 1600mm x 800mm");
	field6.update();
	ctx.load(field6);

	var field7 = myList.get_fields().getByInternalNameOrTitle("WorkSurfaceThickness");
	field7.set_title("Work surface Thickness must not exceed 33mm");
	field7.update();
	ctx.load(field7);
	
	var field8 = myList.get_fields().getByInternalNameOrTitle("HeightShouldBe");
	field8.set_title("Height should be 700mm to 720mm");
	field8.update();
	ctx.load(field8);

	var field9 = myList.get_fields().getByInternalNameOrTitle("LegSpaceMinimumWidth");
	field9.set_title("Leg Space minimum width 650mm");
	field9.update();
	ctx.load(field9);
	
	var field10 = myList.get_fields().getByInternalNameOrTitle("LegSpaceMinimumDepth");
	field10.set_title("Leg Space minimum depth 450mm");
	field10.update();
	ctx.load(field10);	
	
	var field11 = myList.get_fields().getByInternalNameOrTitle("LegSpaceMinimumHeight");
	field11.set_title("Leg Space minimum height 645mm");
	field11.update();
	ctx.load(field11);	
	
	var field12 = myList.get_fields().getByInternalNameOrTitle("MinimumTravel");
	field12.set_title("Minimum Travel 150mm");
	field12.update();
	ctx.load(field12);	
		
	
	var field13 = myList.get_fields().getByInternalNameOrTitle("TopOfWorkSurfaceInclude");
	field13.set_title("Top of the work surface shall include a range of movement between 610mm and 760mm from floor");
	field13.update();
	ctx.load(field13);

	var field14 = myList.get_fields().getByInternalNameOrTitle("IfStepDeskAdjustment");
	field14.set_title("If step desk adjustment, steps shall be not more than 25mm apart");
	field14.update();
	ctx.load(field14);
	
	var field15 = myList.get_fields().getByInternalNameOrTitle("CanAccessedEasily");
	field15.set_title("Can be accessed easily from seated position");
	field15.update();
	ctx.load(field15);	
	
	var field16 = myList.get_fields().getByInternalNameOrTitle("ModestyPanelNoGreaterThan");
	field16.set_title("Modesty Panel no greater than 400mm from the floor when work surface is in highest position");
	field16.update();
	ctx.load(field16);
		
	var field17 = myList.get_fields().getByInternalNameOrTitle("LOADTESTDeformationOutcome");
	field17.set_title("Was there any structural breakage or deformation (outcome)");
	field17.update();
	ctx.load(field17);	

	var field18 = myList.get_fields().getByInternalNameOrTitle("LOADTESTDeformationPassed");
	field18.set_title("Was there any structural breakage or deformation (passed)");
	field18.update();
	ctx.load(field18);	

	var field19 = myList.get_fields().getByInternalNameOrTitle("LOADTESTDeflectionMoreThanOutcome");
	field19.set_title("Was there any surface deflection more than 1% of its length during load (outcome)");
	field19.update();
	ctx.load(field19);	

	var field20 = myList.get_fields().getByInternalNameOrTitle("LOADTESTDeflectionMoreThanPassed");
	field20.set_title("Was there any surface deflection more than 1% of its length during load (passed)");
	field20.update();
	ctx.load(field20);	

	var field21 = myList.get_fields().getByInternalNameOrTitle("LOADTESTDeflectAfterTestingExceedOutcome");
	field21.set_title("Did the work surface deflect after testing exceed 10mm (outcome)");
	field21.update();
	ctx.load(field21);	
	
	var field22 = myList.get_fields().getByInternalNameOrTitle("LOADTESTDeflectAfterTestingExceedPassed");
	field22.set_title("Did the work surface deflect after testing exceed 10mm (passed)");
	field22.update();
	ctx.load(field22);	

	var field23 = myList.get_fields().getByInternalNameOrTitle("LOADTESTAntiReboundexceedOutcome");
	field23.set_title("Did the pull force or weight to overcome the anti-rebound exceed 4.1kg (outcome Load)");
	field23.update();
	ctx.load(field23);	

	var field24 = myList.get_fields().getByInternalNameOrTitle("LOADTESTAntiReboundexceedPassed");
	field24.set_title("Did the pull force or weight to overcome the anti-rebound exceed 4.1kg (passed Load)");
	field24.update();
	ctx.load(field24);	

	var field25 = myList.get_fields().getByInternalNameOrTitle("RACKINGTESTDeformationOutcome");
	field25.set_title("Did the unit show structural damage, deformation or loss of rigidity to the end panels, legs, glides, castors or base (outcome)");
	field25.update();
	ctx.load(field25);	

	var field26 = myList.get_fields().getByInternalNameOrTitle("RACKINGTESTDeformationPassed");
	field26.set_title("Did the unit show structural damage, deformation or loss of rigidity to the end panels, legs, glides, castors or base (passed)");
	field26.update();
	ctx.load(field26);	
	
	var field27 = myList.get_fields().getByInternalNameOrTitle("RACKINGTESTAntiReboundexceedOutcome");
	field27.set_title("Did the pull force or weight to overcome the anti-rebound exceed 4.1kgs (outcome Racking)");
	field27.update();
	ctx.load(field27);	

	var field28 = myList.get_fields().getByInternalNameOrTitle("RACKINGTESTAntiReboundexceedPassed");
	field28.set_title("Did the pull force or weight to overcome the anti-rebound exceed 4.1kgs (passed Racking)");
	field28.update();
	ctx.load(field28);	

	var field29 = myList.get_fields().getByInternalNameOrTitle("DROPTESTStructuralBreakageOutcome");
	field29.set_title("Was there any structural breakage or loss of serviceability particularly that could cause injury to a user (outcome Drop)");
	field29.update();
	ctx.load(field29);	

	var field30 = myList.get_fields().getByInternalNameOrTitle("DROPTESTStructuralBreakagePassed");
	field30.set_title("Was there any structural breakage or loss of serviceability particularly that could cause injury to a user (passed Drop)");
	field30.update();
	ctx.load(field30);	

	var field31 = myList.get_fields().getByInternalNameOrTitle("DROPTESTAntiReboundexceedOutcome");
	field31.set_title("Did the pull force or weight to overcome the anti-rebound exceed 4.1kgs (outcome Drop)");
	field31.update();
	ctx.load(field31);	

	var field32 = myList.get_fields().getByInternalNameOrTitle("DROPTESTAntiReboundexceedPassed");
	field32.set_title("Did the pull force or weight to overcome the anti-rebound exceed 4.1kgs (passed Drop)");
	field32.update();
	ctx.load(field32);	

	var field33 = myList.get_fields().getByInternalNameOrTitle("LEGSTRENGTHTESTStructuralBreakageOutcome");
	field33.set_title("Was there any structural breakage or loss of serviceability particularly that could cause injury to a user (outcome Leg)");
	field33.update();
	ctx.load(field33);	

	var field34 = myList.get_fields().getByInternalNameOrTitle("LEGSTRENGTHTESTStructuralBreakagePassed");
	field34.set_title("Was there any structural breakage or loss of serviceability particularly that could cause injury to a user (passed Leg)");
	field34.update();
	ctx.load(field34);	

	var field35 = myList.get_fields().getByInternalNameOrTitle("LEGSTRENGTHTESTAntiReboundexceedOutcome");
	field35.set_title("Did the pull force or weight to overcome the anti-rebound exceed 4.1kgs (outcome Leg)");
	field35.update();
	ctx.load(field35);	

	var field36 = myList.get_fields().getByInternalNameOrTitle("LEGSTRENGTHTESTAntiReboundexceedPassed");
	field36.set_title("Did the pull force or weight to overcome the anti-rebound exceed 4.1kgs (passed Leg)");
	field36.update();
	ctx.load(field36);	
	
	var field37 = myList.get_fields().getByInternalNameOrTitle("STABILITYTESTOutcome");
	field37.set_title("STABILITY TEST (outcome)");
	field37.update();
	ctx.load(field37);	

	var field38 = myList.get_fields().getByInternalNameOrTitle("STABILITYTESTPassed");
	field38.set_title("STABILITY TEST (passed)");
	field38.update();
	ctx.load(field38);	

	var field39 = myList.get_fields().getByInternalNameOrTitle("SignedBy");
	field39.set_title("Signed By");
	field39.update();
	ctx.load(field39);	
	
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