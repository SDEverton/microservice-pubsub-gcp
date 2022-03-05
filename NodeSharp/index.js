const { PubSub } = require('@google-cloud/pubsub');
const sharp = require('sharp');
const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const fs = require("fs");
require('dotenv').config();

async function quickstart() {
  const projectId = process.env.PROJECT_ID;
  const bucketName = process.env.BUCKET_NAME;
  const topicName = process.env.TOPIC_NAME;
  const fileName = new Date().getTime();
  const text = "Sierra Delta Informática";

  const pubsub = new PubSub({ projectId });
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  const topic = pubsub.subscription(topicName)

  const messageHandler = async message => {
    const width = 750;
    const height = 483;

    const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
      .title { fill: #fff; font-size: 70px; font-weight: bold;}
      </style>
      <text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
    </svg>
    `;
    const svgBuffer = Buffer.from(svgImage);
    const dataBuffer = Buffer.from(String(message.data), 'base64');
    await sharp(dataBuffer)
      .composite([
        {
          input: svgBuffer,
          top: 0,
          left: 0
        },
      ])
      .grayscale()
      .toFile(`${fileName}.png`);
    console.log(`Received message ${message.id}:`);
    const blob = bucket.file(`${fileName}.png`);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream.on("error", (err) => {
      console.log({ message: err.message });
    });
    blobStream.on("finish", async (data) => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      try {
        await bucket.file(`${fileName}.png`).makePublic();
      } catch(e) {
        url = publicUrl;
        return console.log({
          message:
            `Uploaded the file successfully: ${fileName}.png, but public access is denied!`,
          url: publicUrl,
        });
      }
      console.log({
        message: "Uploaded the file successfully: " + `${fileName}.png`,
        url: publicUrl,
      });
      const response = Buffer.from(publicUrl);
      await pubsub
        .topic('create-simulation3')
        .publish(response);
      });
    const base64 = fs.readFileSync(`${fileName}.png`, "base64");
    const buffer = Buffer.from(base64, 'base64');
    blobStream.end(buffer);
    fs.unlinkSync(`${fileName}.png`)
    topic.close()
    message.ack();
  };

  topic.on('message', messageHandler)
}

quickstart().catch(console.error)