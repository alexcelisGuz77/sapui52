//@ts-nocheck
sap.ui.define([
    "../localService/mockserver",
    "sap/m/MessageBox"
], 
/**
 * @param { typeof sap.m.MessageBox } MessageBox
 */

function(mockserver, MessageBox  ) {
    'use strict';

    var aMockserver = [];

    //initial the mock server 
    aMockserver.push(mockserver.init());

    Promise.all(aMockserver).catch( function(oError){
        MessageBox.console.error(oError.message);
    }).finally(function () {
        sap.ui.require(["module:sap/ui/core/ComponentSupport"]);
    });
    
});
