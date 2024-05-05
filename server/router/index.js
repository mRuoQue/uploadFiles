const Router = require("koa-router");
const multer = require("koa-multer");
const path = require("path");
const router = new Router();

const useFiles = require("./routes/useFiles.js");

const storage = multer.diskStorage({
  // cb是callback回调函数的缩写
  dest: (req, file, cb) => {
    cb(null, "../upload");
  },
  filename: (req, file, cb) => {
    // 文件名取 时间戳和原文件的后缀名进行组合
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
// 表示将上传的文件指定地址存放，若没有该文件，则创建文件夹
const upload = multer({ storage: storage });

router.get("/uploadFiles", useFiles);

router.post("/uploadFiles", useFiles);

module.exports = router;
