// curl -X POST -H "Content-Type:application/json"  -d '{"message":"ココにメッセージを入れる"}' ${_GCF_URL}
exports.default = (event, context) => {
  const message = Buffer.from(event.data, 'base64').toString()
  const messageObj = JSON.parse(message)
  console.log(messageObj);
  return messageObj
};

