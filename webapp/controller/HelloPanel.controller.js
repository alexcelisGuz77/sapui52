//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller", // Control Estandar
    "sap/m/MessageToast"

],
    /** 
    *   @param{typeof sap.ui.core.mvc.Controller} Controller
    *   @param{typeof sap.m.MessageToast} MessageToastoller
    */
    function (Controller, MessageToast) { 
        //alert("UI5 is ready");
        "use strict";
        return Controller.extend("19SD.sapui5.controller.HelloPanel",{

            onInit: function () {

            },

            onShowhello: function (){
                //read text from i18n model 
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                //read property from data model 
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMSG = oBundle.getText("helloMsg", [sRecipient]);
                MessageToast.show(sMSG);/*modulo sincrono*/
            },


            onOpenDialog: function(){
          
                this.getOwnerComponent().openHelloDialog();
              /*  const oView = this.getView();
                if(!this.byId("helloDialog")){
                    Fragment.load({
                        id : oView.getId(),
                        name :  "19SD.sapui5.view.HelloDialog",
                        controller :  this
                    }).then(function (oDialog){
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                }else{
                    this.byId("helloDialog").open();
                }*/
       
            },



        });
    });