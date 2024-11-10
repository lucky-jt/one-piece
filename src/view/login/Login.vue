<template>
  <div class="login-container">
    <div class="login-box">
      <h2>系统登录</h2>
      <div class="login-form">
        <div class="form-item">
          <input
            v-model="loginForm.username"
            type="text"
            placeholder="请输入用户名"
          />
        </div>
        <div class="form-item">
          <input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
          />
        </div>
        <div class="form-item">
          <button @click="handleLogin" class="login-btn">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface LoginForm {
  username: string;
  password: string;
}

const loginForm = ref<LoginForm>({
  username: "",
  password: "",
});

const handleLogin = (): void => {
  if (!loginForm.value.username || !loginForm.value.password) {
    alert("请输入用户名和密码");
    return;
  }
  // 这里添加登录逻辑
  console.log("登录信息:", loginForm.value);
};
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-background);
}

.login-box {
  width: 400px;
  padding: 40px;
  background: var(--card-background);
  border-radius: 8px;
  box-shadow: var(--box-shadow);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: var(--text-color);
}

.login-form .form-item {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  background-color: var(--background-color);
  color: var(--text-color);
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: var(--primary-color);
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: var(--primary-color-hover);
}
</style>
