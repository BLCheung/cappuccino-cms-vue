<template>
  <el-container class="page-container cms-admin-users-container">
    <el-header class="page-header-container  flex-row-align-center">
      <el-row class="view-width-full" type="flex" align="middle" justify="space-between">
        <span :style="[themeColorStyle]" class="page-header-title">用户列表</span>
        <el-select
          v-model="ViewData.selectGroup"
          placeholder="请选择分组"
          filterable
          clearable
          :loading="PageData.detailLoading"
          @change="onSelectGroup"
        >
          <el-option
            v-for="(item, index) of ViewData.groupOptions"
            :key="index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-row>
    </el-header>

    <el-main class="page-main-container user-table flex-column view-width-full">
      <el-table
        v-loading="TableData.loading"
        border
        :ref="ViewRef.table"
        :data="TableData.list"
        :header-cell-style="themeTableHeader"
        :row-class-name="onTableRowClassName"
      >
        <el-table-column prop="id" label="用户id" fixed="left" />
        <el-table-column label="头像">
          <template slot-scope="{row}">
            <el-avatar v-if="row.avatar" :src="row.avatar" shape="square" />
            <el-avatar v-else icon="el-icon-user-solid" shape="square" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="groupNames" label="所属分组" />
        <el-table-column label="操作" fixed="right">
          <template slot-scope="{row}">
            <el-button plain type="info" size="small" @click="onUserEdit(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="onUserDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer class="flex-row-align-center flex-justify-end view-width-full">
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
      <edit-user-dialog @action-update="onUpdate" @action-close="onClose" />
    </cpm-dialog>
  </el-container>
</template>

<script>

import PagingMixin                  from '@/mixins/paging';
import ThemeMixin                   from '@/mixins/theme';
import CMSAdminUserPagingController from '@/views/cms/admin/users/list/controller';
import CpmPagination                from '@/components/cpm-pagination/cpm-pagination';
import CpmDialog                    from '@/components/cpm-dialog/cpm-dialog';
import EditUserDialog               from '@/views/cms/admin/users/components/edit-user-dialog/index';

export default {
  components: { EditUserDialog, CpmDialog, CpmPagination },
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
    initData() { this.controller = new CMSAdminUserPagingController(this); },

    initViewData() { this.controller.onLoad(); },

    onSelectGroup() {},

    onUserEdit(user) {},

    onUserDelete(id) {},

    onUpdate() {},

    onClose() { this.controller.$closeDialog(); },
  },
}
</script>

<style lang="scss" scoped>

.cms-admin-users-container {

  .user-table {
  }
}

</style>
