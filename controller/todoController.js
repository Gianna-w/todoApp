var mongoose = require('mongoose')
//创建表
var todoSchema = new mongoose.Schema({
    txt:String
})
var completeSchema = new mongoose.Schema({
    txt:String
})

//往数据库里面存储数据
var Todo = mongoose.model('Todo',todoSchema)
var Complete = mongoose.model('Complete',completeSchema)

var bodyParser = require('body-parser');
//解析数据
var encodeUrl = bodyParser.urlencoded({extended:false})
var todos = [];
var completes = [];
module.exports = function(app){
    //获取数据
    app.get('/',(req,res)=>{
        Todo.find({},function(err,todos){
            if(err) throw err;
            Complete.find({},function(err,completes){
                if(err) throw err;
                res.render('todo',{'todos':todos,'completes':completes});
            })
        })
    });
    //传递数据
    app.post('/',encodeUrl,(req,res)=>{
        Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        })
    })
    //移动数据
    app.post('/finish',encodeUrl,(req,res)=>{
        var id = req.body.id;
        Todo.findOne({_id:id},function(err,todo){
            if(err) throw err;
            var comp = {
                txt:todo.txt
            }
            Complete(comp).save(function(err,data){
                if(err) throw err;
            })
            Todo.deleteOne({_id:id}).then(()=>{
                res.send('success');
            }).catch(new Function())
        })
    })
    //删除数据
    app.delete('/:id/:entrance',(req,res)=>{
        if(req.params.entrance==1){
            Todo.deleteOne({_id:req.params.id}).then(()=>{
                res.send('success');
            }).catch(new Function())
        }else{
            Complete.deleteOne({_id:req.params.id}).then(()=>{
                res.send('success');
            }).catch(new Function())
        }
    })
}