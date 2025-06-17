import express from 'express'
import cors from 'cors';

process.loadEnvFile();

import getSongs from './FetchList';

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT ?? '3000'

app.get('/', (req, res) => {
    res.send('Hello World!\n').status(200)
})

app.get('/songs/:temp/:rain', async (req, res) => {
    let { temp, rain } = req.params;
    // parse
    const data = [temp, rain].map(Number) as [number, number];
    //if any of these is not a number
    if (data.some(isNaN))
        return void res.status(404).send("get out\n");
    
    let resp = await getSongs(...data);
    res.send(resp).status(200);
})

app.listen(port, () => {
    console.log(`Sunny backend listening on port ${port}`)
})