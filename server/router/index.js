const Router = require("koa-router");
const multer = require("koa-multer");
const path = require("path");
const router = new Router();

const useFiles = require("./routes/useFiles.js");
const rollupBack = require("./routes/rollupBack.js");


router.get("/uploadFiles", useFiles);

router.post("/uploadFiles", useFiles);

// 版本回退路由
router.get("/history/list", rollupBack.useHistoryList);
router.post("/history/back", rollupBack.useBack);

module.exports = router;
