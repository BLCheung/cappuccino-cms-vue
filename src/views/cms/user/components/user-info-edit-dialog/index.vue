<template>
  <el-container v-loading="PageData.detailLoading" class="page-container dialog-body flex-column view-full">
    <el-main class="user-info-edit-container">
      <el-form class="form" :ref="ViewRef.form" :model="FormData" :rules="FormRules" label-width="80px">
        <el-col :xs="24" :md="16">
          <el-form-item label="用户名" prop="username" required>
            <el-input v-model="FormData.username" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="16">
          <el-form-item label="昵称" prop="nickname" required>
            <el-input v-model="FormData.nickname" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :md="16">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="FormData.email" />
          </el-form-item>
        </el-col>
      </el-form>
    </el-main>

    <el-footer class="dialog-body-footer">
      <el-button style="margin-right: 30px" @click="onReset">重 置</el-button>
      <el-button type="primary" @click="onPost">提 交</el-button>
    </el-footer>
  </el-container>
</template>

<script>
import UserInfoEditDialogController from './controller';
import BaseMixin                    from '@/mixins/base';
import DialogMixin                  from '@/mixins/dialog';

export default {
  name:   'user-info-edit-dialog',
  mixins: [ BaseMixin, DialogMixin ],
  data() {
    return {}
  },

  created() { this.initData(); },

  mounted() { this.initViewData(); },

  methods: {

    initData() {
      this.controller = new UserInfoEditDialogController(this);
    },

    initViewData() {
      this.controller.getUserInfo();
    },

    onReset() {},

    onPost() {},
  },
}
</script>

<style lang="scss" scoped>

.user-info-edit-container {

}

</style>
