const express = require('express')
const multer  = require('multer')
const fs = require("fs");
const { PubSub } = require('@google-cloud/pubsub');
require('dotenv').config();

const app = express()
const pubsub = new PubSub({ projectId: process.env.PROJECT_ID });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  }
})

const image = multer({ storage: storage })

app.post('/profile', image.single('avatar'), (req, res, next) => {
  console.log(req.file)
  const base64 = fs.readFileSync(req.file.path, "base64");
  const dataBuffer = Buffer.from(base64);
  fs.unlinkSync(req.file.path)
  pubsub.topic(process.env.TOPIC_NAME).publish(dataBuffer);

  const subscribe = pubsub.subscription(process.env.SUBSCRIBE_NAME);

  const messageHandler = async message => {
    message.ack();
    res.json({ url: String(message.data) });
    subscribe.close()
  };

  subscribe.on('message', messageHandler);
})

app.listen(process.env.PORT, () => console.log('tá rodando'))