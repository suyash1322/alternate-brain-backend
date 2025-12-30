import express from "express";

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


const app = express();


app.post('/signup' , function (req,res) {
    const username = req.body.username;
    const password = req.body.password;


});

app.post('/signin' , function (req,res){
    const email = req.body.email;
})


app.get('/content', function (req,res){
    
})

app.delete('/content', function (req,res){
    
})