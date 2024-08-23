import { MongoClient } from "mongodb";
import env from "../../dotenv/dotenv";

const { mongodbName, mongodbPort } = env;

const url = `mongodb://localhost:${mongodbPort}`;

const client = new MongoClient(url);

export default (async () => {
  try {
    await client.connect();
    const db = client.db(mongodbName);
    return db.collection("mycollection");
  } catch (err) {
    throw new Error(`${err}`);
  }
})();
