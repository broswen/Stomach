'use strict';

const AWS = require('aws-sdk');
const stepfunctions = new AWS.StepFunctions();


module.exports.handler = async event => {


  console.log(JSON.stringify(event));
  let executions = [];

  for(let record of event.Records) {
    const key = record.s3.object.key;
    const bucket = record.s3.bucket.name;
    const eventTime = record.eventTime;

    const stateMachineArn = process.env.INGESTFILES;
    const params = {
      input: JSON.stringify({key, bucket, eventTime: eventTime}),
      stateMachineArn,
    }

    const data = await stepfunctions.startExecution(params).promise();
    executions.push(data);
  }
    return data;
};
