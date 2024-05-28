const express = require('express');
const https = require('https');
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
app.get('/stream', (req, res) => {
    const audioUrl = 'https://vivekfy-server.000webhostapp.com/play/deno?url=https://youtu.be/Nl2rqIL3Rpo'; // Your audio URL
    https.get(audioUrl, (response) => {
        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Transfer-Encoding': 'chunked',
            'X-Content-Type-Options': 'nosniff',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        response.pipe(res);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

