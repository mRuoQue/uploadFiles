<template>
  <div class="container">
    <DrawContent></DrawContent>
    <div class="operation">
      <a-button type="primary">
        选择文件
        <input type="file" multiple @change="handleChange" />
      </a-button>
      <a-button type="primary">
        选择文件夹
        <input type="file" webkitdirectory @change="handleChange" />
      </a-button>
    </div>

    <FileList :files="default_files" @delete = 'deleteFile($event)' ></FileList>
    <div class="operation">
      <a-button type="primary" @click="uploadFile"> 开始上传 </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import DrawContent from "../components/drawContent.vue";
import FileList from "../components/fileList.vue";

import useUploadFiles from "../hooks/useUpload.ts";
const { default_files, addFiles, uploadFile ,deleteFile} = useUploadFiles([]);

interface HandleChange {
  (event: Event): void;
}
const handleChange: HandleChange = (event) => {
  const files = event.target?.files;
  addFiles(...files);
};
</script>

<style scoped>
.container {
  width: 95%;
  margin: 20px auto;
  padding-bottom: 50vh;
}
.operation {
  margin: 1em 0;
  display: flex;
  column-gap: 10px;
}
.operation button {
  position: relative;
  cursor: pointer;
}
.operation input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
