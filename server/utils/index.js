const fs = require("fs");

function getDirFileName(originalFilename) {
  let temp = originalFilename ? originalFilename.split("/") : "";
  const len = temp.length;
  let dir = "";
  let filename;
  console.log(temp);
  if (len >= 2) {
    filename = temp[len - 1];
    dir = temp[len - 2];
    return { dir, filename };
  }
  return null;
}

function checkDirExist(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
}


module.exports={
    checkDirExist,
    getDirFileName
}