const express = require('express');
const https = require('https');
const app = express();
const port = 3000;

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Stream audio continuously
app.get('/stream', (req, res) => {
    console.log('Stream endpoint hit');
    const audioUrl = 'https://vivekfy.vercel.app/audio?url=https://youtu.be/zmwfd8x0DrM?si=WpPDoKvSn5veYUKf'; // Your audio URL
    https.get(audioUrl, (response) => {
        if (response.statusCode !== 200) {
            console.error(`Failed to fetch audio: ${response.statusCode}`);
            res.status(response.statusCode).end();
            return;
        }
        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Transfer-Encoding': 'chunked',
            'X-Content-Type-Options': 'nosniff',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        response.pipe(res);
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
        res.status(500).send('Error fetching audio stream');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

