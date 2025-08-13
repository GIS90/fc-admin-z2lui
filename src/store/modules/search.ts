import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
    state: () => {
        return {
            list: [] as Menu.MenuOptions[],
        }
    },
    getters: {
        getList: (state) => state.list
    },
    actions: {
        reset() {
            this.$reset();
        }
    },
    persist: {
        key: 'SEARCH',
    },
})
