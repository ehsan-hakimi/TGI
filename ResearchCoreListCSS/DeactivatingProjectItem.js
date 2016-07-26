<script type="text/javascript">

function updateListItem() {
JSRequest.EnsureSetup();
var listItemID=JSRequest.QueryString['ID'];
var ListName = "Research Core List";
var siteURL;
    var clientContext = new SP.ClientContext.get_current(); 
    
    if (clientContext != undefined && clientContext != null) {
    siteURL=_spPageContextInfo.webAbsoluteUrl;
    var oList = clientContext.get_web().get_lists().getByTitle(ListName);

    this.oListItem = oList.getItemById(listItemID);

    oListItem.set_item('RCisActive', '0');

    oListItem.update();

    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
    alert('Record deactivated successfully');
    window.location = siteURL+"/Lists/ResearchCoreList";
    }else{
    console.log('contect is null or undefined');
  }
}

function onQuerySucceeded() {

    console.log('Item updated!');
}

function onQueryFailed(sender, args) {

    console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}
function getItemToBeDeactive(){
updateListItem();
}
</script> 
<p>Deactivating an item will remove that record from this list and prevent record to be appear in any other related list for Q/A and insurance porpuses</p>
<div style="text-align:center"><input onclick="getItemToBeDeactive()" type="button" value="deactivate this item" style="width: 200px;"/></div>