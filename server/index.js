const express = require('express');
const mongoose= require('mongoose');
const cors= require('cors');
const UserModel= require('./models/Users');

const app = express();
app.use(cors())
app.use(express.json());

mongoose.connect("mongodb+srv://vasundharasingh621:vasumongodb@cluster0.yttmmqf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
// mongoose.connect("mongodb://127.0.0.1:27017/crud")

app.get('/',(req,res) =>{
    UserModel.find()
       .then(users=> res.json(users))
       .catch(err=> res.json(err))
    
})

app.get('/getUser/:id',(req,res) =>{
    const id=req.params.id;
    UserModel.findById({_id:id})
    .then(users=> res.json(users))
    .catch(err=> res.json(err))

})

app.put('/updateUser/:id',(req,res) =>{
    const id=req.params.id;
    const{name,email,age}=req.body;
    UserModel.findByIdAndUpdate({_id:id},{name,email,age})
    .then(users=> res.json(users))
    .catch(err=> res.json(err))
})

app.delete('/deleteUser/:id',(req,res) =>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res=> res.json(res))
    .catch(err=> res.json(err))
})

app.post("/CreateUser",(req,res) =>{
    UserModel.create(req.body)
        .then(user=> res.json(user))
        .catch(err=> res.json(err))           
})


app.listen(3001, () => {
  console.log("Server is Connected");
});
