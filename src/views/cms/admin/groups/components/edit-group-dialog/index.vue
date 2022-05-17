<template>
  <el-container class="page-container dialog-body">
    <el-main class="page-main-container">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form
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
          </el-form>
        </el-col>
      </el-row>
    </el-main>

    <el-footer class="page-footer-container flex-center">
      <el-button style="margin-right: 30px" :disabled="PageData.submitDisabled" @click="onReset">重 置</el-button>
      <el-button
        type="primary"
        :loading="PageData.submitLoading"
        :disabled="PageData.submitDisabled"
        @click="onPost"
      >提 交
      </el-button>
    </el-footer>
  </el-container>
</template>

<script>
import BaseMixin                         from '@/mixins/base';
import DialogMixin                       from '@/mixins/dialog';
import CMSAdminEditGroupDialogController from './controller';

export default {
  name:   'edit-group-dialog',
  mixins: [ BaseMixin, DialogMixin ],
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
    initData() { this.controller = new CMSAdminEditGroupDialogController(this); },

    initViewData() { this.controller.getGroupInfo(); },

    onReset() {},

    onPost() {},
  },
}
</script>

<style lang="scss" scoped>

</style>
