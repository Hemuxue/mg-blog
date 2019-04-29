<template>
  <div class="login">
    <div class="box" :class="{active: tabKey}">
      <h1 class="title">后台管理系统</h1>
      <a-tabs :defaultActiveKey="defaultKey" @change="callback" >
          <a-tab-pane tab="Login" key="1" forceRender>
            <a-form
            id="components-form-demo-normal-login"
            :form="loginFrom"
            class="login-form"
            @submit="loginSubmit">
            <a-form-item>
              <a-input
                v-decorator="[
                  'phone',
                  { rules: [{ required: true, message: 'Please input your phone number!' }] }
                ]"
                placeholder="phone"
              >
                <a-icon
                  slot="prefix"
                  type="user"
                  style="color: rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'Loginpassword',
                  { rules: [{ required: true, message: 'Please input your Password!' }] }
                ]"
                type="password"
                placeholder="Password"
              >
                <a-icon
                  slot="prefix"
                  type="lock"
                  style="color: rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-checkbox
                v-decorator="[
                  'remember',
                  {
                    valuePropName: 'checked',
                    initialValue: true,
                  }
                ]"
              >
                Remember me
              </a-checkbox>
              <a-button
                type="primary"
                html-type="submit"
                class="login-form-button"
              >
                Log in
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane tab="Register" key="2"  forceRender>
          <a-form
            :form="Registerform"
            @submit="RegisterSubmit"
          >
            <a-form-item
              v-bind="formItemLayout"
              label="E-mail"
            >
              <a-input
                v-decorator="[
                  'email',
                  {
                    rules: [{
                      type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                      required: true, message: 'Please input your E-mail!',
                    }]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item
              v-bind="formItemLayout"
              label="Invitation code"
            >
              <a-input
                v-decorator="[
                  'InvitationCode',
                  {
                    rules: [ {
                      required: true, message: 'Please input your E-mail!',
                    },{
                      validator: validateInvitationCode
                    }]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item
              v-bind="formItemLayout"
              label="Password"
            >
              <a-input
                v-decorator="[
                  'password',
                  {
                    rules: [{
                      required: true, message: 'Please input your password!',
                    }, {
                      validator: validateToNextPassword,
                    }],
                  }
                ]"
                type="password"
              />
            </a-form-item>
            <a-form-item
              v-bind="formItemLayout"
              label="Confirm Password"
            >
              <a-input
                v-decorator="[
                  'confirm',
                  {
                    rules: [{
                      required: true, message: 'Please confirm your password!',
                    }, {
                      validator: compareToFirstPassword,
                    }],
                  }
                ]"
                type="password"
                @blur="handleConfirmBlur"
              />
            </a-form-item>
            <a-form-item
              v-bind="formItemLayout"
              label="NickName"
            >
              <a-input
                v-decorator="[
                  'nick_name',
                  {
                    rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item
              v-bind="formItemLayout"
              label="Phone Number"
            >
              <a-input
                v-decorator="[
                  'phone',
                  {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                  }
                ]"
                style="width: 100%"
              >
              </a-input>
            </a-form-item>
            <a-form-item v-bind="tailFormItemLayout">
              <a-button
                type="primary"
                html-type="submit"
              >
                Register
              </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>

    </div>

  </div>
</template>

<script>
import Axios from 'axios'
import {mapState, mapMutations} from 'vuex'
import editor from 'base/editor/editor';
export default {
  data () {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
      tabKey: false,
      defaultKey: '1'
    };
  },
  beforeCreate () {
    this.loginFrom = this.$form.createForm(this);
    this.Registerform = this.$form.createForm(this);
  },
  created() {
    console.log(this.defaultKey)
  },
  methods: {
    loginSubmit (e) {
      e.preventDefault();
      this.loginFrom.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          console.log(values);
          Axios.post('/api/login',{
            password:values.Loginpassword,
            phone:values.phone,
          }).then( data => {
            console.log(data)
            if(data.data.code === 200) {
              if( data.data.status === 'success') {
                this.$message.success('登录成功');
                console.log(values.remember);
                this.$store.commit('addUserData',data.data.data,values.remember)
                setTimeout(() => {
                  this.$router.push({ path: 'main' })
                }, 1000);
              } else {
                this.$message.error(data.data.msg);
              }
            }
          })
        }
      });
    },
    RegisterSubmit  (e) {
      e.preventDefault();
      console.log(this.Registerform)
      this.Registerform.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values)
          Axios.post('/api/register', {
            nick_name: values.nick_name,
            phone: values.phone,
            password: values.password,
            email: values.email
          }).then((data) => {
            if(data.data.code === 200 && data.data.status === 'success') {
              this.$message.success('注册成功');
              setTimeout(() => {
                  this.defaultKey = '2';
              }, 1000);
            }else {
              this.$message.error('注册失败');
            }
          })
        }
      });
    },
    handleConfirmBlur  (e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword  (rule, value, callback) {
      const form = this.Registerform;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateInvitationCode (rule ,value ,callback) {
      const form  = this.Registerform;
      if(value && value !== 'hechangjuzhenshuai') {
        callback('邀请码错误，请输入正确邀请码');
      }else {
        callback();
      }
    },
    validateToNextPassword  (rule, value, callback) {
      const form = this.Registerform;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },

    callback (key) {
      console.log(key)
      if(key == 2){
        this.tabKey = true
      }else {
        this.tabKey = false
      }
    },
    ...mapMutations(['addUserData'])

  },
};
</script>
<style lang="less">
  #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  #components-form-demo-normal-login .login-form-button {
    width: 100%;
  }
  .login{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url('../../common/image/login-bg.jpg')  no-repeat ;
    background-size: 100% 100%;
    .box{
      background:#fff;
      padding: 30px 30px 10px 30px;
      width:350px;
      position: absolute;
      top:50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      text-align: left;
      &.active{
        width: 500px;
      }
      .title{
        color: #40a9ff;
      }
    }
  }
</style>
