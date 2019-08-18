<template>
  <div class='login'>
    <el-card class='login-card'>
     <div class='title'>
       <img src="../../assets/img/logo_index.png" alt="">
     </div>
     <el-form ref="myForm" :model="formData" :rules="rules">
       <el-form-item prop="mobile">
         <el-input v-model="formData.mobile"  placeHolder="请输入用户手机号"></el-input>
       </el-form-item>
       <el-form-item prop="code">
         <el-input v-model="formData.code" style='width:60%' placeHolder="请输入验证码"></el-input>
         <el-button  style='float:right' >发送验证码</el-button>
       </el-form-item>
       <el-form-item prop="check">
           <el-checkbox v-model="formData.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
       </el-form-item>
       <el-form-item>
         <el-button @click="login" style='width:100%' type='primary'>登录</el-button>
       </el-form-item>
     </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    var checkFunc = function (rule, value, callback) {
      if (!value) { callback(new Error('协议必须同意哦')) }
      callback()
    }
    return {
      formData: {
        mobile: '',
        code: '',
        check: false
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '用户手机号不能为空'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '用户手机号格式错误'
          }
        ],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          len: 6,
          message: '验证码长度为6'
        }],
        check: [{
          required: true,
          validator: checkFunc
        }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myForm.validate((isOK, params) => {
        this.$axios({
          method: 'post',
          url: 'authorizations',
          data: this.formData
        }).then(result => {
          window.localStorage.setItem('user-info', JSON.stringify(result.data.data))
          this.$router.push('/home')
        }).catch(() => {
          this.$message({ message: '登录失败', type: 'warning' })
        })
      })
    }
  }
}
</script>

<style lang='less'>
   .login {
     background-image: url(../../assets/img/login_bg.jpg);
     height: 100vh;
     background-size: cover;
     display: flex;
     justify-content: center;
     align-items: center;
     .login-card {
       width: 400px;
       height: 350px;
       .title {
         text-align: center;
         margin: 20px 0;
         img {
           width: 180px;
           height:40px;
         }
       }
     }
   }
</style>
