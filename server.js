const express = require('express');
const app = express();
const port = 3000;

// Audio URL (You can replace this with your actual audio file URL)
const audioUrl = 'https://vivekfy.vercel.app/audio?url=https://youtu.be/Nl2rqIL3Rpo';

// Song duration in seconds (e.g., 24 hours)
const songDuration = 86400; // 24 hours

app.get('/current_time', (req, res) => {
    const currentTime = new Date();
    const elapsedTime = (currentTime - songStartTime) / 1000;
    const currentPlaybackTime = elapsedTime % songDuration; // Loop the song if it exceeds duration
    res.json({ time: currentPlaybackTime });
});

app.get('/radio', (req, res) => {
    const currentTime = new Date();

    // Calculate the seconds elapsed since the start of the day
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const currentPlaybackTime = (hours * 3600) + (minutes * 60) + seconds;

    // Redirect to the audio URL with the current playback time
    const redirectUrl = `${audioUrl}#t=${currentPlaybackTime}`;
    res.redirect(redirectUrl);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
