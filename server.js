const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Assume the song started at a specific time
const songStartTime = new Date();  // Song starts when the server starts
const songDuration = 1800; // Song duration in seconds (e.g., 30 minutes)

// Function to calculate current playback time
function getCurrentPlaybackTime() {
    const currentTime = new Date();
    const elapsedTime = (currentTime - songStartTime) / 1000;
    const currentPlaybackTime = elapsedTime % songDuration; // Loop the song if it exceeds duration
    return currentPlaybackTime;
}

app.get('/current_time', (req, res) => {
    res.json({ time: getCurrentPlaybackTime() });
});

// Stream audio continuously
app.get('/stream', async (req, res) => {
    const audioUrl = 'https://vivekfy-server.000webhostapp.com/play/deno?url=https://youtu.be/Nl2rqIL3Rpo'; // Your audio URL
    const response = await axios.get(audioUrl, { responseType: 'stream' });
    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Transfer-Encoding': 'chunked',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    response.data.pipe(res);

    // Send current playback time every second
    const interval = setInterval(() => {
        const currentTime = getCurrentPlaybackTime();
        res.write(`\nTime: ${currentTime}`);
    }, 1000);

    // Cleanup on connection close
    req.connection.on('close', () => {
        clearInterval(interval);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

