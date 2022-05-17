<template>
  <el-container class="page-container">
    <el-header class="page-header-container flex-row-align-center">
      <el-row class="view-width-full" type="flex" align="middle" justify="space-between">
        <span :style="[themeColorStyle]" class="page-header-title">新建用户</span>
      </el-row>
    </el-header>
    <el-main class="page-main-container">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form
            class="top-gap"
            v-loading="PageData.submitLoading"
            :ref="ViewRef.form"
            :model="FormData"
            :rules="FormRules"
          >
            <el-form-item label="用户名（用作登录账号）" prop="username">
              <el-input v-model="FormData.username" clearable />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="FormData.email" clearable />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="FormData.password" clearable />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input v-model="FormData.confirmPassword" clearable />
            </el-form-item>
            <el-form-item v-if="ViewData.allGroups.length" label="分配分组" prop="groupIds">
              <el-checkbox-group
                v-model="FormData.groupIds"
                size="small" style="transform: translateY(5px)"
              >
                <el-checkbox v-for="(group, index) of ViewData.allGroups" :key="index" :label="group.id" border>
                  {{ group.name }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <el-footer class="page-footer-container flex-row-align-center">
      <el-button :disabled="PageData.submitDisabled" @click="onRegisterReset">重 置</el-button>
      <el-button
        type="primary"
        :loading="PageData.submitLoading"
        :disabled="PageData.submitDisabled"
        @click="onRegisterPost"
      >注 册
      </el-button>
    </el-footer>
  </el-container>
</template>

<script>
import BaseMixin                      from '@/mixins/base';
import ThemeMixin                     from '@/mixins/theme';
import CMSAdminRegisterUserController from '@/views/cms/admin/users/register/controller';

export default {
  mixins: [ BaseMixin, ThemeMixin ],
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
    initData() { this.controller = new CMSAdminRegisterUserController(this); },

    initViewData() { this.controller.onLoad(); },

    onRegisterReset() {},

    onRegisterPost() {},
  },
}
</script>

<style lang="scss" scoped>

</style>
