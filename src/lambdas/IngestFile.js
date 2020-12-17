'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3();

module.exports.handler = async event => {

  const params = {
    Bucket: event.bucket,
    Key: event.key,
  };

  let content;
  try {
    content = await S3.getObject(params).promise();
    console.log('Download complete');

    //upload into datastore of choice

  } catch (error) {
      throw error;
  }

  return event;
};
