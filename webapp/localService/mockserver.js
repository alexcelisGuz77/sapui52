//@ts-nocheck
sap.ui.define([
"sap/ui/core/util//MockServer",
"sap/ui/model/json/JSONModel",
"sap/base/util/UriParameters",
"sap/base/Log"

], 
/**
 * @param { typeof sap.ui.core.util.MockServer } MockServer
 * @param { typeof sap.ui.model.json.JSONModel } JSONModel
 * @param { typeof sap/base/util/UriParameters } UriParameters
 * @param { typeof sap/base/Log } Log
 */

function(MockServer, JSONModel, UriParameters, Log ) {
    'use strict';
    var oMockServer,
            _sAppPath = "19SD/saui5/",
            _sJsonFilesPath = _sAppPath + "localService/mockdata";

    var oMockServerInterface= {

        /**
         * Initiazes the mockserver asyn asynchronosly 
         * @protected
         * @param { object } oOptionsParameters 
         * @returns {Promise } a promise that is resolved whet mock server has been stared
         */
        init : function( oOptionsParameters){
            var oOptions = oOptionsParameters || {}; 
            return new Promise (function(fnResolve, fnReject){
                var sManifesUrl = sap.ui.require.toUrl(_aAppPath + "manifest.json" ),
                oManifestModel=  new JSONModel(sManifesUrl);

                oManifestModel.attachRequestCompleted(function (){
                    var oUriParameters = new UriParameters(window.location.href);

                    //parese manifest forlocal metadata URI
                    var _sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                    var oMainDataSource =  oManifestModel.getProperty("/sap.app/dataSource/mainService");
                    var sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);

                    //ensure  there is a tradiking slash 
                    var sMockServerUrl = oMainDataSource.uri && new new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();

                    //create a mock server Instance or stop teh existing one yo reinitialize 
                    if (!oMockServer) {
                        oMockServer= new MockServer ({
                            rootUri : sMockServerUrl
                        })
                    }else {
                        oMockServer.stop();
                    }
                    // Configure mock server with the guieven options or a default delay of 0.5 
                    oMockServer.config({

                        autoRespond: true,
                        autoRespondAfter : (oOptionsParameters.delay || oUriParameters.get("serverDelay"))
                    });

                    // simulate all requests using mock data
                    oMockServer.simulete(sMetadataUrl, {
                        sMockdataBaseUrl : _sJsonFilesUrl,
                        bGenerateMissingMockData : true 
                    });

                    var aRequests = oMockServer.getRequests();

                    //compese an error response For each request 

                    var fnResponse = function (iErrCode, SMessage, aRequest ){
                        aRequest.response =  function(oXhr){
                            oXhr.respond(iErrCode, {"Content-Type" : "text/plain;charset=utf-8"}, sMessage);
                        };
                    };
                    //simulate metadata errors 
                    if (oOptions.metadataError || oUriParameters.get("metadataError")){
                        aRequests.forEach( function (aEntry){
                            if(aEntry.path.toString().indexof("$metaData") > -1){
                                fnResponse(500, "metadata Error", aEntry );
                            }
                        });
                    };
                    //simulate resquet errors 
                    var sErrorParam = oOptions.erroType || oUriParameters.get("errorType");
                    var iErrorCode = sErrorParam === "badResquest" ? 400 : 500 ;

                    if (sErrorPa){
                        oRequests.forEach(function (aEntry){
                            fnResponse(iErrorCode, sErrorParam, aEntry);
                        });
                    };
                    //set requests and start the server 
                    oMockServer.SetRequests(aRequests);
                    oMockServer.start();

                    Log.info("Runnig the appa with mock data");
                    fnResolve();

                    oManifestModel.attachRequestFailed(function (){
                        var sError = "Faild toload the aplication manifest";

                        Log.error(sError);
                        fnReject(new Error(sError))
                    });
                }); 

            });
        }
    };

    return oMockServerInterface;
});
