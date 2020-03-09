import app from "../src/app";
const data = require("./seed.json");

async function truncate() {
  const sequelizeClient = app.get("sequelizeClient");
  await sequelizeClient.query("SET FOREIGN_KEY_CHECKS = 0");
  await sequelizeClient.models.group.truncate({ cascade: false });
  await sequelizeClient.models.user.truncate({ cascade: false });
  await sequelizeClient.models.message.truncate({ cascade: false });
  await sequelizeClient.query("SET FOREIGN_KEY_CHECKS = 1");
}
truncate().then(() => {
  data.forEach(async group => {
    try {
      // @ts-ignore
      const $group = await app.service("groups").create({
        name: group.name,
        data: group.data
      });
      const $id = $group.id;
      group.$users.forEach(user => {
        app.service("users").create({
          group_id: $id,
          ...user
        });
      });
    } catch (e) {
      //console.log(e)
    }
  });
});
