<template>
  <div class="article-list">
    <div class="search" style="maxWidth:300px">
      <el-input
        placeholder="按文章名称查询"
        v-model="search"
        clearable>
      </el-input>

    </div>
    <el-table
      :stripe="true"
      :data="blogList"
      style="width: 100%">
      <el-table-column
        label='序号'
        type="index"
        align="center"
        width="50"
        :index="indexMethod(1)">
      </el-table-column>
      <el-table-column
        label="文章名称"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-document"></i>
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="文章分类"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-menu"></i>
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="文章标签"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-menu"></i>
          <span style="margin-left: 10px">{{ scope.row.tags }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.ctime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import { yearFromate } from 'common/js/util.js'
export default {
  data() {
    return {
      search:'',
      total:0,
      page:1,
      pageSize:10,
      blogList: []
    }
  },
  created() {
    this.getBlog();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      Axios.get(`/api/deleteBlog?id=${row.id}`).then((data) => {
        console.log(data);
        if(data.data.code === 200 && data.data.status === 'success') {
          this.$message.success('删除成功');
          setTimeout(() => {
            this.blogList.splice(index,1);
          },500)
        }
      })
    },
    indexMethod(index) {
      return index;
    },
    handleCurrentChange(page){
      this.page = page
      this.getBlog(page, this.pageSize)
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.page = 1
      this.getBlog('', this.pageSize)
    },
    getBlog(page = 1,pageSize = 10) {
      Axios.get(`/api/getBlogList?page=${page}&pageSize=${pageSize}`).then(data => {
        console.log(data);
        this.blogList = [];
        if(data.data.code === 200 && data.data.status === 'success'){
          const temp = data.data.data;
          this.total = temp.total
          temp.data.forEach(item =>{
            item.ctime = yearFromate(item.ctime)
            this.blogList.push(item);
          })
          console.log(this.blogList);
        }
      })
    },
  }
}
</script>
<style lang="less">
  .article-list{
    .pagination {
      margin-top: 30px;
      width: 100%;
    }
  }
</style>

