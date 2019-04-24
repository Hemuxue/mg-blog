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
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label='序号'
        type="index"
        align="center"
        width="50"
        :index="indexMethod">
      </el-table-column>
      <el-table-column
        label="用户名"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="手机号码"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-menu"></i>
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="邮箱"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-menu"></i>
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search:'',
      tableData: [
        {
          name: '深入理解js',
          phone: '分类一',
          email: '标签一',
          date: '2016-05-02',
        }, {
          name: '深入理解js',
          phone: '分类一',
          email: '标签一',
          date: '2016-05-02',
        }, {
          name: '深入理解js',
          phone: '分类一',
          email: '标签一',
          date: '2016-05-02',
        }, {
          name: '深入理解js',
          phone: '分类一',
          email: '标签一',
          date: '2016-05-02',
        }
      ]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    indexMethod(index) {
      return index;
    },
  }
}
</script>
<style lang="less">

</style>


