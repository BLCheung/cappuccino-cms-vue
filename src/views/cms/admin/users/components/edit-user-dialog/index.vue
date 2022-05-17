<template>
  <el-container class="page-container dialog-body edit-user">
    <el-main class="page-main-container">
      <el-tabs v-model="currentTabs">
        <el-tab-pane label="分配分组" name="1">
          <el-main class="page-main-container">
            <el-row>
              <el-col :lg="16" :md="20" :sm="24" :xs="24">
                <el-form :model="ViewData.user" label-position="right" label-width="80px">
                  <el-form-item label="用户名">
                    <el-input disabled v-model="ViewData.user.username" />
                  </el-form-item>
                  <el-form-item label="昵称">
                    <el-input disabled v-model="ViewData.user.nickname" />
                  </el-form-item>
                  <el-form-item label="邮箱">
                    <el-input disabled v-model="ViewData.user.email" />
                  </el-form-item>
                  <el-form-item label="分组">
                    <el-checkbox-group
                      v-model="ViewData.checkGroupIds"
                      size="small"
                      style="transform: translateY(5px)"
                    >
                      <el-checkbox class="group-checkbox" v-for="(group, index) of ViewData.allGroups" :key="index" :label="group.id" border>
                        {{ group.name }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-main>
          <el-footer class="dialog-body-footer">
            <el-button style="margin-right: 30px" @click="onGroupReset">重 置</el-button>
            <el-button
              type="primary"
              :loading="PageData.submitLoading"
              :disabled="PageData.submitDisabled"
              @click="onGroupPost"
            >提 交
            </el-button>
          </el-footer>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="2">
          <el-main class="page-main-container">
            <el-row>
              <el-col :lg="16" :md="20" :sm="24" :xs="24">
                <el-form
                  :ref="ViewRef.passwordForm"
                  :model="FormData"
                  :rules="FormRules"
                  label-position="right"
                  label-width="80px"
                >
                  <el-col :xs="24" :md="16">
                    <el-form-item label="密码" prop="password">
                      <el-input v-model="FormData.password" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :md="16">
                    <el-form-item label="确认密码" prop="confirmPassword">
                      <el-input v-model="FormData.confirmPassword" clearable />
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-col>
            </el-row>
          </el-main>
          <el-footer class="dialog-body-footer">
            <el-button style="margin-right: 30px" @click="onPasswordReset">重 置</el-button>
            <el-button
              type="primary"
              :loading="PageData.submitLoading"
              :disabled="PageData.submitDisabled"
              @click="onPasswordPost"
            >提 交
            </el-button>
          </el-footer>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import BaseMixin                        from '@/mixins/base';
import DialogMixin                      from '@/mixins/dialog';
import CMSAdminEditUserDialogController from './controller';

export default {
  name:   'edit-user-dialog',
  mixins: [ BaseMixin, DialogMixin ],
  data() {
    return {
      currentTabs: '1',
    };
  },

  created() {
    this.initData();
  },

  mounted() {
    this.initViewData();
  },

  methods: {
    initData() { this.controller = new CMSAdminEditUserDialogController(this); },

    initViewData() { this.controller.onLoad(); },

    onGroupReset() {},

    onGroupPost() {},

    onPasswordReset() {},

    onPasswordPost() {},
  },
}
</script>

<style lang="scss" scoped>

.edit-user {

  .group-checkbox {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}

</style>
