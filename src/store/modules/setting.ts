import { defineStore } from "pinia";
import { SelfStorage } from '../securels'
import { tablePageSize } from '@/utils/variable';

export const useSettingStore = defineStore('userSystemSetting', {
    state: () => ({
        tablePageSize: tablePageSize, // 默认分页大小
    }),
    getters: {
        getTablePageSize: (state) => {
            return state.tablePageSize;
        },
    },
    actions: {
        setTablePageSize(size: number) {
            this.tablePageSize = size;
        }
    },
    persist: {
        key: 'userSystemSetting',
        storage: SelfStorage,
    }
})
