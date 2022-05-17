<template>
  <el-container class="page-container cms-user-container">
    <el-header class="page-header-container flex-row-align-center">
      <el-row class="view-width-full" type="flex" align="middle" justify="space-between">
        <span :style="[themeColorStyle]" class="page-header-title">个人中心</span>
        <div
          class="flex-row-align-center"
          :class="ViewData.canGetUserInfo ? 'action-cursor' : 'action-not-allow'"
          @click="onGetUserInfoAndPermissions"
        >
          <i class="el-icon-refresh" />
          <span :style="themeColorStyle" class="text-size-normal">更新用户信息</span>
        </div>
      </el-row>
    </el-header>
    <el-main v-loading="PageData.detailLoading" class="page-main-container flex-column view-width-full">
      <el-row type="flex" class="page-main-title" align="middle" justify="space-between">
        <el-col :span="20">
          <span class="color-fade">个人信息</span>
        </el-col>
        <div class="flex-row-align-center flex-justify-end action-cursor" @click="onEditUserInfo">
          <span :style="[themeColorStyle]">编辑个人信息</span>
          <i :style="[themeColorStyle]" class="el-icon-d-arrow-right" />
        </div>
      </el-row>

      <el-form :ref="ViewRef.form" :model="ViewData.userInfo" label-width="80px">
        <el-col :xs="24" :md="16">
          <el-form-item label="用户名">
            <el-input disabled v-model="ViewData.userInfo.username" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="16">
          <el-form-item label="昵称">
            <el-input disabled v-model="ViewData.userInfo.nickname" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="16">
          <el-form-item label="邮箱">
            <el-input disabled v-model="ViewData.userInfo.email" />
          </el-form-item>
        </el-col>
      </el-form>
    </el-main>

    <el-main v-loading="PageData.submitLoading" class="page-main-container flex-column view-width-full">
      <el-row type="flex" class="page-main-title" align="middle" justify="space-between">
        <el-col :span="20">
          <span class="color-fade">修改密码</span>
        </el-col>
      </el-row>

      <el-form :ref="ViewRef.form" :model="FormData" :rules="FormRules" label-width="80px">
        <el-col :xs="24" :md="16">
          <el-form-item label="原始密码" prop="password">
            <el-input v-model="FormData.password" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="16">
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="FormData.newPassword" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="16">
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="FormData.confirmPassword" />
          </el-form-item>
        </el-col>
      </el-form>

      <el-row class="cms-user-password-confirm flex-row-align-center">
        <el-button class="reset" @click="onPasswordReset">重 置</el-button>
        <el-button type="primary" @click="onPasswordPost">保 存</el-button>
      </el-row>
    </el-main>

    <cpm-dialog v-bind.sync="DialogData">
      <user-info-edit-dialog @action-update="onUserInfoUpdate" @action-close="onClosed" />
    </cpm-dialog>
  </el-container>
</template>

<script>
import BaseMixin          from '@/mixins/base';
import ThemeMixin         from '@/mixins/theme';
import UserController     from '@/views/cms/user/controller';
import CpmDialog          from '@/components/cpm-dialog/cpm-dialog';
import UserInfoEditDialog from '@/views/cms/user/components/user-info-edit-dialog/index';

export default {
  name:       'CMSUser',
  components: { UserInfoEditDialog, CpmDialog },
  mixins:     [ BaseMixin, ThemeMixin ],
  data() {
    return {}
  },

  created() {
    this.initData();
  },

  mounted() {
    this.initViewData();
  },

  methods: {
    initData() {
      this.controller = new UserController(this);
    },

    initViewData() {
      this.controller.getUserInfo();
    },

    onGetUserInfoAndPermissions() {},

    onEditUserInfo() {},

    onUserInfoUpdate() {},

    onClosed() { this.controller.$closeDialog(); },

    onPasswordReset() {},

    onPasswordPost() {},
  },

}
</script>

<style lang="scss" scoped>

.cms-user-container {

  .cms-user-password-confirm {
    height: 60px;

    .reset {
      margin-right: 20px;
    }
  }
}

</style>
