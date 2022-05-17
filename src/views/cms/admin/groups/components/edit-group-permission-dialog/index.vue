<template>
  <el-container class="page-container dialog-body" direction="vertical">
    <el-header class="page-header-container flex-row-align-center">
      <span :style="[themeColorStyle]" class="page-header-title">{{
          ViewData.groupName
          ? ViewData.groupName + '的'
          : '分组'
        }}权限</span>
    </el-header>
  </el-container>
</template>

<script>
import BaseMixin                           from '@/mixins/base';
import DialogMixin                         from '@/mixins/dialog';
import ThemeMixin                          from '@/mixins/theme';
import EditGroupPermissionDialogController from './controller';

export default {
  name:   'edit-group-permission-dialog',
  mixins: [ BaseMixin, DialogMixin, ThemeMixin ],
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
    initData() { this.controller = new EditGroupPermissionDialogController(this); },

    initViewData() { this.controller.onLoad(); },
  },
}
</script>

<style lang="scss" scoped>

</style>
