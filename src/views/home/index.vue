<template>
  <el-container>
    <el-header>
      <h1>Home</h1>
    </el-header>
    <el-main>
      <el-table
        :data="tableData"
        :row-class-name="onRowClassName"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        >
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import HomeController from './controller';

export default {
  name:       'Home',
  data() {
    return {
      // 表单数据
      FormData:   {},
      // 表单规则
      FormRules:  {},
      // 页面数据
      PageData:   {},
      // 弹窗数据
      DialogData: {},
      // 路由数据
      RouteData:  {},
      tableData:  [
        {
          date:    '2016-05-02',
          name:    '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date:    '2016-05-04',
          name:    '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        }, {
          date:    '2016-05-01',
          name:    '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        }, {
          date:    '2016-05-03',
          name:    '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
    };
  },
  // 视图控制器
  controller: null,

  created() {
    this.initData();
  },

  mounted() {
    this.initViewData();
  },

  methods: {
    initData() {
      this.controller = new HomeController(this);
    },

    initViewData() {
    },

    onRowClassName() {},
  },
}
</script>

<style lang="scss" scoped>

</style>
