
const configResult = require('dotenv').config({ path: `${__dirname}/../config/env/.env` });

const startInstances = (inputCluster, instanceLim) => {
  for (let i = 0; i < instanceLim; i++) {
    inputCluster.fork();
  }
};

const onExit = (worker) => {
  console.log(`worker ${worker.process.pid} died`);
};

const onUncaughtException = (err) => {
  console.log(err);
  process.exit(1);
};

if (configResult.error) {
  console.log(`CONFIG ERROR: ${JSON.stringify(configResult.error)}`);
}

const cpusLength = require('os').cpus().length;
const path = require('path');
global.basePath = path.normalize(`${__dirname}/..`);

const cluster = require('cluster');
const appConfig = require('../config/app');

const numberOfInstances = appConfig.env.instancesCount || cpusLength;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  startInstances(cluster, numberOfInstances);
  cluster.on('exit', onExit);

} else {
  console.log(`Worker ${process.pid} started`);
  process
    .on('uncaughtException', onUncaughtException);

  require('./app');
}
