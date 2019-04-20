<template>
  <div class="classify">
    <div class="add" >
      <el-button size="small" type="primary" @click="dialogFormVisible = true">新建分类</el-button>
    </div>
    <el-table
      :stripe="true"
      :data="tableData"
      style="width: 80%">
      <el-table-column
        label='序号'
        type="index"
        align="center"
        width="120px"
        :index="indexMethod">
      </el-table-column>
      <el-table-column
        label="分类名称"
        align="center"
        >
        <template slot-scope="scope">
          <span >{{ scope.row.name }}</span>
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
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
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
    <el-dialog title="新建分类" @close="handleClose" @closed="handleClosed" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="maxWidth:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: '分类一',
          number: 8,
          date: '2016-05-02',
        }, {
          name: '分类一',
          date: '2016-05-02',
        }, {
          name: '分类一',
          date: '2016-05-02',
        }, {
          name: '分类一',
          date: '2016-05-02',
        }
      ],
      form: {
        name: '',

      },
      formLabelWidth: '80px',
      dialogFormVisible: false
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
    handleCurrentChange(page){
      this.page = page
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
    },
    handleClosed(){
      console.log('关闭了')
    },
    handleClose(){
      console.log('触发，但是不让你关')
    }
  }
}
</script>
<style lang="less">
  .classify{
    .add{
      margin: 30px 20px;
    }
  }
</style>

