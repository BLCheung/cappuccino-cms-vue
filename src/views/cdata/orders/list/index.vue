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
      >
        <el-table-column prop="id" label="订单id" width="70px" fixed="left" />
        <el-table-column prop="snapImg" label="图片" width="100px">
          <template slot-scope="{row}">
            <el-image
              style="width: 80px; height: 80px;"
              fit="cover"
              :src="row.img"
              :preview-src-list="[row.img]"
            />
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" label="订单号" width="230px" />
        <el-table-column prop="snapTitle" label="订单标题" />
        <el-table-column prop="totalCount" label="商品总数量" width="100px" />
        <el-table-column prop="totalPrice" label="商品总价" />
        <el-table-column prop="statusStr" label="状态" width="150px">
          <template slot-scope="{row}">
            <el-tag :type="parseOrderStatusTag(row.status)">{{ row.statusStr }}</el-tag>
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

    <el-footer class="page-footer-container flex-row-align-center flex-justify-end view-width-full">
      <el-row>
        <cpm-pagination
          :page="PagingQuery.page"
          :limit="PagingQuery.limit"
          :total="TableData.total"
          @pagination="onPaginationChange"
        />
      </el-row>
    </el-footer>

    <cpm-dialog v-bind.sync="DialogData">
      <edit-order-dialog @action-update="onOrderUpdate" />
    </cpm-dialog>
  </el-container>
</template>

<script>
import PagingMixin                 from '@/mixins/paging';
import ThemeMixin                  from '@/mixins/theme';
import CDataOrdersPagingController from './controller';
import CpmPagination               from '@/components/cpm-pagination/cpm-pagination';
import CpmDialog                   from '@/components/cpm-dialog/cpm-dialog';
import EditOrderDialog             from '@/views/cdata/orders/components/edit-order-dialog/index';
import OrderStatus                 from '@/common/enum/order-status';

export default {
  components: { CpmPagination, CpmDialog, EditOrderDialog },
  mixins:     [ PagingMixin, ThemeMixin ],
  data() {
    return {};
  },

  computed: {
    parseOrderStatusTag() { return this._parseOrderStatus; },
  },

  created() { this.initData(); },

  mounted() { this.initViewData(); },

  methods: {
    initData() { this.controller = new CDataOrdersPagingController(this); },

    initViewData() { this.controller.onLoad(); },

    onKeywordSearch() {},

    onOrderEdit(row) {},

    onOrderDelete(id) {},

    onOrderUpdate(data) {},

    _parseOrderStatus(status) {
      let type = '';
      switch (status) {
        case OrderStatus.EXPIRED:
          type = 'danger';
          break;
        case OrderStatus.UNPAID:
          type = 'warning';
          break;
        case OrderStatus.PAID:
          type = 'success';
          break;
        case OrderStatus.DELIVERED:
          type = '';
          break;
        case OrderStatus.FINISHED:
          type = 'info';
          break;
        case OrderStatus.CANCELED:
          type = 'info';
          break;

        default:
          type = 'danger';
          break;
      }
      return type;
    },
  },
}
</script>

<style lang="scss" scoped>

.cdata-orders-container {
}

</style>
