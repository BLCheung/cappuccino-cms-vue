<template>
  <el-container class="page-container">
    <el-header class="page-header-container flex-row-align-center">
      <el-row class="view-width-full" type="flex" align="middle" justify="space-between">
        <span :style="[themeColorStyle]" class="page-header-title">新建分组</span>
      </el-row>
    </el-header>

    <el-main class="page-main-container">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form
            class="top-gap"
            v-loading="PageData.submitLoading"
            label-width="80px"
            :ref="ViewRef.form"
            :model="FormData"
            :rules="FormRules"
          >
            <el-form-item label="分组名称" prop="name">
              <el-input v-model="FormData.name" clearable />
            </el-form-item>
            <el-form-item label="分组描述" prop="info">
              <el-input v-model="FormData.info" clearable />
            </el-form-item>
            <el-form-item v-if="ViewData.allModules.length" label="分组权限" prop="permissionIds">
              <cpm-permission-group :modules="ViewData.allModules" :permission-ids.sync="FormData.permissionIds" />
            </el-form-item>
          </el-form>

          <el-row class="page-footer-container bottom-gap flex-row-align-center flex-justify-center">
            <el-button style="margin-right: 30px" :disabled="PageData.submitDisabled" @click="onReset">重 置</el-button>
            <el-button
              type="primary"
              :loading="PageData.submitLoading"
              :disabled="PageData.submitDisabled"
              @click="onPost"
            >创 建
            </el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import BaseMixin                     from '@/mixins/base';
import ThemeMixin                    from '@/mixins/theme';
import CMSAdminCreateGroupController from '@/views/cms/admin/groups/add/controller';
import CpmPermissionGroup
                                     from '@/views/cms/admin/groups/components/cpm-permission-group/cpm-permission-group';

export default {
  components: { CpmPermissionGroup },
  mixins:     [ BaseMixin, ThemeMixin ],
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
    initData() { this.controller = new CMSAdminCreateGroupController(this); },

    initViewData() { this.controller.onLoad(); },

    onReset() {},

    onPost() {},
  },
}
</script>

<style lang="scss" scoped>

</style>
