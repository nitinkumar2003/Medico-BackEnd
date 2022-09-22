const express=require("express");
const cors =require('cors')
require('./db/config')
const User=require('./db/User');
const Appoint=require('./db/Appoint');
const Contact=require('./db/Contact');

const app=express();
app.use(express.json());
app.use(cors());
// Create SignUp Api
app.post('/SignUp',async(req,resp)=>{
  let user=new User(req.body)
  let result=await user.save();
  resp.send(result)
})


// loginAPi
app.post('/login',async(req,resp)=>{
  if(req.body.password && req.body.email){
    let user= await User.findOne(req.body).select("-password")
    if(user){
      resp.send(user)
    }else{
      resp.send({result:"No Data Found"})
    }
  }else{
    resp.send({result:"No Data Found"})
  }
})


// Get SIgnUp Data api
app.get('/SignUp',async(req,resp)=>{
  let user=await User.find();
  if(user.length>0){
    resp.send(user)
  }else{
    resp.send({result:"NO Data FOund"})
  }

})


//Delete SignUp data Api
app.delete("/SignUp/:id",async(req,resp)=>{
  let result=await User.deleteOne({_id:req.params.id})
  resp.send(result)
})




//Get Prefill Data APi
app.get('/SignUp/:id',async(req,resp)=>{
  let result=await User.findOne({_id:req.params.id})
  if(result){
    resp.send(result)
  }else{
    resp.send({result:"NO Record FOund"})
  }
})


// Update SignUp 
app.put("/SignUp/:id",async(req,resp)=>{
    let result =await User.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    resp.send(result)
})















//AppointMent Create 
app.post('/Appoint',async(req,resp)=>{
  let appoint= new Appoint(req.body);
  let result=await appoint.save()
  resp.send(result)
})


//Get AppointMent Data
app.get('/Appoint',async(req,resp)=>{
  let result=await Appoint.find();
  if(result.length>0){
    resp.send(result)
  }else{
    resp.send({result:"No Data Found"})
  }
})

//Delete  Single Data
app.delete('/Appoint/:id',async(req,resp)=>{
  let result=await Appoint.deleteOne({_id:req.params.id})
  resp.send(result)
})

// AppointMent Get Single Prefill Data
app.get('/Appoint/:id',async(req,resp)=>{
  let result=await Appoint.findOne({_id:req.params.id})
  if(result){
    resp.send(result)
  }else{
    resp.send({result:"No Data FOund"})
  }
})

// AppointMent Update Send Response
app.put('/Appoint/:id',async(req,resp)=>{
  let result=await Appoint.updateOne(
    {_id:req.params.id},
    {
      $set:req.body
    }
  )
  resp.send(result)
})



//Seacch AppointMent 
app.get("/search/:key",async(req,resp)=>{
    let result=await User.find({
        "$or":[
        {name:{$regex:req.params.key}},
        {email:{$regex:req.params.key}}
        ]
    });
    resp.send(result)
})



//Create Contact Api
app.post('/contact',async(req,resp)=>{
  let contact=new Contact(req.body)
  let result =await contact.save();
  resp.send(result)
})



app.listen(4000)
