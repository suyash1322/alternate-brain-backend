import express from "express";
import { ContentModel, LinkModel, UserModel } from "./db";
import jwt from 'jsonwebtoken';
import { userMiddleware } from "./middleware";
import { JWT_SECRET } from "./config";
import { random } from "./utils";


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
        userId: req.userId,
        //@ts-ignore
        tags: [],
    })
    res.json({
        message: "Content added"
    })
})

app.delete('/api/v1/content',async function (req, res) {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore

        userId: req.userId
    })

    res.json({
        message: "The content is removed"
    })
})

app.post("/api/v1/brain/share" , userMiddleware , async(req,res) => {
    const share = req.body.share;
    if(share) {
        LinkModel.create({
            userId : req.userId,
            hash: random(10),
        })
    }else {
        LinkModel.deleteOne({
            userId: req.userId
        })
    }
})

app.post("/api/v1/brain/:shareLink" ,function (req,res){
    
})

app.listen(3000);