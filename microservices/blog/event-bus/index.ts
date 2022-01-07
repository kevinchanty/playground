import express, { Request } from 'express';
import * as core from 'express-serve-static-core';
import axios from 'axios';

const app = express();
app.use(express.json());

const events = [] as {type:string, data:any}[];

app.post('/events', (req: Request<core.ParamsDictionary, any, {type:string, data:any}>, res) => {
    const event = req.body;

    events.push(event);

    try {
        axios.post('http://posts-clusterip-srv:4000/events', event);
        // axios.post('http://localhost:4001/events', event);
        // axios.post('http://localhost:4002/events', event);
        // axios.post('http://localhost:4003/events', event);
    }catch (error) {
        console.log(error);
    }
        
    res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
    res.json(events);
});

app.listen(4005, () => {
    console.log('Listening on 4005')
});