// curl -X POST -H "Content-Type:application/json"  -d '{"message":"ココにメッセージを入れる"}' ${_GCF_URL}
exports.default = (req, res) => {
  const message = req.body.message
  console.log(message)
  return message
};

