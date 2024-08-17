<template>
  <div class="box">
    <div class="title">用户登录</div>
    <el-form :rules="loginRule" ref="reflogin" :model="loginfrom">
      <el-form-item prop="user">
        <el-input v-model="loginfrom.user" placeholder="请输入用户名" prefix-icon="User"/>
      </el-form-item>
      <el-form-item prop="passwd">
        <el-input v-model="loginfrom.passwd" placeholder="请输入密码" type="password" show-password prefix-icon="Lock" />
      </el-form-item>
      <el-form-item>
      <el-button type="primary" style="width: 100%" @click="checkLogin">登录</el-button>
    </el-form-item>
    </el-form>
    
  </div>
</template>

<script >
import { ElMessage } from 'element-plus'
export default{
  data(){
    return{
      loginfrom:{
        user:'',
        passwd:''
      },
      // 定义校验规则

      loginRule:{
        user:[{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        // 数组中可以添加多条校验规则，required 为true表示数据必须有值 massag 定义错误提示信息 trigger 申明触发事件
        passwd:[{ required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 3, max: 8, message: '密码必须在3到8位之间', trigger: 'blur' }]
      }
    }
    

  },
  methods:{
    async loginApi(){
      const res=await this.$api.login(this.loginfrom)
      console.log('响应对象：',res.data.message)
      let resutl=res.data.message
      if (resutl==='登录成功'){
        ElMessage({message: '登录成功',type: 'success',plain: true,})
        this.$router.push({name:'home'})
      } else{
        ElMessage({message: '登录失败',type: 'error',plain: true,})
      }
    },
    // 定义方法通过refs接受的对象对值和判断规则进行判断，validate回调函数获取判断结果，交易通过才提交登录
    checkLogin(){
      this.$refs['reflogin'].validate(
        res =>{
          if (res){
            this.loginApi()
          }
        }
      )
    }

  }
}

</script>

<style scoped>
  .box{
    height: 350px;
    width: 500px;
    margin: 200px auto;
    box-shadow: 0 0 5px #7c0871;
    border-radius: 20px;
  }
  .title{
    color: #7c0871;
    height: 80px;
    font: bold 28px/80px '宋体';
    text-align:center
  }
  .el-form{
    margin: 20px;
  }

</style>
