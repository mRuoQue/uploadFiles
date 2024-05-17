import path from "path";
import fs from "fs";
import pkg from "./package.json" assert { type: "json" };

function start() {
  const historyPath = path.resolve("./history/history.json");

  if (!fs.existsSync(historyPath)) {
    fs.writeFileSync(historyPath, JSON.stringify({ list: [] }));
  }

  const html = fs.readFileSync(path.resolve("./dist/index.html"), "utf-8");

  const history = JSON.parse(fs.readFileSync(historyPath, "utf-8"));

  const key = Math.floor(Math.random() * 100) +1
  history.list.push({
    time: new Date().toLocaleString("zh-cn"),
    html,
    id: Math.random().toString(16).substr(2),
    version: pkg.version,
    commit: "修改前端项目，测试快速回滚方案",
    key:key
  });

  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
}

start();
