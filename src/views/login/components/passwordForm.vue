<template>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="0" size="large" @keyup.enter="login">
        <!--账户-->
        <el-form-item prop="user">
            <el-input v-model="form.user" prefix-icon="User" clearable :placeholder="$t('login.userPlaceholder')">
                <!-- 用户+登录权限
                <template #append>
                    <el-select v-model="userType" style="width: 130px;">
                        <el-option :label="$t('login.admin')" value="admin"></el-option>
                        <el-option :label="$t('login.user')" value="user"></el-option>
                    </el-select>
                </template>
                -->
            </el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
            <el-input v-model="form.password" prefix-icon="Lock" clearable show-password
                :placeholder="$t('login.PWPlaceholder')"></el-input>
        </el-form-item>
        <!--记住我 + 忘记密码-->
        <el-form-item style="margin-bottom: 10px;">
            <el-col :span="12">
                <el-checkbox :label="$t('login.rememberMe')" v-model="form.autologin"></el-checkbox>
            </el-col>
            <el-col :span="12" class="login-forgot">
                <a @click="resetPassWord">{{ $t('login.forgetPassword') }}？</a>
                <!-- 后续开通短信API后，再开发重置密码功能
                <router-link to="/reset_password">{{ $t('login.forgetPassword') }}？</router-link>
                -->
            </el-col>
        </el-form-item>
        <!--滑块验证-->
        <SliderCheck :success-fun="sliderVerifySuccess" :error-fun="sliderVerifyError" />
        <!--登录-->
        <el-form-item style="margin-top: 25px;">
            <el-button type="primary" style="width: 100%;" :loading="islogin" @click="login(loginForm)">
                {{ $t('login.signIn') }}
            </el-button>
        </el-form-item>
        <div class="login-reg" v-if="isRegistry">
            {{ $t('login.noAccount') }}
            <router-link to="/user_register">{{ $t('login.createAccount') }}</router-link>
        </div>
    </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import {ElMessage, ElNotification, type FormInstance, FormRules} from 'element-plus'
import { useI18n } from "vue-i18n";
import router from '@/router'
import encryptionTool from '@/utils/encryption'
import { AuthLoginApi, AuthMenuApi } from '@/api/modules/auth'
import { useAuthStore } from "@/store/modules/auth";
import { useMenuStore } from "@/store/modules/menu";
import timeTool from "@/utils/time";
import SliderCheck from "./sliderCheck.vue";

const isRegistry = import.meta.env.VITE_IS_REGISTRY === 'true'

interface FormData {
    user: string;
    password: string;
    autologin: boolean;
};

const { t } = useI18n();
const authStore = useAuthStore();
const menuStore = useMenuStore();
const islogin = ref(false);
const form = reactive<FormData>({
    user: '',
    password: '',
    autologin: false
});
const isPass = ref(false);

const rules = reactive<FormRules<FormData>>({
    user: [
        { required: true, message: t('login.userError'), trigger: 'blur' }
    ],
    password: [
        { required: true, message: t('login.PWError'), trigger: 'blur' }
    ]
});
const loginForm = ref<FormInstance>();

const login = async (formEl: FormInstance | undefined) => {
    // 滑块验证
    if (!isPass.value) {
      ElMessage.error(t('login.sliderError'));
      return;
    };

    if (!formEl) return
    // 验证表单
    await formEl.validate(async (valid) => {
        if (!valid) return
        islogin.value = true;
        // 准备请求数据
        const data = {
            username: form.user,
            password: encryptionTool.MD5(form.password),
            t24: form.autologin
        };

        try {
            // 获取 token
            const authData = await AuthLoginApi(data);
            authStore.token = authData.data.token
            authStore.userInfo = authData.data.userInfo

            // 获取菜单
            let menuData = await AuthMenuApi();
            if (menuData.data.menu.length === 0) {
                islogin.value = false;
                alert("当前用户无任何菜单权限，请联系系统管理员")
                return
            }
            menuStore.list = menuData.data.menu
            menuStore.permissions = menuData.data.permissions

            router.replace({ path: '/' });
            const timeSection = timeTool.getTimeSection(new Date())
            const tip = timeSection + "好，" + authData.data.userInfo.userName
            ElMessage.success(tip);
            islogin.value = false;
        } catch (error) {
            islogin.value = false;
        }
    })
};

// 重置密码
const resetPassWord = () => {
  ElNotification({
    title: '提示',
    dangerouslyUseHTMLString: true,
    message: '请联系平台管理员进行重置：<strong>高明亮</strong>',
    type: 'success'
  });
};

// 滑块验证失败回调
const sliderVerifySuccess = () => {
  isPass.value = true;
};
// 滑块验证失败回调
const sliderVerifyError = () => {
  isPass.value = false;
};
</script>

<style></style>
