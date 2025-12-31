import express from "express";
import { ContentModel, UserModel } from "./db";
import mongoose, { mongo } from 'mongoose';
import jwt from 'jsonwebtoken';
import { userMiddleware } from "./middleware";
import { JWT_SECRET } from "./config";
import { isNamedExportBindings } from "typescript";


const app = express();
app.use(express.json());


app.post('/signup', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    try {
        await UserModel.create({
            username: username,
            password: password
        })

        res.json({
            message: "User signed up"
        })
    }
    catch (e) {
        res.status(411).json({
            message: "User already exists"
        })
    }
});

app.post('/signin', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_SECRET)
    };





})


app.get('/content', userMiddleware, async function (req, res) {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.post("/api/v1/content", userMiddleware, async function (req, res) {
    const link = req.body.link;
    const type = req.body.type;

    await ContentModel.create({
        link,

        //@ts-ignore
        userId: req.userId
        tags: []
    })
    res.json({
        message: "Content added"
    })
})

app.delete('/content', function (req, res) {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore

        userId: req.userId
    })

    res.json ({
        message : "The content has been deleted"
    })
})

app.listen(3000);