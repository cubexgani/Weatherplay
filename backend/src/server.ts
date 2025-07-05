import express from 'express'
import cors from 'cors';

process.loadEnvFile();

import { getSongs, getRoast } from './FetchList';

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT ?? '3000'

app.get('/', (req, res) => {
    res.send('Hello World!\n').status(200)
})

app.get('/songs', async (req, res) => {
    // I fully trust my own api to give me completely valid input
    let { temp, rain, lang } = req.query;
    // parse
    const data = [temp, rain].map(Number) as [number, number];
    //if any of these is not a number, or language is null
    if (data.some(isNaN) || !lang)
        return void res.status(404).send("Get railed bozo, params are " + temp + " " + rain + " " + lang + "\n");
    let l : string = lang as string;    // typecasted, with no precautions
    let resp = await getSongs(...data, l);
    res.send(resp).status(200);
})

app.get('/roast', async (req, res) => {
    let {temp, rain} = req.query;
    // parse
    const data = [temp, rain].map(Number) as [number, number];
    //if any of these is not a number
    if (data.some(isNaN))
        return void res.status(404).send(temp + " " + rain);
    
    let resp = await getRoast(...data);
    res.send(resp).status(200);
})

app.listen(port, () => {
    console.log(`Sunny backend listening on port ${port}`)
})