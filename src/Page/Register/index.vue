<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="login" target="_blank">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone">
        <span class="error-msg">{{ erromsg }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code">
        <button type="button" class="btn-code"
                @click="GetCode">获取验证码
        </button>
        <span class="error-msg">{{ erromsg }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password">
        <span class="error-msg">{{ erromsg }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="surpassword">
        <span class="error-msg">{{ erromsg }}</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="agree">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ erromsg }}</span>
      </div>
      <div class="btn">
        <button @click="UserRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
import {computed, reactive, toRefs,} from "vue";
import {useRoute, useRouter} from "vue-router";
import User from "@/store/User";

export default {
  name: 'Register',
  setup() {
    const UseRouter = useRouter();
    const UseRoute = useRoute();

    const Str = reactive({
      phone: "18099887744",
      code: "",
      password: "45645678112233",
      surpassword: "45645678112233",
      agree: true,
      sucess_message: "",
      erromsg:"",
    })

    const Fun = reactive({
      //获取验证码 18712345678
      async GetCode() {
        try {
          await User.dispatch("GetCode", Str.phone);
          Str.code = computed(() => User.state.code);
        } catch (e) {
          alert(e.message);
        }
      },
      //  用户注册
      async UserRegister() {
        const {phone, code, password, surpassword, agree, sucess_message} = Str;
        let timer = 3;
        try {
          agree === true ? (phone && code && password === surpassword) && await User.dispatch("UserRegister", {
            phone,
            code,
            password,
            surpassword,
          }) : alert("注册需同意协议");
          UseRouter.push("/login")
         //  let timer_router = setInterval(() => timer === 0 ? UseRouter.push("/login") : Str.sucess_message = `注册成功,${timer--}秒后跳转`, 1000);
         // clearInterval(timer_router)
        } catch (e) {
          alert(e.message);
        }
      },
    });

    return {...toRefs(Fun), ...toRefs(Str)}
  },
}
</script>

<style lang="less" scoped>
.btn-code {
  width: 100px;
  height: 38px;
  border: 0;
  background-color: #e60012;
  color: #fff;
}

.btn-code:hover {
  background-color: #ea4a36;
}

.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
        border: 0;
      }

      button:hover {
        background-color: #ea4a36;
      }
    }
  }


  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>