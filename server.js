const express = require('express');
const app = express();
const port = 3000;

// Audio URL (You can replace this with your actual audio file URL)
const audioUrl = 'https://vivekfy.vercel.app/audio?url=https://youtu.be/zmwfd8x0DrM?si=WpPDoKvSn5veYUKf';

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

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Live Radio</title>
        </head>
        <body>
            <h1>Live Radio</h1>
            <audio id="audio" controls autoplay>
                <source src="${audioUrl}#t=${Math.floor(currentPlaybackTime)}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            <script>
                const audio = document.getElementById('audio');
                audio.controls = false; // Disable controls to prevent skipping
                audio.currentTime = ${Math.floor(currentPlaybackTime)};
                audio.play();
            </script>
        </body>
        </html>
    `;
    res.send(html);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

