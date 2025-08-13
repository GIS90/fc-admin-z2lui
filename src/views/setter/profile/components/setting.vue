<template>
    <el-card shadow="hover" header="语言主题">
        <el-form ref="form" label-width="120px" style="margin-top:20px;">
            <el-form-item :label="$t('user.nightmode')">
                <el-switch v-model="sysGlobalStore.sysDark" inline-prompt active-icon="el-icon-moon"
                    inactive-icon="el-icon-sunny"></el-switch>
                <div class="el-form-item-msg">{{ $t('user.nightmode_msg') }}</div>
            </el-form-item>
            <el-form-item :label="$t('user.theme.color')">
                <el-color-picker v-model="sysGlobalStore.sysColor" :predefine="colorList">></el-color-picker>
            </el-form-item>
            <el-form-item :label="$t('user.language')">
                <el-select v-model="sysGlobalStore.sysLang">
                    <el-option label="简体中文" value="zh-cn"></el-option>
                    <el-option label="English" value="en"></el-option>
                </el-select>
                <!-- <div class="el-form-item-msg">{{ $t('user.language_msg') }}</div>-->
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useSysGlobalStore } from "@/store/system/global.js";
import { themeColor } from '@/utils/variable';

const sysGlobalStore = useSysGlobalStore()
const colorList = reactive(themeColor);

</script>
