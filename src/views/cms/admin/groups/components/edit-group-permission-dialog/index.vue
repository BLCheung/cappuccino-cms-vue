<template>
  <el-container class="page-container dialog-body" direction="vertical">

    <el-main class="page-main-container flex-column">
      <el-row>
        <el-col :span="18">
          <cpm-permission-group
            v-if="ViewData.allModules.length"
            :modules="ViewData.allModules"
            :permission-ids.sync="FormData.permissionIds"
          />
        </el-col>
      </el-row>
    </el-main>

    <el-footer class="page-footer-container dialog-body-footer flex-center view-width-full">
      <el-button style="margin-right: 30px" :disabled="PageData.submitDisabled" @click="onReset">重 置</el-button>
      <el-button
        type="primary"
        :loading="PageData.submitLoading"
        :disabled="PageData.submitDisabled"
        @click="onPost"
      >分 配
      </el-button>
    </el-footer>
  </el-container>
</template>

<script>
import BaseMixin                           from '@/mixins/base';
import DialogMixin                         from '@/mixins/dialog';
import ThemeMixin                          from '@/mixins/theme';
import EditGroupPermissionDialogController from './controller';
import CpmPermissionGroup
                                           from '@/views/cms/admin/groups/components/cpm-permission-group/cpm-permission-group';

export default {
  name:       'edit-group-permission-dialog',
  components: { CpmPermissionGroup },
  mixins:     [ BaseMixin, DialogMixin, ThemeMixin ],
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

    onPost() {},

    onReset() {},
  },
}
</script>

<style lang="scss" scoped>

.page-container {
  position: relative;
  overflow: hidden;

}


</style>
