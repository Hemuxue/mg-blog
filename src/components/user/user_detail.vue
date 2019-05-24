<template>
  <div class="user">
    <div class="user-box">
      <a-form :form="Registerform" @submit="RegisterSubmit">
        <a-form-item v-bind="formItemLayout" label="E-mail">
          <a-input
            :disabled="disableFlag"
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
        <a-form-item v-bind="formItemLayout" label="NickName">
          <a-input
            v-decorator="[
              'nick_name',
              {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
              },
            ]"
            :disabled="disableFlag"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Phone Number">
          <a-input
            v-decorator="[
              'phone',
              {
                rules: [{ required: true, message: 'Please input your phone number!' }],
              }
            ]"
            style="width: 100%"
            :disabled="disableFlag"
          ></a-input>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Password">
          <a-input
            v-decorator="[
              'password',
              {
                rules: [{
                  required: true, message: 'Please input your password!',
                }],
              }
            ]"
            type="password"
            :disabled="disableFlag"
          />
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-button type="primary" v-if="disableFlag" @click.native="disableFlag = false">编辑</a-button>
          <a-button type="primary" html-type="submit" v-if="!disableFlag">保存</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import Axios from "axios";
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      },
      disableFlag: true,
      id:''
    };
  },
  computed: mapState(["userData"]),
  beforeCreate() {
    this.Registerform = this.$form.createForm(this);
  },
  created() {
    // this.setValue(this.userData)
  },
  mounted() {
    this.setValue(this.userData);
    this.id = this.userData.id
  },
  methods: {
    RegisterSubmit(e) {
      e.preventDefault();
      this.Registerform.validateFieldsAndScroll((err, values) => {
        if (!err) {
          Axios.post('/api/updateUser', {
            nick_name: values.nick_name,
            phone: values.phone,
            password: values.password,
            email: values.email,
            id: this.id
          }).then((data) => {
            if(data.data.code === 200 && data.data.status === 'success') {
              this.$message.success('修改成功');
              setTimeout( () => {
                this.disableFlag = true;
                this.Registerform.setFieldsValue({
                  password: '',
                  confirm:''
                })
              },500)
            }
          })
        }
      });
    },
    setValue(data) {
      this.Registerform.setFieldsValue({
        email: data.email,
        nick_name: data.nick_name,
        phone: data.phone
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    callback(key) {
      if (key == 2) {
        this.tabKey = true;
      } else {
        this.tabKey = false;
      }
    }
  }
};
</script>
<style lang="less">
.user {
  .user-box {
    width: 500px;
  }
}
</style>
