export const validExt = (source, name) => source.includes(extname(name));

export const validSize = (source, size) => size <= source;

export function extname(e) {
  const i = e?.lastIndexOf(".");
  if (i < 0) return "";

  return e.substring(i).toLowerCase();
}

export function fileSize(size) {
  let number = size;
  let unit = "bype";
  if (number >= 1024 ** 3) {
    number = number / 1024 ** 3;
    unit = "G";
  } else if (number >= 1024 ** 2) {
    number = number / 1024 ** 2;
    unit = "M";
  } else if (number >= 1024) {
    number = number / 1024;
    unit = "KB";
  }
  number = number.toFixed(2);
  return +number + unit;
}

export const columns = [
  {
    title: "文件名",
    key: "name",
    ellipsis: true,
  },
  {
    title: "类型",
    key: "type",
  },
  {
    title: "大小",
    key: "size",
  },
  {
    title: "状态",
    key: "status",
  },
  {
    title: "操作",
    key: "operation",
  },
];
