const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
mongoose.connect('mongodb://localhost:27017/tolearns');
var todoSchema = new mongoose.Schema({
    item: String
});
var Tolearn = mongoose.model('Tolearn',todoSchema);
// var itemOne = Todo({item:'buy flowers'}).save(function(err){
//     if(err){throw err};
//     console.log('saved')
// })
module.exports = function(app){
    app.get('/tolearn',function(req, res){
        Tolearn.find({},function(err,data){
            if(err){throw err};
            res.render('tolearn',{tolearns:data});
        })     
    });
    app.post('/tolearn',urlencodedParser,function(req,res){
        oneItem = Tolearn(req.body).save(function(err, data){
            if(err){throw err};
            res.redirect('learnlist')
        })     
    });
    app.delete('/tolearn/:item',function(req,res){
        Tolearn.find({item:req.params.item.replace(/-/g," ")}).remove(function(err,data){
            if(err){throw err};
            res.json(data)
        })
    });
    app.get('/learnlist',function(req, res){
        Tolearn.find({},function(err,data){
            if(err){throw err};
            res.render('learnlist',{learnlist:data});
        })     
    });
}