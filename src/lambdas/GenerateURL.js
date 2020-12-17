'use strict';
const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const KSUID = require('ksuid');

module.exports.handler = async event => {

  const ksuid = await KSUID.random();
  const Key = `${ksuid.string}.csv`;

  const params = {
    Bucket: process.env.FILESBUCKET,
    Key,
    Expires: parseInt(process.env.TTL),
    ContentType: 'text/csv'
  };

  const url = await S3.getSignedUrlPromise('putObject', params);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        url,
        key: Key
      }
    ),
  };
};
