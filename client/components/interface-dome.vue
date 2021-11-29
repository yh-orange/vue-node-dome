<template>
  <div>
    <button type="button" name="button" v-on:click="getmsg">get send</button>
    <button type="button" name="button" v-on:click="postmsg">post send</button>
    <button type="button" name="button" v-on:click="getDome">get</button>
    
    <div>返回结果为： {{message}}</div>
  
    <br>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="ruleForm.phoneNumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="QQ">
        <el-input v-model="ruleForm.QQ" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-input  v-model="databaseName" placeholder="添加数据库"></el-input><button @click="addDatabase">添加数据库</button>
    <el-input  v-model="surfaceName" placeholder="添加表"></el-input><button @click="addSurface">添加表</button>
    <el-input  v-model="addData" placeholder="添加数据"></el-input><button @click="addValue">添加数据</button>
    <el-input  v-model="removeData" placeholder="删除数据"></el-input><button @click="delValue">删除数据</button>
    <el-input  v-model="changeData" placeholder="修改数据"></el-input><button @click="changeValue">修改数据</button>
    <el-input  v-model="viewName" placeholder="查看数据"></el-input><button @click="viewValue">查看数据</button>
  </div>
</template>

<script>
  import api from '@/api/index.js';
  
  export default {
    name: "interface-dome",
    data() {
      var checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入用户名'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        databaseName: '',
        surfaceName: '',
        addData: '',
        removeData: '',
        changeData: '',
        viewName: '',
        message: '',
        ruleForm: {
          username: '',
          password: '',
          phoneNumber: '',
          QQ: ''
        },
        rules: {
          username: [
            { validator: checkUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          phoneNumber: [
            { trigger: 'blur' }
          ],
          QQ: [
            { trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      getmsg() {
        api.request({dong: '123'}).then(res => {
          console.log(res);
          this.message = res && res.data;
        }).catch(error => {
          this.message = error;
        })
      },
      postmsg() {
        api.getDataTest({name: '123'}).then(res => {
          this.message = res && res.data;
        }).catch(error => {
          this.message = error;
        })
      },
      getDome () {
        api.getDome().then(res => {
          this.message = res;
        }).catch(error => {
          this.message = error;
        })
      },
      submitForm() {
        api.login(this.ruleForm).then(res => {
          this.message = res.data.message;
        }).catch(error => {
          this.message = error;
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      addDatabase(){
        api.addDatabase({value:this.databaseName}).then(res => {
          this.message = res.data.message;
        }).catch(error => {
          this.message = error;
        });
      },
      addSurface(){
        api.addSurface({value:this.surfaceName}).then(res => {
          this.message = res.data.message;
        }).catch(error => {
          this.message = error;
        });
      },
      addValue(){
        api.addValue({value:this.addData}).then(res => {
          this.message = res.data.message;
        }).catch(error => {
          this.message = error;
        });
      },
      delValue(){
        api.delValue({value:this.removeData}).then(res => {
          this.message = res.data.message;
        }).catch(error => {
          this.message = error;
        });
      },
      changeValue(){
        api.changeValue({value:this.changeData}).then(res => {
          this.message = res.data.message;
        }).catch(error => {
          this.message = error;
        });
      },
      viewValue(){
        api.viewValue({value:this.viewName || 'SELECT * FROM posts'}).then(res => {
          this.message = res.data.message;
        }).catch(error => {
          this.message = error;
        });
      }
    }
  }
</script>

<style scoped>

</style>
