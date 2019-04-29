<template>
  <div class="main">
    <a-layout id="components-layout-demo-custom-trigger" :style="{dispaly:'flex',justifyContent:'flex-start'}">
      <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
        :style="{background: 'rgb(50, 64, 87)',width:'200px', overflow: 'auto', height: '100vh', position: 'fixed', left: 0 } "
      >
        <div class="logo"></div>
        <a-menu
          theme="dark"
          mode="inline"
          :defaultSelectedKeys="[currentRouter]"
          :inlineCollapsed="collapsed"
          :inlineIndent="24"
          @click="handleClick">

          <a-menu-item key="home">
            <a-icon type="home" />
            <span>首页</span>
          </a-menu-item>
          <a-sub-menu key="sub1" @titleClick="handleC">
            <span slot="title">
              <a-icon type="file-markdown" />
              <span>文章管理</span>
            </span>
            <a-menu-item key="WriteArticle" >编写文章</a-menu-item>
            <a-menu-item key="articleList">文章列表</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="classify">
            <a-icon type="bars" />
            <span>分类管理</span>
          </a-menu-item>
          <a-menu-item key="tag">
            <a-icon type="tags" />
            <span>标签列表</span>
            </a-menu-item>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="user" />
              <span>信息管理</span>
              </span>
            <a-menu-item key="userDetail">个人信息</a-menu-item>
            <a-menu-item key="userList">邀请人列表</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout :style="styleObj">
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="tiggerCollapsed"
          />
          <p class="user-name">{{userData.nick_name}}</p>
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '600px'}">
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>

</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data(){
    return {
      collapsed: false,
      currentRouter:'',
      styleObj: {
        marginLeft: '200px'
      }
    }
  },
  computed:mapState([
    'userData'
  ]),
  created(){
    let tempRoute = this.$route.path.split('/')
    this.currentRouter = tempRoute[tempRoute.length - 1 ]
    console.log(this.currentRouter)
  },
  methods: {
    handleClick(obj){
      let routerPath = obj.key;
      this.$router.push({ path: routerPath })
    },
    handleC(obj) {
      console.log(obj)
    },
    tiggerCollapsed(){
      this.collapsed = !this.collapsed
      if(this.collapsed === true){
        this.styleObj.marginLeft = '80px';
      }else {
        this.styleObj.marginLeft = '200px';
      }
    }
  }
}
</script>
<style lang="less">
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
#components-layout-demo-custom-trigger .ant-menu-dark{
  background: rgb(50, 64, 87);
  .ant-menu-inline.ant-menu-sub{
    background: #1f2d3d;
  }
}
.main {
  .user-name {
    display: inline-block;
    float: right;
    margin-right: 40px;
    font-weight: 600px;
  }
}
</style>
