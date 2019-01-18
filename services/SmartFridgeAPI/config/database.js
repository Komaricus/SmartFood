module.exports = (mongoose, config) => {
  const database = mongoose.connection;
  mongoose.Promise = Promise;
  mongoose.connect(config.database, {
    useNewUrlParser: true,
    promiseLibrary: global.Promise
  });
  database.on('error', error => console.log(`Connection to SmartFridge database failed: ${error}`));
  database.on('connected', () => console.log('Connected to SmartFridge database'));
  database.on('disconnected', () => console.log('Disconnected from SmartFridge database'));
  process.on('SIGINT', () => {
    database.close(() => {
      console.log('SmartFridge terminated, connection closed');
      process.exit(0);
    })
  });
};