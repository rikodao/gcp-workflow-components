const { IncomingWebhook } = require("@slack/webhook");
const generageTextFromHttp = require("./fromHttp");
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

async function sendSlackNotification(req, res) {
  const text = generageTextFromHttp(req, res);
  await webhook.send({ text });
  res.status(200).send(text);
}

if (require.main === module) sendSlackNotification();
exports.main = sendSlackNotification;
