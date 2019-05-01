<template>
  <div class="article-list">
    <div class="search" style="maxWidth:300px">
      <el-input
        placeholder="按手机号/email查询"
        v-model="search"
        clearable>
      </el-input>

    </div>
    <el-table
      :stripe="true"
      :data="userList"
      style="width: 100%">
      <el-table-column
        label='序号'
        type="index"
        align="center"
        width="50"
        :index="indexMethod(1)">
      </el-table-column>
      <el-table-column
        label="用户名"
        width="180">
        <template slot-scope="scope">
          <a-icon type="user" />
          <span style="margin-left: 10px">{{ scope.row.nick_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="手机号码"
        width="180">
        <template slot-scope="scope">
          <a-icon type="phone" />
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="邮箱"
        width="180">
        <template slot-scope="scope">
          <a-icon type="mail" />
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.cTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <img src="/api/getUser" alt="">
  </div>
</template>
<script>
import Axios from 'axios'
import { yearFromate } from 'common/js/util.js'
export default {
  data() {
    return {
      search:'',
      userList: []
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      Axios.post('/api/deleteUser', {
        id: row.id
      }).then(data => {
        if(data.data.code === 200 && data.data.status === 'success') {
          this.userList.splice(index,1);
          this.$message.success('删除成功');
        }
      })
    },
    indexMethod(index) {
      return index;
    },
    getUser() {
      Axios.get('/api/getUser').then((data) =>{
        console.log(data)
        if(data.data.code === 200 && data.data.status ==='success') {
          let data2 = data.data
          data2.data.forEach( (item) => {
            item.cTime = yearFromate(item.cTime)
            this.userList.push(item);
          })
        }
      })
    }
  }
}
</script>
<style lang="less">

</style>


