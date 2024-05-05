<template>
  <div
    class="drag-area"
    :class="{
      draging: isDraging,
    }"
  >
    <slot>
      <p class="section">
        <i class="iconfont i-shangchuan"></i>
        <span>将目录或多个文件拖拽到此进行扫描</span>
      </p>
      <p class="section">支持的文件类型：{{ supports }}</p>
      <p>每个文件允许的最大尺寸：{{ maxSize }}</p>
    </slot>
  </div>
</template>

<script setup>
import { computed } from "vue";

const isDraging = computed(() => {
  return true;
});
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
