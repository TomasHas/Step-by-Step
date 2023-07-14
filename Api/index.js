//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const loadDb = require("./src/controllers/loadDataBase/loadSelections.js");
const loadDbUsers = require("./src/controllers/loadDataBase/loadUsers.js");
const port = process.env.PORT || 3001;
// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  await loadDb.bulkCreateBrands();
  await loadDb.bulkCreateCategories();
  await loadDb.bulkCreateSizes();
  await loadDb.bulkCreateColors();
  await loadDb.bulkCreateGender();
  await loadDb.createAllProducts();
  await loadDbUsers.createUsers();
  server.listen(port, () => {
    console.log(`%s listening at ${port}`); // eslint-disable-line no-console
  });
});
