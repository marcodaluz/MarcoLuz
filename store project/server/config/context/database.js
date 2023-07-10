import Sequelize from "sequelize";

const database = new Sequelize({
  host: "localhost",
  port: 3306,
  username: "marco",
  password: "marco",
  database: "maky",
  dialect: "mysql",
});

export { database };
