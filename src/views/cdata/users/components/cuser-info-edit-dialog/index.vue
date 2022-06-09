<template>
  <el-container class="page-container dialog-body cuser-user-dialog-container" direction="vertical">

    <el-main class="page-main-container flex-column">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form v-loading="PageData.detailLoading" :model="ViewData.user">
            <el-form-item prop="nickname" label="昵称">
              <el-input disabled v-model="ViewData.user.nickname" />
            </el-form-item>
            <el-form-item prop="mobile" label="手机号">
              <el-input disabled v-model="ViewData.user.mobile" />
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
              <el-input disabled v-model="ViewData.user.email" />
            </el-form-item>
            <el-form-item prop="openid" label="openid">
              <el-input disabled v-model="ViewData.user.openid" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row class="page-main-title flex-row-align-center">
        <span :style="[themeColorStyle]" class="text-size-large">用户地址</span>
      </el-row>

      <el-table v-loading="PageData.detailLoading" :data="ViewData.user.addressList">
        <el-table-column prop="userId" label="用户id" width="100px" fixed="left" />
        <el-table-column prop="name" label="收货人" width="150px" />
        <el-table-column prop="mobile" label="手机号" width="150px" />
        <el-table-column prop="address" label="所在地区" />
        <el-table-column prop="addressDetail" label="详细地址" />
        <el-table-column prop="isDefault" label="默认地址" width="100px">
          <template slot-scope="{row}">
            <el-tag v-if="row.isDefault" type="success">是</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer class="page-footer-container flex-center dialog-body-footer">
      <el-button type="primary" size="large" @click="onClose">确定</el-button>
    </el-footer>
  </el-container>
</template>

<script>
import BaseMixin                         from '@/mixins/base';
import DialogMixin                       from '@/mixins/dialog';
import ThemeMixin                        from '@/mixins/theme';
import CDataUserInfoEditDialogController from './controller';

export default {
  name:   'cuser-info-edit-dialog',
  mixins: [ BaseMixin, DialogMixin, ThemeMixin ],
  data() { return {} },

  created() { this.initData(); },

  mounted() { this.initViewData(); },

  methods: {
    initData() { this.controller = new CDataUserInfoEditDialogController(this); },

    initViewData() { this.controller.onLoad(); },

    onClose() { this.controller.$closeCurrentDialog(); },
  },
}
</script>

<style lang="scss" scoped>

.cuser-user-dialog-container {
}

</style>
