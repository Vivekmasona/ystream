const express = require('express');
const app = express();
const port = 3000;

// Audio URL (You can replace this with your actual audio file URL)
const audioUrl = 'https://vivekfy-server.000webhostapp.com/play/deno?url=https://youtu.be/Nl2rqIL3Rpo';

// Assume the song started at a specific time when the server starts
const songStartTime = Date.now();  // More precise than `new Date()`
const songDuration = 86400; // Song duration in seconds (e.g., 24 hours)

app.get('/current_time', (req, res) => {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - songStartTime) / 1000; // Calculate elapsed time in seconds
    const currentPlaybackTime = elapsedTime % songDuration; // Loop the song if it exceeds duration
    res.json({ time: currentPlaybackTime });
});

app.get('/radio', (req, res) => {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - songStartTime) / 1000;
    const currentPlaybackTime = elapsedTime % songDuration;

    // Redirect to the audio URL with the current playback time
    const redirectUrl = `${audioUrl}#t=${Math.floor(currentPlaybackTime)}`;
    res.redirect(redirectUrl);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

