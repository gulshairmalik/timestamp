var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
    res.render('index');
});

app.get('/:timeStamp',function(req,res){
    var simpleDate = new Date(req.params.timeStamp).getTime();
    var unixToDate = new Date(parseInt(req.params.timeStamp)*1000).toDateString();
    var unixTime = new Date(parseInt(req.params.timeStamp));
    var isNumber =  /^\d+$/.test(req.params.timeStamp);
    var result;
    if(simpleDate && isNaN(parseInt(req.params.timeStamp))){
        result = {
            unix:Date.parse(req.params.timeStamp)/1000,
            natural:new Date(req.params.timeStamp).toDateString()
        };
    }
    else if(unixTime && isNumber){
        result = {
            unix:parseInt(req.params.timeStamp),
            natural:unixToDate
        };
    }
    else{
        result = {
            unix:null,
            natural:null
        };
    }
    res.render('output',{res:result});
});

app.listen(port);