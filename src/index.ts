import express from "express";
import { UserModel } from "./db";
import mongoose, { mongo } from 'mongoose';
import jwt from 'jsonwebtoken';
const JWT_SECRET = "suyash";

const app = express();
app.use(express.json());


app.post('/signup' ,async function (req,res) {
    const username = req.body.username;
    const password = req.body.password;
try{
    await UserModel.create({
        username : username,
        password : password
    })

    res.json({
        message : "User signed up"
    })
}
catch(e){
    res.status(411).json({
        message : "User already exists"
    })
}
});

app.post('/signin' , async function (req,res){
    const username = req.body.username;
    const password  = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if (existingUser){
        const token = jwt.sign({
            id : existingUser._id
        },JWT_SECRET)
    };



   

})


app.get('/content', function (req,res){
    
})

app.delete('/content', function (req,res){
    
})

app.listen(3000);