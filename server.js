const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const news = require('./routes/news');
const webpush = require('./push');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/news', news);

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: 'Push Test' });
    webpush.sendNotification(subscription, payload).catch(error => console.error(error));
});


mongoose.connect('mongodb+srv://zbrdarovski:talamasca@newsappcluster.3nuxr5s.mongodb.net/newsArticlesDB')
.then(() => {
    console.log("Connected to db.");
    app.listen(3000, () => {
        console.log('App running on port 3000.');
    });
}).catch((error) => {
    console.log(error);
});