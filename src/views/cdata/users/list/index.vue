<template>
  <el-container class="page-container cuser-users-container">
    <el-header class="page-header-container flex-row-align-center">
      <el-row class="view-width-full" type="flex" align="middle" justify="space-between">
        <span :style="[themeColorStyle]" class="page-header-title">C端用户列表</span>

        <div class="flex-row-align-center">
          <el-input
            v-model="ViewData.oldKeyword"
            clearable prefix-icon="el-icon-search" placeholder="请输入用户id或昵称"
          />
          <el-button style="margin-left: 20px" type="primary" @click="onKeywordSearch">搜索</el-button>
        </div>
      </el-row>
    </el-header>

    <el-main class="page-main-container users-table">
      <el-table
        v-loading="TableData.loading"
        border
        :data="TableData.list"
        :header-cell-style="themeTableHeader"
      >
        <el-table-column prop="id" width="100px" label="用户id" fixed="left" />
        <el-table-column prop="nickname" label="昵称" width="300px" />
        <el-table-column prop="mobile" label="手机号" width="300px" />
        <el-table-column prop="openid" label="用户openid" />
        <el-table-column label="操作" width="180px" fixed="right">
          <template slot-scope="{row}">
            <el-button plain type="primary" size="small" @click="onUserEdit(row)">编辑</el-button>
            <el-button disabled type="danger" size="small" @click="onUserDelete(row.id)">删除</el-button>
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
      <cuser-info-edit-dialog />
    </cpm-dialog>
  </el-container>
</template>

<script>
import PagingMixin                from '@/mixins/paging';
import ThemeMixin                 from '@/mixins/theme';
import CpmPagination              from '@/components/cpm-pagination/cpm-pagination';
import CpmDialog                  from '@/components/cpm-dialog/cpm-dialog';
import CuserInfoEditDialog        from '@/views/cdata/users/components/cuser-info-edit-dialog/index';
import CDataUsersPagingController from './controller';

export default {
  components: { CuserInfoEditDialog, CpmDialog, CpmPagination },
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
    initData() { this.controller = new CDataUsersPagingController(this); },

    initViewData() { this.controller.onLoad(); },

    onKeywordSearch() {},

    onUserEdit(user) {},

    onUserDelete(id) {},
  },
}
</script>

<style lang="scss" scoped>

.cuser-users-container {

  .users-table {
  }
}

</style>
