const path = require("path");
const { getDirFileName, checkDirExist } = require("../utils/index");

function onFileBegin() {
  return function (name, file) {
    const dirMap = getDirFileName(file.originalFilename);
    const newPath = path.join(__dirname, `../../upload`);

    if (dirMap) {
      const filePath = `${newPath}/${dirMap.dir}`;
      checkDirExist(filePath);
      file.filepath = `${filePath}/${dirMap.filename}`;
    } else {
      file.filepath = `${newPath}/${file.originalFilename}`;
    }
  };
}

module.exports = {
  multipart: true,
  formidable: {
    uploadDir: "upload",
    keepExtensions: true,
    maxFieldsSize: 2 * 1024 * 1024,
    multipart: true,
    onFileBegin: onFileBegin(),
  },
};
