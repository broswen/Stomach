'use strict';

const AWS = require('aws-sdk');
const DDB = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async event => {

  console.log(event);

   const params = {
    TableName: process.env.FILESMETADATA,
    Key: {
      PK: event.key
    },
    UpdateExpression: 'set #i = :i',
    ExpressionAttributeNames: {
      '#i' : 'ingested',
    },
    ExpressionAttributeValues: {
      ':i' : new Date().toISOString()
    },
    ReturnValues: 'ALL_NEW'
  };

  const data = await DDB.update(params).promise();

  return data;
};
