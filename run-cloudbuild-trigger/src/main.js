const initializeCloudBuild = require("initializeCloudBuildClient");
const PROJECT_ID = process.env.PROJECT_ID;
const TRIGGER_ID = process.env.TRIGGER_ID;
const BRANCH_NAME = process.env.BRANCH_NAME;

async function runCloudBUildTrigger(event, context) {
  const cloudBuildClient = await initializeCloudBuild();
  const runParams = {
    projectId: PROJECT_ID,
    triggerId: TRIGGER_ID,
    requestBody: { branchName: BRANCH_NAME },
  };
  const res = await cloudBuildClient.projects.triggers.run(runParams);
  console.log(res.data);
}

if (require.main === module) runCloudBUildTrigger();
exports.main = runCloudBUildTrigger;
