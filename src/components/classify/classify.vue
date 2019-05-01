<template>
  <div class="classify">
    <div class="add" >
      <el-button size="small" type="primary" @click="dialogFormVisible = true">新建分类</el-button>
    </div>
    <el-table
      :stripe="true"
      :data="typeList"
      style="width: 80%">
      <el-table-column
        label='序号'
        type="index"
        align="center"
        width="120px"
        :index="indexMethod(1)">
      </el-table-column>
      <el-table-column
        label="分类名称"
        align="center"
        >
        <template slot-scope="scope">
          <span >{{ scope.row.type }}</span>
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
    <el-dialog title="新建分类" @close="handleClose"  :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.type" autocomplete="off" style="maxWidth:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreateClick">确 定</el-button>
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
      typeList: [],
      form: {
        name: '',

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
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      Axios.post('/api/deleteType', {
        id: row.id
      }).then(data => {
        if(data.data.code === 200 && data.data.status === 'success') {
          this.typeList.splice(index,1);
          this.$message.success('删除成功');
        }
      })
    },
    indexMethod(index) {
      return index;
    },
    handleCurrentChange(page) {
      this.page = page
      this.getTags(page, this.pageSize);
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.getTags(this.page, pageSize);
    },
    handleClose(){
      this.form.type = ''
    },
    handleCreateClick() {
      Axios.post('/api/createType', {
        type: this.form.type
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
      Axios.post('/api/getType', {
        page: page,
        pageSize: pageSize
      }).then(data => {
        this.typeList = [];
        let temp = data.data;
        if(temp.code === 200 && temp.status === 'success') {
          this.total = temp.data.total;
          temp.data.data.forEach( (item) => {
            item.ctime = yearFromate(item.ctime)
            this.typeList.push(item);
          })
        }
      })
    },
  }
}
</script>
<style lang="less">
  .classify{
    .add{
      margin: 30px 20px;
    }

    .pagination {
      margin-top: 30px;
      width: 100%;
    }
  }
</style>

