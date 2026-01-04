"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./middleware");
const config_1 = require("./config");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/signup', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    try {
        await db_1.UserModel.create({
            username: username,
            password: password
        });
        res.json({
            message: "User signed up"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User already exists"
        });
    }
});
app.post('/signin', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await db_1.UserModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_SECRET);
    }
    ;
});
app.get('/content', middleware_1.userMiddleware, async function (req, res) {
    //@ts-ignore
    const userId = req.userId;
    const content = await db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
});
app.post("/api/v1/content", middleware_1.userMiddleware, async function (req, res) {
    const link = req.body.link;
    const type = req.body.type;
    await db_1.ContentModel.create({
        link,
        //@ts-ignore
        userId: req.userId,
        //@ts-ignore
        tags: [],
    });
    res.json({
        message: "Content added"
    });
});
app.delete('/api/v1/content', async function (req, res) {
    const contentId = req.body.contentId;
    await db_1.ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "The content is removed"
    });
});
app.post("/api/v1/brain/share", middleware_1.userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        db_1.LinkModel.create({
            hash: (0, utils_1.random)(10),
        });
    }
});
app.post("/api/v1/brain/:shareLink", function (req, res) {
});
app.listen(3000);
//# sourceMappingURL=index.js.map