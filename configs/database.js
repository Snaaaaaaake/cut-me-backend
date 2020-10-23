const databaseUrl = process.env.DATABASE_URL;

const databaseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = { databaseConfig, databaseUrl };
