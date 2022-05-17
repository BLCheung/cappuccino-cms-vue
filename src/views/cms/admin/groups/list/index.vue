<template>
  <el-container class="page-container cms-admin-groups-container">
    <el-header class="page-header-container flex-row-align-center">
      <el-row class="view-width-full" type="flex" align="middle" justify="space-between">
        <span :style="[themeColorStyle]" class="page-header-title">分组列表</span>
        <el-select
          v-model="ViewData.selectGroup"
          placeholder="请选择分组"
          :loading="PageData.detailLoading"
          :disabled="TableData.loading"
          filterable
          clearable
          @change="onSelectGroup"
        >
          <el-option v-for="(item, index) of ViewData.groupOptions" :key="index" :label="item.name" :value="item.id" />
        </el-select>
      </el-row>
    </el-header>

    <el-main class="page-main-container flex-column">
      <el-table
        class="top-gap"
        v-loading="TableData.loading"
        border
        :ref="ViewRef.table"
        :data="TableData.list"
        :header-cell-style="themeTableHeader"
        :row-class-name="onTableRowClassName"
      >
        <el-table-column prop="id" label="分组id" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="info" label="备注" />
        <el-table-column prop="levelName" label="分组级别">
          <template slot-scope="{row}">
            <el-tag :type="row.tagType">{{ row.levelName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="{row}">
            <el-button plain type="info" size="small" @click="onGroupEdit(row)">编辑</el-button>
            <el-button plain type="primary" size="small" @click="onGroupDispatch(row.id)">权限</el-button>
            <el-button type="danger" size="small" @click="onGroupDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer class="page-main-container"></el-footer>

    <cpm-dialog v-bind.sync="MultiDialogData.groupInfoDialog">
      <edit-group-dialog
        :params="MultiDialogData.groupInfoDialog.params"
        @action-update="onGroupInfoUpdate"
        @action-close="onClose"
      />
    </cpm-dialog>

    <cpm-dialog v-bind.sync="MultiDialogData.groupPermissionDialog">
      <edit-group-permission-dialog :params="MultiDialogData.groupPermissionDialog.params" />
    </cpm-dialog>
  </el-container>
</template>

<script>
import ThemeMixin                from '@/mixins/theme';
import CMSAdminGroupsController  from '@/views/cms/admin/groups/list/controller';
import PagingMixin               from '@/mixins/paging';
import CpmDialog                 from '@/components/cpm-dialog/cpm-dialog';
import EditGroupDialog           from '@/views/cms/admin/groups/components/edit-group-dialog/index';
import EditGroupPermissionDialog from '@/views/cms/admin/groups/components/edit-group-permission-dialog/index';

export default {
  components: { EditGroupPermissionDialog, EditGroupDialog, CpmDialog },
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
    initData() { this.controller = new CMSAdminGroupsController(this); },

    initViewData() { this.controller.onLoad(); },

    onSelectGroup() {},

    onGroupEdit() {},

    onGroupDispatch() {},

    onGroupDelete() {},

    onGroupInfoUpdate() {},

    onClose() { this.controller.$closeDialog(); },
  },
}
</script>

<style lang="scss" scoped>

.cms-admin-groups-container {
}

</style>
