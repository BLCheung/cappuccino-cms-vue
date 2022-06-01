<template>
  <div class="permission-group flex-column view-width-full">
    <template v-if="allModules.length">
      <template v-for="(module, mIndex) of allModules">
        <div class="modules-container flex-column flex-align-start" :key="mIndex">
          <el-checkbox-group v-model="checkModuleNames">
            <el-checkbox
              class="module"
              :label="module.module"
              :indeterminate="isCurrentModuleHalfCheck(module.module)"
              @change="onModuleCheck($event, mIndex)"
            />
          </el-checkbox-group>

          <el-checkbox-group
            class="permission-container flex-row flex-wrap flex-justify-between view-width-full bottom-gap"
            v-model="checkPermissionIds"
          >
            <el-checkbox
              class="permission"
              v-for="(permission, pIndex) of module.permissions"
              :key="pIndex"
              :label="permission.id"
              :checked="isCurrentPermissionCheck(permission.id)"
              @change="onPermissionCheck($event, permission.id)"
            >
              {{ permission.name }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </template>
    </template>
    <template v-if="!allModules.length">
      <p class="color-fade text-size-normal">暂无可分配的权限</p>
    </template>
  </div>
</template>

<script>

import CommonUtils from '@/utils/common';

export default {
  name:  'cpm-permission-group',
  props: {
    modules:       {
      type: Array,
      default() { return []; },
    },
    permissionIds: {
      type: Array,
      default() { return []; },
    },
  },
  data() {
    return {
      allModules:           [],
      allPermissions:       [],
      checkModuleNames:     [],
      halfCheckModuleNames: [],
      checkPermissionIds:   [],
    };
  },

  computed: {
    isCurrentModuleHalfCheck() { return moduleName => this.halfCheckModuleNames.indexOf(moduleName) > -1; },

    isCurrentPermissionCheck() { return id => this.checkPermissionIds.indexOf(id) > -1 },
  },

  watch: {
    permissionIds(newVal) { this.updatePermissionCheck(newVal); },
  },

  mounted() {
    this.initModuleList();
    // 视图数据完全渲染完成后再进行初始化的更新
    this.$nextTick(() => {
      this.permissionIds.length && this.updatePermissionCheck(CommonUtils.uniqueValues(this.permissionIds));
    });
  },

  methods: {

    initModuleList() {
      this.allModules     = [ ...this.modules ];
      this.allPermissions = this.allModules.flatMap(m => m.permissions);
    },

    updatePermissionCheck(permissionIds = []) {
      this.updateCheckPermission(permissionIds);
      this.updateCheckModule(permissionIds);
    },

    updateCheckPermission(permissionIds = []) {
      this.checkPermissionIds = permissionIds;
    },

    updateCheckModule(permissionIds = []) {
      if (!permissionIds.length) {
        this.clearAllCheckModule();
        this.clearHalfCheckModule();
      } else {
        const moduleNames = this.allPermissions
                                .filter(p => permissionIds.indexOf(p.id) > -1)
                                .map(p => p.module);

        // 保证选中权限所属的模块选择器的唯一性
        const uniqueModuleNames = CommonUtils.uniqueValues(moduleNames);
        // 移除冗余的半选状态下的模块选择器，因为permissionIds内已经没有属于该模块下的权限id
        this.removeRedundantHalfCheckModule(uniqueModuleNames);
        // 更新模块选择器状态
        CommonUtils.forEach(uniqueModuleNames, moduleName => this.updateModuleCheck(moduleName));
      }
    },

    updateModuleCheck(moduleName = '') {
      const currentModule           = this.allModules.find(item => item.module === moduleName);
      const currentAllPermissionIds = currentModule.permissions.map(p => p.id);
      let checkCount                = 0;

      // 统计当前模块下有多少权限被选中的数量
      CommonUtils.forEach(currentAllPermissionIds, id => {
        if (this.checkPermissionIds.indexOf(id) > -1) checkCount++;
      });

      // 一个都未选中
      if (checkCount === 0) {
        this.removeAllCheckModule(moduleName);
        this.removeHalfCheckModule(moduleName);
      } else if (checkCount === currentAllPermissionIds.length) {
        // 全选中
        this.addAllCheckModules([ moduleName ]);
        this.removeHalfCheckModule(moduleName);
      } else {
        // 有选中但不全选中
        this.removeAllCheckModule(moduleName);
        this.addHalfCheckModule(moduleName);
      }
    },

    onModuleCheck(isChecked, moduleIndex) {
      const allPermissionIds = this.allModules[moduleIndex].permissions.map(p => p.id);
      let checkPermissionIds = [];
      if (isChecked) {
        checkPermissionIds = this.addCheckPermissions(allPermissionIds);
      } else {
        checkPermissionIds = this.removeCheckPermissions(allPermissionIds);
      }
      this.updatePermissionIds(checkPermissionIds);
    },

    onPermissionCheck(checked, currentPermissionId) {
      const checkPermissionIds = checked ? this.addCheckPermissions([ currentPermissionId ])
                                         : this.removeCheckPermissions([ currentPermissionId ]);
      this.updatePermissionIds(checkPermissionIds);
    },

    addAllCheckModules(moduleNames = []) {
      this.checkModuleNames = CommonUtils.uniqueValues(this.checkModuleNames.concat(moduleNames));
    },

    removeAllCheckModule(moduleName = '') {
      if (moduleName === '') return;
      const deleteIndex = this.checkModuleNames.indexOf(moduleName);
      if (deleteIndex === -1) return;
      this.checkModuleNames.splice(deleteIndex, 1);
    },

    clearAllCheckModule() { this.checkModuleNames = []; },

    addHalfCheckModule(moduleName = '') {
      this.halfCheckModuleNames = CommonUtils.uniqueValues(this.halfCheckModuleNames.concat([ moduleName ]));
    },

    removeHalfCheckModule(moduleName = '') {
      const deleteIndex = this.halfCheckModuleNames.indexOf(moduleName);
      if (deleteIndex === -1) return;
      this.halfCheckModuleNames.splice(deleteIndex, 1);
    },

    removeRedundantHalfCheckModule(uniqueModuleNames = []) {
      this.halfCheckModuleNames = this.halfCheckModuleNames.filter(m => uniqueModuleNames.indexOf(m) > -1);
    },

    clearHalfCheckModule() { this.halfCheckModuleNames = []; },

    addCheckPermissions(permissionIds = []) {
      return CommonUtils.uniqueValues(this.checkPermissionIds.concat(permissionIds));
    },

    removeCheckPermissions(permissionIds = []) {
      return this.checkPermissionIds.filter(id => permissionIds.indexOf(id) === -1);
    },

    updatePermissionIds(permissionIds = []) { this.$emit('update:permissionIds', permissionIds); },
  },
}
</script>

<style lang="scss" scoped>

.permission-group {
  position: relative;
  margin-top: 5px;
  margin-left: 5px;

  .modules-container {

    .module {
      height: 20px;
      font-size: 13px;
      line-height: 20px;
      margin-bottom: 10px;
    }

    .permission-container {
      padding: 20px 20px 0;
      background-color: #f5f5f6;

      .permission {
        width: 150px;
        height: 20px;
        line-height: 20px;
        margin-right: 10px;
        margin-bottom: 20px;
        font-weight: normal;
      }
    }
  }
}

</style>
