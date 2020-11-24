const {IncomingWebhook} = require('@slack/webhook');
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

// subscribeSlack is the main function called by Cloud Functions.
async function sendSlackNotification (pubSubEvent, context) {
    const build = eventToBuild(pubSubEvent.data);

    // Skip if the current status is not in the status list.
    // Add additional statuses to list if you'd like:
    // QUEUED, WORKING, SUCCESS, FAILURE,
    // INTERNAL_ERROR, TIMEOUT, CANCELLED
    const status = ['SUCCESS', 'FAILURE', 'INTERNAL_ERROR', 'TIMEOUT'];
    if (status.indexOf(build.status) === -1) {
        return;
    }

    // Send message to Slack.
    const message = createSlackMessage(build);
    webhook.send(message);
};

// eventToBuild transforms pubsub event message to a build object.
const eventToBuild = (data) => {
    return JSON.parse(Buffer.from(data, 'base64').toString());
}

const STATUS_COLOR = {
    "SUCCESS": '#34A853', // green
    "FAILURE": '#EA4335', // red
    "TIMEOUT": '#FBBC05', // yellow
    "INTERNAL_ERROR": '#EA4335', // red
};

// createSlackMessage creates a message from a build object.
const createSlackMessage = (build) => {
    const message = {
        text: `Build \`${build.id}\``,
        mrkdwn: true,
        attachments: [
            {
                title: 'Build logs',
                title_link: build.logUrl,
                color: STATUS_COLOR[build.status],
                fields: [{
                    title: 'Status',
                    value: build.status,
                }, {
                    title: 'Repository',
                    value: build.substitutions.REPO_NAME
                }, {
                    title: 'Branch',
                    value: build.substitutions.BRANCH_NAME
                }]
            }
        ]
    };
    return message;
}

if (require.main === module) sendSlackNotification();
exports.main = sendSlackNotification;
