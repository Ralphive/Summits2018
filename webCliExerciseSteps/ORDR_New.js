// In this script we are referring to three UI components: 
// - the sales orders detail view;
// - the button which creates new sales order; and 
// - the delivery date.
//
// We also refer to the event which handles the order creation.
// 
// The function SetDate calculates the current date + 5 and sets it to the delivery date.
// 
// The function SetDate is called before the click of button “create”.

define(function() {
	// Views
	const VIEW_ORDR_DETAIL = "9b1eb386-3b4e-4570-98e4-4044008cd415";

	// Buttons
	const UUID_BTN_ADD = "bff01f98-5c5e-49b6-8ce4-7b90d875f904";

	// Fields
	const HEADER_DocDueDate = "0ddd3f85-c8b8-41de-86be-05623195eb28";

	// Event names
    const onBeforeButtonClickBtnAdd = `on${UUID_BTN_ADD}BeforeButtonClick`;

	// here we define a function to calculate current date + 5
	async function SetDate(oInst, detailView = oInst.ActiveView(VIEW_ORDR_DETAIL)) {
	    let docDueDate = detailView.TextInput(HEADER_DocDueDate);
	    let docDueDateVal = await docDueDate.getValue();
	
	    if (docDueDateVal === null){
			var date = new Date();
			date.setDate(date.getDate()+5);
			var month = date.getMonth()+1;
			var day = date.getDate();
			month = (Array(2).join('0')+month).slice(-2);
			day = (Array(2).join('0')+day).slice(-2);
			var dateStr = date.getFullYear()+''+month+''+day;
			let deliveryDate = detailView.DatePicker(HEADER_DocDueDate);
			await deliveryDate.setValue(dateStr);
		}
	}
	return{
		// automatically fill the delivery date before creating the sales order
		[ onBeforeButtonClickBtnAdd ]: async function(oInst) {
			await SetDate(oInst);
        }
	};
});
