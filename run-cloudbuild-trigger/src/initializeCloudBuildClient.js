const apis = require("googleapis");

exports.default = async function initializeCloudBuild() {
  const client = await apis.google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  return new apis.cloudbuild_v1.Cloudbuild({ auth: client });
}
