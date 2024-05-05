const koa = require("koa");
const cors = require("koa2-cors");
const { koaBody } = require("koa-body");
const path = require("path");

const router = require("./router/index.js");
const setHttpConfig = require("./middleware/setHttpConfig.js");
const koaBodyConfig = require("./middleware/koaBodyUpload.js");
const app = new koa();
const PORT = 3000;

app.use(setHttpConfig.setHeader);
app.use(cors());

app.use(koaBody(koaBodyConfig));

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`listen at ${PORT} ...`);
});
