import sequelize from "./config/sequelize";
import User from "./config/tables/User";

sequelize.addModels([User]);
export default sequelize;
