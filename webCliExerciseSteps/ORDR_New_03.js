async function SetDiscount(oInst, detailView = oInst.ActiveView(VIEW_ORDR_DETAIL)) {
		
    // Define variables
    let cardCode = detailView.TextInput(HEADER_CardCode);
    let cardName = detailView.TextInput(HEADER_CardName);
    let code = await cardCode.getValue();

    // Call SL to check BP account balance
    let queryUrl = "/app-web/sl/BusinessPartners?$select=CardCode,CurrentAccountBalance&$filter=CardCode eq '" + code + "'";
    let resp = await fetch(queryUrl, {
        method: "GET",
        credentials: "include"
    });
    
    // Get the response from SL
    let json = await resp.json();
    let res = json.value;
    let ab = res[0].CurrentAccountBalance;
    let bool = "No";
    
    if (ab >= 0) {
        bool = "Yes";
    }
    
    // Show message in either cases (having or not having debts)
    oInst.showMessageBox("Success", `CardCode: ${res[0].CardCode}, \r\nDebt: ${ab}\r\nDiscount: ${bool}`, [{
        label: "OK",
        key: "OK"
    }]);
    
    // If no debts apply the discount
    if (ab >= 0) {
        let discount = detailView.TextInput(Contents_Discount);
        await discount.setValue("20");
    }
}