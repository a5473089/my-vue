<template>
  <div class="body">
    <div>
      <div class="title">用户登录</div>
      <div>
        <van-field class="input" @keyup.enter="tab" v-model="username" placeholder="请输入手机号" />
      </div>
      <div>
        <van-field
          ref="pwd"
          class="input"
          @keyup.enter="login"
          v-model="password"
          type="password"
          placeholder="请输入密码"
        />
      </div>
    </div>
    <van-button
      class="loginButton"
      :loading="loadingStatus"
      :disabled="disabledStatus"
      color="#008fd1"
      round
      type="primary"
      text="登录"
      @click="login"
    />
  </div>
</template>


<script>
export default {
  name: "login",
  data() {
    return {
      username: "admin",
      password: "123456",
      loadingStatus: false,
      disabledStatus: false
    };
  },

  methods: {
    login() {
      // loading
      this.loadingStatus = true;
      this.disabledStatus = true; 
      if (this.username === "admin" && this.password === "123456") {
        // 登录成功 跳转首页
        this.$router.push("home");
      } else {
        this.$toast.fail("账户或密码错误");
      }

      this.loadingStatus = false;
      this.disabledStatus = false;
    },
    tab() {
      this.$refs.pwd.focus();
    }
  }
};
</script>
<style scoped>
.body {
  background-image: url(../assets/login.jpg);
  background-size: cover;
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  height: calc(100vh);
  width: 100%;
}
.body div {
  background-color: transparent;
}

div,
button {
  color: white;
  font-weight: 100;
  margin-bottom: 20px;
  font-family: "Microsoft YaHei";
}

.loginButton {
  width: 45vh;
  height: 42px;
  font-size: 16px;
}
.title {
  font-size: 26px;
  letter-spacing: 5px;
}
.input {
  border: 1px #aab2aa solid;
  width: 45vh;
  height: 42px;
  margin-top: 20px;
  padding: 8px 20px;
  border-radius: 21px;
}
/deep/ .input input {
  color: white !important;
}
</style>