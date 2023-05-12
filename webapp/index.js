//@ts-nocheck
sap.ui.define([
    "sap/ui/core/ComponentContainer"
],
    /*
    *   @param{typeof sap.ui.core.ComponentContainer} ComponentContainer
    *
    */
    function (ComponentContainer) {
        //alert("UI5 is ready");
       
        new ComponentContainer({
            name: "19SD.sapui5",
            settings: {
                id: "sapui5"
            },
            async: true
        }).placeAt("content");
    });



    