import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors());

type Posts = Record<string, {
    id: string,
    title: string,
    comments: {
        id: string,
        content: string
        status: "pending" | 'approved' | 'rejected'
    }[]
}>;

const posts: Posts = {};

function handleEvent(type: string,data: any) {
    switch (type) {
        case ("PostCreated"): {
            const { id, title } = data;
            posts[id] = { id, title, comments: [] };
            break;
        };

        case ("CommentCreated"): {
            const { id, content, postId, status } = data;

            const post = posts[postId];
            post.comments.push({ id, content, status });
            break;
        };

        case ("CommentUpdated"): {
            const { id, postId, content, status } = data;

            const post = posts[postId];
            const comment = post.comments.find(item => {
                return item.id === id;
            });

            comment!.status = status;
            comment!.content = content;

            break;
        }
    };
}

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);

    res.send({});
});

app.listen(4002, async () => {
    console.log("Query Services Listening to 4002.")

    const res = await axios.get('http://localhost:4005/events');

    for (const event of res.data) {
        console.log('Processing event:', event.type);
        handleEvent(event.type, event.data);
    }
    
});