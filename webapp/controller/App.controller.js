//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller", // Control Estandar
    //"sap/m/MessageToast", 

],
    /** 
    *   @param{typeof sap.ui.core.mvc.Controller} Controller
    */
    function (Controller, MessageToast,) { 
        //alert("UI5 is ready");
        "use strict";
        return Controller.extend("19SD.sapui5.controller.App",{

            onInit: function () {

            },
            
            onOpenDialogHeader: function() {
                this.getOwnerComponent().openHelloDialog();
            }

        });
    });