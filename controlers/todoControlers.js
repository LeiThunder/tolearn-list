const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
mongoose.connect('mongodb://localhost:27017/todos');
mongoose.connection.on('connected',()=>{
    console.log('连接成功')
})
mongoose.connection.on('error',()=>{
    console.log('error')
})
mongoose.connection.on('disconnected',()=>{
    console.log('断开连接')
})

var todoSchema = new mongoose.Schema({
    item: String
});
var Todo = mongoose.model('Todo',todoSchema);
// var itemOne = Todo({item:'buy flowers'}).save(function(err){
//     if(err){throw err};
//     console.log('saved')
// })

var data = [{item:'get milk'},{item:'walk dog'},{item: 'kick some coding ass'}]
var headerNavList = ['Todo', 'ToLearn', 'Training', 'Task','Reading']
module.exports = function(app){
    app.get('/todo',function(req, res){
        Todo.find({},function(err,data){
            if(err){throw err};
            res.render('todo',{todos:data});
        })     
    });
    app.post('/todo',urlencodedParser,function(req,res){
        // data.push(req.body);
        var itemOne = Todo(req.body).save(function(err,data){
            if(err){throw err};
            res.json(data); 
        })   
    });
    app.delete('/todo/:item',function(req,res){
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g, "-") !== req.params.item;
        // })
        Todo.find({item:req.params.item.replace(/-/g," ")}).remove(function(err,data){
            if(err){throw err};
            res.json(data);
        })
    })
}