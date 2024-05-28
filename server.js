const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let audioVolume = 100; // Default volume
let currentAction = ''; // Store the current action
let audioUrl = ''; // Store the current audio URL

app.post('/update-url', (req, res) => {
    const { url } = req.body;
    audioUrl = url;
    res.json({ status: 'URL updated' });
});

app.post('/control', (req, res) => {
    const { action, volume } = req.body;

    // Handle play, pause, stop, skipForward, and skipBackward actions
    if (action === 'play' || action === 'pause' || action === 'stop' || action === 'skipForward' || action === 'skipBackward') {
        currentAction = action;
        res.json({ status: `${action} command received` });
    } else if (volume !== undefined && volume >= 0 && volume <= 100) {
        audioVolume = volume;
        res.json({ status: 'Volume updated', volume: audioVolume });
    } else {
        res.status(400).json({ error: 'Invalid action or volume value' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

