var munin = require('munin-plugin');

var get_info = module.exports = function(filename, list, info){
    var name = filename;
    list.push(function(){
        var g = new munin.Graph(name + ' balance', 'balance', name);
        g.add(new munin.Model.Default('balance').setValue(info.balance));
        g.sortValue();
        return g;
    });
    list.push(function(){
        var g = new munin.Graph(name + ' difficulty', 'difficulty', name);
        g.add(new munin.Model.Default('difficulty').setValue(info.difficulty));
        g.sortValue();
        return g;
    });
    list.push(function(){
        var g = new munin.Graph(name + ' blocks', 'blocks', name);
        g.setScale(true);
        g.add(new munin.Model.Default('blocks').setValue(info.blocks));
        g.sortValue();
        return g;
    });
    list.push(function(){
        var g = new munin.Graph(name + ' connections', 'connections', name);
        g.add(new munin.Model.Default('connections').setValue(info.connections));
        g.sortValue();
        return g;
    });
    list.push(function(){
        var g = new munin.Graph(name + ' transactions', 'transactions', name);
        g.add(new munin.Model.Default('confirmed').setValue(info.confirmed).setDraw('STACK'));
        g.add(new munin.Model.Default('waiting').setValue(info.waiting).setDraw('STACK'));
        g.sortValue();
        return g;
    });
    list.push(function(){
        var g = new munin.Graph(name + ' block age', 'seconds', name);
        g.add(new munin.Model.Default('block_age').setValue(info.block_age));
        g.sortValue();
        return g;
    });
    list.push(function(){
        var g = new munin.Graph(name + ' networkhash', 'hash/s', name);
        g.setScale(true);
        g.add(new munin.Model.Default('networkhash').setValue(info.networkhash));
        g.sortValue();
        return g;
    });
    list.push(function(){
        var g = new munin.Graph(name + ' coinbase', 'amount', name);
        g.add(new munin.Model.Default('coinbase').setValue(info.coinbase));
        g.setScale(true);
        g.sortValue();
        return g;
    });
    list.push(function(){
        var g = new munin.Graph(name + ' coinper', 'percent', name);
        g.add(new munin.Model.Rate('coinper').setValue(info.coinper));
        g.sortValue();
        return g;
    });
    return;
};
