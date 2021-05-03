# Tiktok ETL Job

This job pulls advertising data from the tiktok API and distributes it to the
datawarehouse.

## Environment Variables

```
SOURCE_URL=https://ads.tiktok.com/open_api/v1.1
SOURCE_TOKEN=[TIKTOK TOKEN]
SOURCE_IDS=[...]
TARGET_URL=https://api.ignite-board.com/data/dev
TARGET_TOKEN=[HYPER63 TOKEN]
```

## Developer Setup

> NOTE: nodejs and aws-cli are required see https://nodejs.org and https://aws.amazon.com/cli/

```
cd src
npm install -g @architect/architect
npm install
```

## Test

```
cd src
npm test
```

## Setup production deploy

You need to make sure your deployment has all of the environment variables properly set

```
arc env production KEY value
```

For Example:

```
arc env production SOURCE_URL "https://ads.tiktok.com/open_api/v1.1"
```

## Deploy to Production

```
export AWS_PROFILE=primal
export AWS_REGION=us-east-1
arc deploy --production
```

## Monitor logs

```
arc logs production src
```

## Developer Notes

This job is a scheduled architect job that is deployed in the aws cloud using aws lambda functions. The job gets invoked from aws and is setup to run up to 15 minutes, if the job exceeds 15 minutes it is automatically terminated.

### project structure

```
- src
  - index.js - main file pipeline
  - lib
    - index.js - etl logic file
    - utils.js - basic functional pipeline utils with fetch
```

### Testing

`lib/index_test.js` provides a full end to end mocked test that should serve for testing any code changes within the job.

### Summary

The job breaks the pipeline process into for distinct processes:

* Extract - purpose to pull the data from the source
* Transform - modify the source structure to match the requirements of the target
* Load - load the data into the target api
* Report - generate log information on result for on going monitoring

Each one of these functions are located in the `lib/index.js` file, so this is the file
that will more than likely require mofification. The transform function is the function that will most likely undergo changes, to standardize the shape of the input.

