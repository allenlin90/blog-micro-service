const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const handleEvent = async (type, data) => {
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: { id: data.id, postId: data.postId, status, content: data.content }
    }).catch(e => console.log(e.message));
  }
};

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

const PORT = 4003;
app.listen(PORT, async () => {
  console.log(`moderation service is running on port: ${PORT}`);

  const res = await axios.get('http://event-bus-srv:4005/events').catch(err => console.log(err.message));

  for (let event of res.data) {
    console.log('Processing event: ', event.type);
    handleEvent(event.type, event.data);
  }
});