import app from "./app";
import routers from "./routers/index";

app.use(routers);

app.listen(app.get("port"), (): void => {
  console.log(app.get("port"), "server open");
});
