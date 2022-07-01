<template>
  <el-container class="page-container dialog-body order-dialog-container" direction="vertical">

    <el-main class="page-main-container flex-column">

      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form v-loading="PageData.detailLoading" :model="ViewData.order" label-width="80px">
            <el-form-item label="订单号" prop="orderNo">
              <el-input disabled v-model="ViewData.order.orderNo" />
            </el-form-item>
            <el-form-item label="图片" prop="snapImg">
              <el-image
                style="width: 120px; height: 120px;"
                fit="cover"
                :src="ViewData.order.snapImg"
                :preview-src-list="[ViewData.order.snapImg]"
              />
            </el-form-item>
            <el-form-item label="标题" prop="snapTitle">
              <el-input disabled v-model="ViewData.order.snapTitle" />
            </el-form-item>
            <el-form-item label="总价格" prop="totalPrice">
              <el-input-number disabled v-model="ViewData.order.totalPrice" :precision="2" :step="0.1" />
            </el-form-item>
            <el-form-item label="交易价格" prop="finalTotalPrice">
              <el-input-number disabled v-model="ViewData.order.finalTotalPrice" :precision="2" :step="0.1" />
            </el-form-item>
            <el-form-item label="总数量" prop="totalCount">
              <el-input-number disabled v-model="ViewData.order.totalCount" step-strictly :step="1" />
            </el-form-item>
            <el-form-item label="当前状态" prop="statusStr">
              <el-tag :type="parseOrderStatusTag(ViewData.order.status)">{{ ViewData.order.statusStr }}</el-tag>
            </el-form-item>
            <el-form-item label="收货地址" prop="snapAddress">
              <span class="text-size-normal">{{ ViewData.order.snapAddress || '暂无数据' }}</span>
            </el-form-item>
            <el-form-item label="详情" prop="snapItems">
              <el-table :data="ViewData.order.snapItems" stripe :header-cell-style="themeTableHeader">
                <el-table-column prop="id" label="规格id" width="70px" fixed="left" />
                <el-table-column prop="img" label="图片" width="100px">
                  <template slot-scope="{row}">
                    <el-image
                      style="width: 80px; height: 80px;"
                      fit="cover"
                      :src="row.img"
                      :preview-src-list="[row.img]"
                    />
                  </template>
                </el-table-column>
                <el-table-column prop="title" label="标题" />
                <el-table-column prop="specStr" label="规格" />
                <el-table-column prop="price" label="单价" />
                <el-table-column prop="totalPrice" label="总价" />
                <el-table-column prop="count" label="数量" width="70px" />
              </el-table>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

    </el-main>

    <el-footer class="page-footer-container flex-center dialog-body-footer">
      <el-button
        type="primary"
        size="large"
        :loading="PageData.submitLoading"
        :disabled="PageData.submitDisabled"
        @click="onUpdateStatus"
      >{{ parseActionName }}
      </el-button>
    </el-footer>

  </el-container>
</template>

<script>
import BaseMixin                 from '@/mixins/base';
import DialogMixin               from '@/mixins/dialog';
import ThemeMixin                from '@/mixins/theme';
import OrderEditDialogController from './controller';
import OrderStatus               from '@/common/enum/order-status';

export default {
  name:   'edit-order-dialog',
  mixins: [ BaseMixin, DialogMixin, ThemeMixin ],
  data() {
    return {};
  },

  computed: {
    parseOrderStatusTag() { return this._parseOrderStatus; },

    parseActionName() {
      const status = this.ViewData.order.status;
      if (status) {
        switch (status) {
          case OrderStatus.PAID:
            return '发货';
          case OrderStatus.DELIVERED:
            return '完成';

          default:
            return '不可操作';
        }
      } else {
        return '不可操作';
      }
    },
  },

  created() { this.initData(); },

  mounted() { this.initViewData(); },

  methods: {
    initData() { this.controller = new OrderEditDialogController(this); },

    initViewData() { this.controller.onLoad(); },

    onUpdateStatus() {},


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

.order-dialog-container {
}

</style>
