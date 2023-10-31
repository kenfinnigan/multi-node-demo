const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/msg', async (req, res) => {
    const message = req.body;
    
    if (!message.msg) {
        return res.status(400).send('Invalid message format');
    }
    
    if (message.msg.includes('fail')) {
        return res.status(500).send('Something went wrong');
    }

    res.setHeader('Content-Type', 'text/plain');
    res.send(Buffer.from(message.msg).toString('base64'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
