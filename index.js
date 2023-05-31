var con = require('./connection');
var express=require('express');
var app= express();
var bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
res.sendFile(__dirname+'/index.html')
});

app.post('/',function(req,res){
  var name= req.body.name;
  var email=req.body.email;
  var mno=req.body.phone;
  var msg=req.body.message;
  con.connect(function(error){
    if(error) throw error;

    var sql = "INSERT INTO data(name,email,number,message) VALUES ('"+name+"','"+email+"','"+mno+"','"+msg+"') ";
    con.query(sql,function(error,result){
        if(error) throw error;
        res.send('submitted sucessfully' +result.insertId);
    })
  })
});

app.listen(7000);