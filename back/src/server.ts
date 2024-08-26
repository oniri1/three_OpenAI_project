import app from "./app";

import sequelize from "./DB/MySQL";
import mongodb from "./DB/Mongo/index";

(async () => {
  try {
    await sequelize.sync({ force: true });
    await mongodb;
    app.listen(app.get("port"), (): void => {
      console.log(app.get("port"), "server open");
    });
  } catch (err) {
    throw err;
  }
})();
