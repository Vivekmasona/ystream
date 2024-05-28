const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let audioStatus = 'stop'; // Initial status of the audio player
let audioUrl = ''; // Initial URL of the audio
let volume = 100; // Initial volume
let skip = ''; // Initial skip status

app.post('/control', (req, res) => {
    const { action, value } = req.body;

    // Update the audioStatus or volume based on the action received
    if (action === 'play') {
        audioStatus = 'play';
    } else if (action === 'pause') {
        audioStatus = 'pause';
    } else if (action === 'stop') {
        audioStatus = 'stop';
    } else if (action === 'volume') {
        volume = value;
    } else if (action === 'skipForward' || action === 'skipBackward') {
        skip = action;
    }

    res.json({ status: 'Button click received', action });
});

app.get('/audio-status', (req, res) => {
    res.json({ status: audioStatus, volume: volume, skip: skip });
});

app.post('/update-url', (req, res) => {
    const { url } = req.body;
    audioUrl = url;
    res.json({ status: 'URL updated' });
});

app.get('/current-url', (req, res) => {
    res.json({ url: audioUrl });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

