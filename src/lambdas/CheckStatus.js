'use strict';

const AWS = require('aws-sdk');
const DDB = new AWS.DynamoDB.DocumentClient();
const qs = require('querystring');

module.exports.handler = async event => {

  console.log(event);

  if(!event.queryStringParameters.key) {
    console.log(`no key in query string`);
    return {
      stateCode: 400,
      body: JSON.stringify({})
    }
  }


  const params = {
    TableName: process.env.FILESMETADATA,
    Key: {
      PK: event.queryStringParameters.key
    }
  }
  const data = await DDB.get(params).promise();


  return {
    statusCode: 200,
    body: JSON.stringify(
      data
    ),
  };
};
