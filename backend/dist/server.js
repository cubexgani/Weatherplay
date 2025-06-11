"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
process.loadEnvFile();
const FetchList_1 = __importDefault(require("./FetchList"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT ?? '3000';
app.get('/', (req, res) => {
    res.send('Hello World!\n').status(200);
});
app.get('/songs/:isDay/:temp/:rain', async (req, res) => {
    let { isDay, temp, rain } = req.params;
    // parse
    const data = [isDay, temp, rain].map(Number);
    //if any of these is not a number
    if (data.some(isNaN))
        return void res.status(404).send("get out\n");
    let resp = await (0, FetchList_1.default)(...data);
    res.send(resp).status(200);
});
app.listen(port, () => {
    console.log(`Sunny backend listening on port ${port}`);
});
