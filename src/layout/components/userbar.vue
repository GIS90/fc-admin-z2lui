<template>
    <div class="user-bar">
        <!--搜索-->
        <el-tooltip effect="dark" content="搜索" placement="bottom">
            <div class="panel-item hidden-sm-and-down" @click="searchClick">
                <el-icon>
                    <Search />
                </el-icon>
            </div>
        </el-tooltip>
        <!--全屏-->
        <el-tooltip effect="dark" content="全屏" placement="bottom">
            <div class="screen panel-item hidden-sm-and-down" @click="fullScreenClick">
                <el-icon>
                    <FullScreen />
                </el-icon>
            </div>
        </el-tooltip>
        <!--任务中心-->
        <el-tooltip effect="dark" content="任务中心" placement="bottom">
            <div class="tasks panel-item" @click="tasksClick">
                <el-icon>
                    <Bell />
                </el-icon>
            </div>
        </el-tooltip>
        <!--用户-->
        <el-dropdown class="user panel-item" trigger="click">
            <div class="user-avatar">
                <el-avatar :size="30" :src="authStore.userInfo.avatar"
                           :shape='authStore.userInfo.sex === "M" ? "square" : "circle"'
                />
                <label>{{ authStore.userInfo.userName }}</label>
                <el-icon>
                    <ArrowDown />
                </el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="userInfoClick()">
                        <el-icon>
                            <User />
                        </el-icon>{{ $t("header.personalData") }}
                    </el-dropdown-item>
                    <el-dropdown-item @click="clearCache()">
                        <el-icon>
                            <Edit />
                        </el-icon>{{ $t("header.clearCache") }}
                    </el-dropdown-item>
                    <el-dropdown-item divided @click="logoutClick()">
                        <el-icon>
                            <SwitchButton />
                        </el-icon>{{ $t("header.logout") }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!--主题设置-->
        <el-tooltip effect="dark" content="主题设置" placement="bottom">
            <div class="tasks panel-item" @click="settingClick">
                <el-icon>
                    <Setting />
                </el-icon>
            </div>
        </el-tooltip>
    </div>

    <!--搜索工具-->
    <el-dialog v-model="searchVisible" width="55%" top="5vh" center :show-close="false" destroy-on-close>
        <search @selectMenu="searchVisible = false" />
    </el-dialog>

    <!--任务中心-->
    <Task v-model:visible="tasksVisible" />


  <!--主题设置-->
    <el-drawer title="主题设置" v-model="settingVisible" :size="320" append-to-body destroy-on-close>
        <setting />
    </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ElMessageBox } from 'element-plus';
import search from '../views/search.vue'
import Task from '../views/task.vue'
import setting from '../views/setting.vue';
import router from '@/router';
import { useAuthStore } from "@/store/modules/auth";
import { useSysGlobalStore } from '@/store/system/global';
import { AuthLogoutApi } from "@/api/modules/auth"

const authStore = useAuthStore()
const sysGlobalStore = useSysGlobalStore()
const searchVisible = ref(false)
const tasksVisible = ref(false)
const settingVisible = ref(false)

onMounted(() => {})

//全屏
const fullScreenClick = () => {
    const element = document.documentElement as HTMLElement;
    // 定义一个类型守卫来检查是否为全屏状态
    const isFullScreen = (): boolean => {
        return (
            !!document.fullscreenElement ||
            !!(document as any).mozFullScreen ||
            !!(document as any).webkitIsFullScreen ||
            !!(document as any).msFullscreenElement // 强制类型断言来处理msFullscreenElement可能不存在的情况
        );
    };

    if (isFullScreen()) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if ((document as any).msExitFullscreen) { // 强制类型断言来处理msExitFullscreen可能不存在的情况
            (document as any).msExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen();
        } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
        }
    } else {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if ((element as any).msRequestFullscreen) {
            (element as any).msRequestFullscreen();
        } else if ((element as any).mozRequestFullScreen) {
            // 注意: mozRequestFullScreen 通常是带 'S' 的
            // 但这里保持与原始代码一致
            (element as any).mozRequestFullScreen();
        } else if ((element as any).webkitRequestFullscreen) {
            (element as any).webkitRequestFullscreen();
        }
    }
}

// 搜索
const searchClick = () => {
    searchVisible.value = true
};

// 任务中心
const tasksClick = () => {
    tasksVisible.value = true
};

// 主题设置
const settingClick = () => {
  settingVisible.value = true
};

//进入个人信息页面
const userInfoClick = () => {
    router.push({ path: '/setter/profile' });
};

//清除缓存
const clearCache = () => {
    ElMessageBox.confirm('清除缓存会将系统初始化，包括主题、语言设置等，是否继续？', '提示', {
        type: 'info',
    }).then(() => {
        sysGlobalStore.$reset()
        window.location.reload()
    }).catch(() => {
        //取消
    })
};

//退出登录
const logoutClick = () => {
    ElMessageBox.confirm('确认是否退出当前用户？', '提示', {
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
    }).then(() => {
        AuthLogoutApi().then(() => {
            // 清空本地缓存
            authStore.$reset();
            router.replace({
                path: '/login'
            })
        }).catch(() => {
            ElMessageBox.close()
        })
    }).catch(() => {
        //取消退出
    })
};
</script>


<style scoped>
.user-bar {
    display: flex;
    align-items: center;
    height: 100%;
}

.user-bar .panel-item {
    padding: 0 10px;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
}

.user-bar .panel-item i {
    font-size: 16px;
}

.user-bar .panel-item:hover {
    background: rgba(0, 0, 0, 0.1);
}

.user-bar .user-avatar {
    height: 49px;
    display: flex;
    align-items: center;
}

.user-bar .user-avatar label {
    display: inline-block;
    margin-left: 5px;
    font-size: 13px;
    cursor: pointer;
}

.msg-list li {
    border-top: 1px solid #eee;
}

.msg-list li a {
    display: flex;
    padding: 20px;
}

.msg-list li a:hover {
    background: #ecf5ff;
}

.msg-list__icon {
    width: 40px;
    margin-right: 15px;
}

.msg-list__main {
    flex: 1;
}

.msg-list__main h2 {
    font-size: 15px;
    font-weight: normal;
    color: #333;
}

.msg-list__main p {
    font-size: 13px;
    color: #999;
    line-height: 1.8;
    margin-top: 5px;
}

.msg-list__time {
    width: 100px;
    text-align: right;
    color: #999;
}

.dark .msg-list__main h2 {
    color: #d0d0d0;
}

.dark .msg-list li {
    border-top: 1px solid #363636;
}

.dark .msg-list li a:hover {
    background: #383838;
}

.badge {
    margin-top: 4px;
}
</style>
