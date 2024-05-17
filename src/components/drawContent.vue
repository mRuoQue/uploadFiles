<template>
  <div
    class="drag-area"
    :class="{ draging: isDraging }"
    @dragenter="dragEnterHandler"
    @dragover="dragEnterHandler"
    @drop="dropHandler"
    @dragleave="dragLeaveHandler"
  >
    <slot>
      <p class="section">
        <i class="iconfont i-shangchuan"></i>
        <span>将目录或多个文件拖拽到此进行扫描</span>
      </p>
      <p class="section">支持的文件类型：{{ fileExts }}</p>
      <p>每个文件允许的最大尺寸：{{ maxFileSize }}</p>
    </slot>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { fileSize, validExt, validSize } from "../utils/index";
const emit = defineEmits(["drop"]);
const props = defineProps({
  supportExts: {
    type: Array,
    default: () => [
      ".jpeg",
      ".jpg",
      ".bmp",
      ".gif",
      ".png",
      ".webp",
      ".html",
      ".json",
    ],
  },
  size: {
    type: Number,
    default: 1024 * 1024,
  },
});
const maxFileSize = computed(() => fileSize(props.size));
const fileExts = computed(() => props.supportExts.join("、"));

const isDraging = ref(false);

const dragEnterHandler = (event) => {
  if (!event.dataTransfer.types.includes("Files")) return;

  event.preventDefault();
  isDraging.value = true;
};
const dragLeaveHandler = (event) => {
  event.preventDefault();
  isDraging.value = false;
};
const dropHandler = async (event) => {
  event.preventDefault();
  isDraging.value = false;

  // 拿到文件列表,读取文件句柄数据
  let fileList = await Promise.all(
    Array.from(event.dataTransfer.items).map((item) =>
      handleEntry(item.webkitGetAsEntry())
    )
  );

  fileList = fileList
    .flat(Infinity)
    .filter((f) => validExt(props.supportExts,f.name) && validSize(props.size,f.size));

  emit("drop", fileList);
};

const handleEntry = async (entry) => {
  return new Promise((resolve) => {
    if (entry.isFile) {
      entry.file(resolve);
      return;
    }
    const dirReader = entry.createReader();
    dirReader.readEntries(async (entries) => {
      resolve(await Promise.all(entries.map(handleEntry)));
    });
  });
};
</script>

<style scoped>
.drag-area {
  width: 100%;
  line-height: 30px;
  color: #888;
  border: 1px dashed #dedede;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0;
}
.draging {
  border-color: #2565c1;
  background: #eee;
}
.section {
  display: flex;
  justify-content: center;
  column-gap: 1em;
  align-items: center;
}
.i-shangchuan {
  font-size: 3em;
}
</style>
