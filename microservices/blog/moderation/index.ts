import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    switch (type) {
        case ("CommentCreated"): {
            const status = data.content.includes('orange') ? 'rejected' : 'approved'

            try {
                await axios.post('http://localhost:4005/events', {
                    type: 'CommentModerated',
                    data: {
                        ...data,
                        status,
                    }
                });
            }catch(error) {
                console.log(error);
            }
            break
        }
        default:
            console.log(`${type} event is received.`);
            break;
    }
    res.send({});
});

// app.listen(4003, () => 
    console.log("Moderation Services is listenning to 4003.");
})