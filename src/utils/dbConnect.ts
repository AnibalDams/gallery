import { connect as _connect } from "mongoose";



async function connect(mongoUri: any) {
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
