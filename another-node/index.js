const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/msg', async (req, res) => {
    const message = req.body;
    
    if (!message.msg) {
        throw new Error('Invalid message format');
    }
    
    if (message.msg.includes('fail')) {
        throw new Error('Something went wrong - we failed!');
    }

    res.setHeader('Content-Type', 'text/plain');
    res.send(Buffer.from(message.msg).toString('base64'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
