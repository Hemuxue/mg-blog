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
      :data="tableData"
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
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="文章分类"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-menu"></i>
          <span style="margin-left: 10px">{{ scope.row.classify }}</span>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      search:'',
      total:30,
      page:1,
      pageSize:10,
      tableData: [
        {
          name: '深入理解js',
          classify: '分类一',
          tags: '标签一',
          date: '2016-05-02',
        }, {
          name: '深入理解js',
          classify: '分类一',
          tags: '标签一',
          date: '2016-05-02',
        }, {
          name: '深入理解js',
          classify: '分类一',
          tags: '标签一',
          date: '2016-05-02',
        }, {
          name: '深入理解js',
          classify: '分类一',
          tags: '标签一',
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
    handleCurrentChange(page){
      this.page = page
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
    }
  }
}
</script>
<style lang="less">

</style>

