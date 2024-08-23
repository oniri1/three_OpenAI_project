import app from "./app";
import routers from "./routers/index";
import sequelize from "./DB/MySQL";
import mongodb from "./DB/Mongo/index";

app.use(routers);

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("몽고 트라이");
    await mongodb;
    app.listen(app.get("port"), (): void => {
      console.log(app.get("port"), "server open");
    });
  } catch (err) {
    throw err;
  }
})();
