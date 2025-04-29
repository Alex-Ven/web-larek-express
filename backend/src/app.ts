import express from 'express';

const app = express();
app.get('/product', (req, res) => {res.send([]); });
app.listen(3000, () => { console.log('listerning on port 3000'); });
