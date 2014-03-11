var bitcoin = require('bitcoin');
var async = require('async');

var pipeline = function(client, config, callback){
    var info = {};
    info['max_amount'] = config.maxamount;
    info['coinsperblock'] = config.coinsperblock;
    async.waterfall([
    function(next){
        client.getInfo(function(err, data){
            info['balance'] = data.balance;
            info['blocks'] = data.blocks;
            info['connections'] = data.connections;
            info['difficulty'] = data.difficulty;
            next(err);
        });
    },
    function(next){
        client.getRawMemPool(function(err, data){
            info['waiting'] = data.length;
            next(err);
        });
    },
    function(next){
        client.getMiningInfo(function(err, data){
            info['networkhash'] = data.networkhashps;
            next(err);
        });
    },
    function(next){
        client.getBlockHash(info['blocks'], function(err, hash){
            client.getBlock(hash, function(err, block){
                info['block_age'] = (new Date()/1000|0) - block['time'];
                info['confirmed'] = block['tx'].length;
                next(err);
            });
        });
    }
    ], function(err){
       info['coinbase'] = info['coinsperblock'] * info['blocks'] + config.coininit;
       info['coinper'] = info['coinbase'] / info['max_amount'] * 100;
       callback(err, info);
    });
}
var bitcoin_into = module.exports = function(config, callback){
    var cl = new bitcoin.Client(config);
    pipeline(cl, config, callback);
}
