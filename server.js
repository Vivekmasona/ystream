const express = require('express');
const app = express();
const http = require('http');
const port = 3000;

// Assume the URL to stream audio from
const audioUrl = 'https://vivekfy-server.000webhostapp.com/play/deno?url=https://youtu.be/Nl2rqIL3Rpo';

app.get('/stream', (req, res) => {
    const options = {
        headers: {
            'Content-Type': 'audio/mpeg'
        }
    };

    http.get(audioUrl, options, (response) => {
        response.pipe(res);
    }).on('error', (err) => {
        console.error(err);
        res.sendStatus(500);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
