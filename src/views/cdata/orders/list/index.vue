<template>
  <el-container class="page-container cdata-orders-container">
    <el-header class="page-header-container flex-row-align-center">
      <el-row class="view-width-full" type="flex" align="middle" justify="space-between">
        <span :style="[themeColorStyle]" class="page-header-title">C端订单列表</span>

        <div class="flex-row-align-center">
          <el-row type="flex" align="middle" :gutter="20">
            <el-col>
              <el-date-picker
                v-model="ViewData.dateRange"
                type="datetimerange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </el-col>
            <el-col>
              <el-input
                v-model="ViewData.oldKeyword"
                clearable prefix-icon="el-icon-search" placeholder="请输入订单id或订单号"
              />
            </el-col>
          </el-row>

          <el-button style="margin-left: 20px" type="primary" @click="onKeywordSearch">搜索</el-button>
        </div>
      </el-row>
    </el-header>

    <el-main class="page-main-container orders-table">
      <el-table
        v-loading="TableData.loading"
        :data="TableData.list"
        :header-cell-style="themeTableHeader"
        :row-class-name="onTableRowClassName"
      >
        <el-table-column prop="id" width="100px" label="订单id" fixed="left" />
        <el-table-column prop="orderNo" label="订单号" width="230px" />
        <el-table-column prop="snapTitle" label="订单标题" width="230px" />
        <el-table-column prop="totalCount" label="商品总数量" />
        <el-table-column prop="totalPrice" label="商品总价" />
        <el-table-column prop="statusStr" label="状态" width="150px">
          <template slot-scope="{row}">
            <el-tag :type="row.tagType">{{ row.statusStr }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180px" fixed="right">
          <template slot-scope="{row}">
            <el-button plain type="primary" size="small" @click="onOrderEdit(row)">编辑</el-button>
            <el-button disabled type="danger" size="small" @click="onOrderDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <cpm-dialog v-bind.sync="DialogData">
      <edit-order-dialog />
    </cpm-dialog>
  </el-container>
</template>

<script>
import PagingMixin                 from '@/mixins/paging';
import ThemeMixin                  from '@/mixins/theme';
import CDataOrdersPagingController from './controller';
import CpmDialog                   from '@/components/cpm-dialog/cpm-dialog';
import EditOrderDialog             from '@/views/cdata/orders/components/edit-order-dialog/index';

export default {
  components: { CpmDialog, EditOrderDialog },
  mixins:     [ PagingMixin, ThemeMixin ],
  data() {
    return {};
  },

  created() {
    this.initData();
  },

  mounted() {
    this.initViewData();
  },

  methods: {
    initData() { this.controller = new CDataOrdersPagingController(this); },

    initViewData() { this.controller.onLoad(); },

    onKeywordSearch() {},

    onOrderEdit(row) {},

    onOrderDelete(id) {},
  },
}
</script>

<style lang="scss" scoped>

.cdata-orders-container {
}

</style>
