import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Cards from './models/dbCards.js';

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connectionUrl = `mongodb+srv://admin:password@cluster0.qtndx.mongodb.net/tinderCloneDB?retryWrites=true&w=majority`;

// Middlewares
app.use(express.json());
app.use(Cors());
app.use(express.static('build'))

// DB Config
mongoose.connect(connectionUrl)

// API Endpoints
app.get('/', (req, res) => res.status(200).send('Happy Hacking!'));

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(data);
            }
    })
})

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});

// Listener
app.listen(port, () => {
    console.log(`Server started, listening on localhost: ${port}`)
});
