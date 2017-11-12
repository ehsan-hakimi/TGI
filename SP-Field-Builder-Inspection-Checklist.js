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

	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f300}" Name="InspectionDate" DisplayName="InspectionDate" Type="DateTime" Format="DateOnly" Overwrite="TRUE" Required="TRUE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f301}" Name="ProductForInspection" DisplayName="ProductForInspection" Type="Choice" Format="RadioButtons" Overwrite="TRUE" Required="TRUE"><CHOICES><CHOICE>Client Prototype</CHOICE><CHOICE>Product Prototype</CHOICE></CHOICES></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f302}" Name="PersonsTesting" DisplayName="PersonsTesting" Type="UserMulti" Mult="TRUE" Overwrite="TRUE" Required="TRUE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f303}" Name="SingleTaskOperations" DisplayName="SingleTaskOperations" Type="Choice" Format="RadioButtons" Overwrite="TRUE" Required="FALSE"><CHOICES><CHOICE>Yes</CHOICE><CHOICE>No</CHOICE><CHOICE>N/A</CHOICE></CHOICES></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f304}" Name="MixedTaskOperations" DisplayName="MixedTaskOperations" Type="Choice" Format="RadioButtons" Overwrite="TRUE" Required="FALSE"><CHOICES><CHOICE>Yes</CHOICE><CHOICE>No</CHOICE><CHOICE>N/A</CHOICE></CHOICES></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f305}" Name="WorkSurfaceThickness" DisplayName="WorkSurfaceThickness" Type="Choice" Format="RadioButtons" Overwrite="TRUE" Required="FALSE"><CHOICES><CHOICE>Yes</CHOICE><CHOICE>No</CHOICE><CHOICE>N/A</CHOICE></CHOICES></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f306}" Name="HeightShouldBe" DisplayName="HeightShouldBe" Type="Choice" Format="RadioButtons" Overwrite="TRUE" Required="FALSE"><CHOICES><CHOICE>Yes</CHOICE><CHOICE>No</CHOICE><CHOICE>N/A</CHOICE></CHOICES></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f307}" Name="LegSpaceMinimumWidth" DisplayName="LegSpaceMinimumWidth" Type="Choice" Format="RadioButtons" Overwrite="TRUE" Required="FALSE"><CHOICES><CHOICE>Yes</CHOICE><CHOICE>No</CHOICE><CHOICE>N/A</CHOICE></CHOICES></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f308}" Name="LegSpaceMinimumDepth" DisplayName="LegSpaceMinimumDepth" Type="Choice" Format="RadioButtons" Overwrite="TRUE" Required="FALSE"><CHOICES><CHOICE>Yes</CHOICE><CHOICE>No</CHOICE><CHOICE>N/A</CHOICE></CHOICES></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f309}" Name="LegSpaceMinimumHeight" DisplayName="LegSpaceMinimumHeight" Type="Choice" Format="RadioButtons" Overwrite="TRUE" Required="FALSE"><CHOICES><CHOICE>Yes</CHOICE><CHOICE>No</CHOICE><CHOICE>N/A</CHOICE></CHOICES></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f310}" Name="MinimumTravel" DisplayName="MinimumTravel" Type="Choice" Format="RadioButtons" Overwrite="TRUE" Required="FALSE"><CHOICES><CHOICE>Yes</CHOICE><CHOICE>No</CHOICE><CHOICE>N/A</CHOICE></CHOICES></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f311}" Name="TopOfWorkSurfaceInclude" DisplayName="TopOfWorkSurfaceInclude" Type="Choice" Format="RadioButtons" Overwrite="TRUE" Required="FALSE"><CHOICES><CHOICE>Yes</CHOICE><CHOICE>No</CHOICE><CHOICE>N/A</CHOICE></CHOICES></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f312}" Name="IfStepDeskAdjustment" DisplayName="IfStepDeskAdjustment" Type="Choice" Format="RadioButtons" Overwrite="TRUE" Required="FALSE"><CHOICES><CHOICE>Yes</CHOICE><CHOICE>No</CHOICE><CHOICE>N/A</CHOICE></CHOICES></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f313}" Name="CanAccessedEasily" DisplayName="CanAccessedEasily" Type="Choice" Format="RadioButtons" Overwrite="TRUE" Required="FALSE"><CHOICES><CHOICE>Yes</CHOICE><CHOICE>No</CHOICE><CHOICE>N/A</CHOICE></CHOICES></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f314}" Name="ModestyPanelNoGreaterThan" DisplayName="ModestyPanelNoGreaterThan" Type="Choice" Format="RadioButtons" Overwrite="TRUE" Required="FALSE"><CHOICES><CHOICE>Yes</CHOICE><CHOICE>No</CHOICE><CHOICE>N/A</CHOICE></CHOICES></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f315}" Name="LOADTESTDeformationOutcome" DisplayName="LOADTESTDeformationOutcome" Type="Note" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f316}" Name="LOADTESTDeformationPassed" DisplayName="LOADTESTDeformationPassed" Type="Boolean" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f317}" Name="LOADTESTDeflectionMoreThanOutcome" DisplayName="LOADTESTDeflectionMoreThanOutcome" Type="Note" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f318}" Name="LOADTESTDeflectionMoreThanPassed" DisplayName="LOADTESTDeflectionMoreThanPassed" Type="Boolean" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f319}" Name="LOADTESTDeflectAfterTestingExceedOutcome" DisplayName="LOADTESTDeflectAfterTestingExceedOutcome" Type="Note" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f320}" Name="LOADTESTDeflectAfterTestingExceedPassed" DisplayName="LOADTESTDeflectAfterTestingExceedPassed" Type="Boolean" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f321}" Name="LOADTESTAntiReboundexceedOutcome" DisplayName="LOADTESTAntiReboundexceedOutcome" Type="Note" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f322}" Name="LOADTESTAntiReboundexceedPassed" DisplayName="LOADTESTAntiReboundexceedPassed" Type="Boolean" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f323}" Name="RACKINGTESTDeformationOutcome" DisplayName="RACKINGTESTDeformationOutcome" Type="Note" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f324}" Name="RACKINGTESTDeformationPassed" DisplayName="RACKINGTESTDeformationPassed" Type="Boolean" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f325}" Name="RACKINGTESTAntiReboundexceedOutcome" DisplayName="RACKINGTESTAntiReboundexceedOutcome" Type="Note" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f326}" Name="RACKINGTESTAntiReboundexceedPassed" DisplayName="RACKINGTESTAntiReboundexceedPassed" Type="Boolean" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f327}" Name="DROPTESTStructuralBreakageOutcome" DisplayName="DROPTESTStructuralBreakageOutcome" Type="Note" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f328}" Name="DROPTESTStructuralBreakagePassed" DisplayName="DROPTESTStructuralBreakagePassed" Type="Boolean" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f329}" Name="DROPTESTAntiReboundexceedOutcome" DisplayName="DROPTESTAntiReboundexceedOutcome" Type="Note" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f330}" Name="DROPTESTAntiReboundexceedPassed" DisplayName="DROPTESTAntiReboundexceedPassed" Type="Boolean" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f331}" Name="LEGSTRENGTHTESTStructuralBreakageOutcome" DisplayName="LEGSTRENGTHTESTStructuralBreakageOutcome" Type="Note" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f332}" Name="LEGSTRENGTHTESTStructuralBreakagePassed" DisplayName="LEGSTRENGTHTESTStructuralBreakagePassed" Type="Boolean" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f333}" Name="LEGSTRENGTHTESTAntiReboundexceedOutcome" DisplayName="LEGSTRENGTHTESTAntiReboundexceedOutcome" Type="Note" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f334}" Name="LEGSTRENGTHTESTAntiReboundexceedPassed" DisplayName="LEGSTRENGTHTESTAntiReboundexceedPassed" Type="Boolean" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f335}" Name="STABILITYTESTOutcome" DisplayName="STABILITYTESTOutcome" Type="Note" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f336}" Name="STABILITYTESTPassed" DisplayName="STABILITYTESTPassed" Type="Boolean" Overwrite="TRUE" Required="FALSE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	
	myList.get_fields().addFieldAsXml('<Field ID="{17c6472b-4939-43e8-b220-b30af258f337}" Name="SignedBy" DisplayName="SignedBy" Type="User" Overwrite="TRUE" Required="TRUE"></Field>', true, SP.AddFieldOptions.addToDefaultContentType);
	
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