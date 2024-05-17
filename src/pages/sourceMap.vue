<template>
  <div class="table-list">
    <a-table :dataSource="dataSource" :columns="columns" :pagination="false">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'action'">
          <a-popconfirm
            v-if="dataSource.length"
            @confirm="confirm"
            title="Sure to delete?"
          >
            <a-button
              type="primary"
              danger
              size="small"
              shape="round"
              @click="(e) => handleSelect(record)"
              >选择版本</a-button
            >
          </a-popconfirm>
        </template>
      </template>
      <template #expandedRowRender="{ record }">
        <div>
          {{ record.commit }}
        </div>
      </template>
    </a-table>
    <!-- <div
      :style="{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '50px',
      }"
    >
      <a-button type="primary" @click="rollBack">回退版本</a-button>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, effect } from "vue";
import { apiGet, apiPost } from "../http/create.js";
import { columns } from "../data/table.js";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
const router = useRouter();

let dataSource = ref([]);
let backVersion = ref(null);

const confirm = async () => {
  const params = {
    name: "smallma",
    key: backVersion?.value?.key,
  };
  const { data } = await apiPost("/history/back", params);
  if (data.status === "success") {
    message.warn(data.msg);
  } else {
    message.warn(data.msg);
  }
};

const handleSelect = (record) => {
  backVersion.value = record;
};

effect(async () => {
  const { data } = await apiGet("/history/list");
  dataSource.value = data.data.list;
});
</script>

<style scoped>
.table-list {
  padding: 20px;
}
</style>
