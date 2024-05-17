const fs = require("fs");
const path = require("path");
const getFilePath = path.resolve(__dirname, "../../../history/history.json");
const setFilePath = path.resolve(__dirname, "../../../dist/index.html");

const useHistoryList = (ctx, next) => {
  let data = null;
  const res = fs.readFileSync(getFilePath, { encoding: "utf8" });
  if (res) {
    data = {
      code: 200,
      status: "success",
      msg: "读取文件成功",
      data: JSON.parse(res),
    };
  } else {
    data = {
      code: 200,
      status: "fial",
      msg: "读取文件失败",
    };
  }

  ctx.body = data;
};

const useBack = (ctx, next) => {
  const body = ctx.request.body;
  console.log(body);
  try {
    const res = fs.readFileSync(getFilePath, { encoding: "utf8" });

    const db = JSON.parse(res);
    const currentVersion = db.list.find((v) => v.key === body.key);

    fs.writeFileSync(setFilePath, currentVersion.html);
    ctx.body = {
      code: 200,
      status: "success",
      msg: "回滚成功",
    };
  } catch (error) {
    ctx.body = {
      code: 200,
      status: "fail",
      msg: error,
    };
  }
};

module.exports = {
  useHistoryList,
  useBack,
};
