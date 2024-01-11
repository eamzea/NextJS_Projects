const { connect } = require('mongoose');

const DB = async () => {
  try {
    if (process.env.NODE_ENV === 'development') {
      await connect(process.env.DB_URL_DEV, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });

      console.log('Development DB connected');
    } else {
      await connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });

      console.log('DB connected');
    }
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
    process.exit(1);
  }
};

module.exports = DB;
