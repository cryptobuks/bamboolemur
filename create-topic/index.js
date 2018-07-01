var AWS = require('aws-sdk');


exports.handler = function(event, context, callback) {
  var responseBody = {
        bucketName: process.env.S3_BUCKET
    };

  var response = {
        statusCode: 200,
        body: JSON.stringify(responseBody)
    };

  callback(null, response);
}
