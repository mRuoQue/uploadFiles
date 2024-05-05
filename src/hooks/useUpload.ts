import { computed, reactive } from "vue";
// @ts-ignore
import { apiPost } from "../http/create.js";

export default function useUploadFiles(files) {
  const initFiles = (files) => {
    return {
      file: files,
      status: "pedding",
      process: 0,
    };
  };

  const default_files = reactive(files.map(initFiles));

  const addFiles = (...files) => {
    default_files.push(...files.map(initFiles));
  };
  const deleteFile = (...args) => {
    console.log(...args);
    for (const f of args) {
      const index = default_files.indexOf(f);
      console.log(index);

      default_files.splice(index, 1);
      if (f.status === "uploading") f.cancel();
    }
  };

  const final_files = computed(() =>
    default_files.filter((file) => file.status === "pedding")
  );

  // 过滤status = peedding 状态的文件
  const uploadFile = () => {
    final_files.value.forEach(async (file) => {
      file.status = "uploading";

      const form = new FormData();
      const onUploadProgress = (e) => {
        const complete = (e.loaded / e.total) * 100;
        file.progress = complete;
      };
      form.append("file", file.file);

      const { data, cancel } = await apiPost("/uploadFiles", form, {
        onUploadProgress,
      });
      if (data.msg === "success") {
        file.status = "uploaded";
        file.cancel = cancel;
      }
    });
  };

  return {
    default_files,
    addFiles,
    deleteFile,
    uploadFile,
  };
}
