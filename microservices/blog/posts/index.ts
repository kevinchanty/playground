import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors());

type Post = {
    id: string
    title: string
}

const posts: Record<string, Post> = {}

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body

    posts[id] = {
        id,
        title,
    };

    await axios.post('http://event-bus-srv:4005/events', {
        type: "PostCreated",
        data: {
            id,
            title,
        },
    });

    res.status(201).json(posts[id]);
});

app.post('/events', (req,res) => {
    console.log('Received Event', req.body.type);
    
    res.send({});
})

app.listen(4000, () => {
    console.log("v55")
    console.log("Posts service is listening on localhost:4000")
})