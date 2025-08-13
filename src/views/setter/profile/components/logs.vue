<template>
    <el-card shadow="hover" header="操作历史">
        <fc-table ref="fcTableRef" :tableName="apiName" :requestApi="fetchTableData" :columns="columns" :showDownloadBtn="showDownloadBtn">
            <template #method="scope">
                <el-tag :type="scope.row.tag" effect="dark">{{ scope.row.method }}</el-tag>
            </template>
        </fc-table>
    </el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { SetProfileLogApi } from "@/api/modules/setter";
import { ColumnProps, FcTableInstance } from "@/components/fcTable/model";

// fcTabel 实例
const fcTableRef = ref<FcTableInstance>();
const apiName = "setterProfileLog"; // 组件标识名称
const showDownloadBtn=ref(false); // 禁用下载按钮

// 表格配置项
const columns = reactive<ColumnProps<any>[]>([
  { prop: "id", label: "序号", width: 80 },
  { prop: "create_time", label: "请求时间" },
  { prop: "ip", label: "IP来源" },
  { prop: "path", label: "请求路径" },
  { prop: "method", label: "请求方式" },
  { prop: "cost", label: "花销时间(单位：s)" },
]);

// 表格数据
const fetchTableData = async (params: any) => {
  return await SetProfileLogApi(params);
};
</script>
