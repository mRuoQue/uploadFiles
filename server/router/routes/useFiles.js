const Router = require("koa-router");
const fs = require("fs");
const path = require("path");

const route = new Router();

const useFiles = (ctx, next) => {
  const file = ctx.request.files.file;

  let data = null;
  if (!file) {
    data = {
      code: 200,
      msg: "上传失败",
      err: "",
    };
  } else {
    data = {
      code: 200,
      msg: "success",
      filename: file.originalFilename,
      newFilename: file.newFilename,
      size: file.size,
    };
  }

  ctx.body = data;
};

module.exports = useFiles;
