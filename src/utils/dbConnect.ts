import { connect as _connect } from "mongoose";

type mongoCT = string | undefined;

async function connect(mongoUri: mongoCT) {
  try {
    await _connect(mongoUri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("> DB is connected :D");
  } catch (error) {
    console.error(error);
  }
}

export default connect;
