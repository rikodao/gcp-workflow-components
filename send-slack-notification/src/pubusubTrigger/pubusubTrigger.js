const { IncomingWebhook } = require("@slack/webhook");
const generageTextFromPubsub = require("./fromPubsub");
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

async function sendSlackNotification(event, context) {
  const text = generageTextFromPubsub(event, context);
  await webhook.send({ text });
  res.status(200).send(text);
}

if (require.main === module) sendSlackNotification();
exports.main = sendSlackNotification;
