<template>
  <div id="authModal" class="modal" v-if="isOpen">
      <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <div v-if="isLoginMode">
              <div class="title">로그인</div>
              <form @submit.prevent="handleLogin" class="form-box">
                  <input type="text" v-model="loginForm.email" placeholder="이메일">
                  <input type="password" v-model="loginForm.password" placeholder="비밀번호">
                  <button type="submit" class="submit-btn">로그인</button>
              </form>
          </div>
          <div v-else>
              <div class="title">회원가입</div>
              <form @submit.prevent="handleRegister" class="form-box">
                  <input type="text" v-model="registerForm.name" placeholder="닉네임">
                  <input type="text" v-model="registerForm.email" placeholder="이메일">
                  <input type="password" v-model="registerForm.password" placeholder="비밀번호">
                  <button type="submit" class="submit-btn">회원가입</button>
              </form>
          </div>
          <button @click="toggleMode" class="toggle-btn">{{ isLoginMode ? '회원가입' : '로그인' }} 폼으로 변경</button>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
data() {
  return {
    isOpen: false,
    isLoginMode: true,
    loginForm: {
      email: '',
      password: ''
    },
    registerForm: {
      name: '',
      email: '',
      password: ''
    }
  }
},
methods: {
  ...mapActions(['register', 'login']),
  openModal() {
    this.isOpen = true;
  },
  closeModal() {
    this.isOpen = false;
  },
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  },
  async handleLogin() {
    try {
      await this.login(this.loginForm);
      this.isOpen = false;
    } catch (error) {
      console.error(error);
    }
  },
  async handleRegister() {
    try {
      await this.register(this.registerForm);
      this.isOpen = false;
    } catch (error) {
      console.error(error);
    }
  }
}
}
</script>

<style scoped>
.modal {
  overflow-y: hidden;
  overflow-x: hidden;     
}
.modal-content {
position: relative;
background-color: #fefefe;
margin: 3% auto; 
padding: 20px;
border: 1px solid #888;
width: 40% !important;
height: auto;
overflow: auto;
}
.title {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 10px;
}
.form-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.submit-btn {
  margin-top: 10px;
}
.toggle-btn {
  margin-top: 20px;
  text-align: center;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
