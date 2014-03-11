#!/usr/bin/env node
var bitcoin = require('./bitcoin_info');
var munininfo = require('./munin_info');
var munin = require('munin-plugin');

var SCRIPT_NAME = munin.getScriptName();
var CONFIG_PATH = __dirname + "/config";
var CONFIG_FILE = CONFIG_PATH + "/" + SCRIPT_NAME + ".json";
munin.jsonFileRead(CONFIG_FILE, function(err, val){
    if(err) return;
    var list = [];
    bitcoin(val, function(err, info){
        if(err) return;
        munininfo(SCRIPT_NAME, list, info);
        var values = [];
        list.forEach(function(v){
            values.push(v());
        });
        munin.create(values);
    });
});
