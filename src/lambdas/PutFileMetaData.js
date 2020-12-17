'use strict';

const AWS = require('aws-sdk');
const DDB = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async event => {

  console.log(event);

  const uploaded = new Date().toISOString();
  const ingested = false;

  const params = {
    TableName: process.env.FILESMETADATA,
    Item: {
      PK: event.key,
      bucket: event.bucket,
      uploaded: event.eventTime
    }
  }

  const data = await DDB.put(params).promise();

  return event;
};
