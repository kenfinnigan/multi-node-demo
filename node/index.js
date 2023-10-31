const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/processMessage', async (req, res) => {
  const message = req.body;

  if (!message.sender || !message.msg) {
    return res.status(400).json({ error: 'Invalid message format' });
  }

  function apiResponse1() {
    return axios.post('http://python-service:5000/message', { message: message.msg }, { headers: { 'Content-Type': 'application/json' } })
      .catch(function (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        res.status(500).json({ error: 'Error processing the first API call' });
      });
  }

  function apiResponse2() {
    return axios.post('http://another-node-service:3000/msg', { msg: message.msg }, { headers: { 'Content-Type': 'application/json' } })
      .catch(function (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        res.status(500).json({ error: 'Error processing the second API call' });
      });
}

  Promise.all([apiResponse1(), apiResponse2()])
    .then(function ([apiResponse1, apiResponse2]) {

          // Combine the responses
          const combinedResponse = {
            response1: apiResponse1.data,
            response2: apiResponse2.data,
          };

          res.json(combinedResponse);
        })
    .catch(function (error) {
        console.error(error);
    res.status(500).json({ error: 'Error processing the message' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
