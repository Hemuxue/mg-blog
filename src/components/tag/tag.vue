import Axios from 'axios';
<template>
  <div class="tags">
    <div class="add" >
      <el-button size="small" type="primary" @click="dialogFormVisible = true">新建标签</el-button>
    </div>
    <el-table
      :stripe="true"
      :data="tagList"
      style="width: 80%">
      <el-table-column
        label='序号'
        type="index"
        align="center"
        width="120px"
        :index="indexMethod(1)">
      </el-table-column>
      <el-table-column
        label="标签名称"
        align="center"
        >
        <template slot-scope="scope">
          <span >{{ scope.row.tag }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="关联数量"
        align="center"
        >
        <template slot-scope="scope">
          <span >{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.ctime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
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
    <el-dialog title="新建标签" @close="handleClose" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="标签名称" :label-width="formLabelWidth">
          <el-input v-model="form.tag" autocomplete="off" style="maxWidth:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreateClick">创 建</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Axios from 'axios'
import { yearFromate } from 'common/js/util.js'
export default {
  data() {
    return {
      tagList: [],
      form: {
        tag: '',
      },
      formLabelWidth: '80px',
      dialogFormVisible: false,
      page:1,
      pageSize:10,
      total:10
    }
  },
  created() {
    this.getTags();
  },
  methods: {
    handleDelete(index, row) {
      Axios.post('/api/deleteTag', {
        id: row.id
      }).then(data => {
        if(data.data.code === 200 && data.data.status === 'success') {
          this.tagList.splice(index,1);
          this.$message.success('删除成功');
        }
      })
    },
    indexMethod(index) {
      return index;
    },
    handleClose(){
      this.form.tag = ''
    },
    handleCreateClick() {
      Axios.post('/api/createTag', {
        tag: this.form.tag
      }).then(data => {
        let temp = data.data;
        if(temp.code === 200 && temp.status === 'success') {
          this.$message.success('创建成功');
          setTimeout( () => {
            this.getTags();
            this.dialogFormVisible = false
          },1000)

        }
      })
    },
    getTags(page = 1,pageSize = 10) {
      Axios.post('/api/getTags', {
        page: page,
        pageSize: pageSize
      }).then(data => {
        this.tagList = [];
        let temp = data.data;
        if(temp.code === 200 && temp.status === 'success') {
          this.total = temp.data.total;
          temp.data.data.forEach( (item) => {
            item.ctime = yearFromate(item.ctime)
            this.tagList.push(item);
          })
        }
      })
    },

    handleCurrentChange(page) {
      this.page = page
      this.getTags(page, this.pageSize);
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.getTags(this.page, pageSize);
    }
  }
}
</script>
<style lang="less">
  .tags{
    .add{
      margin: 30px 20px;
    }
    .pagination {
      margin-top: 30px;
      width: 100%;
    }
  }
</style>

