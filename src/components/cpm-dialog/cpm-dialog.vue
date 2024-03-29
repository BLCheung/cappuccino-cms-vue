<template>
  <el-dialog
    class="__dialog-container"
    :class="[ type === DialogType.Large ? '__dialog-large-container' : '__dialog-normal-container' ]"
    :visible.sync="isVisible"
    :top="top"
    :title="title"
    :width="width"
    :center="center"
    :modal="modal"
    :fullscreen="type === DialogType.Fullscreen"
    :append-to-body="appendToBody"
    destroy-on-close
  >
    <template v-if="isVisible" #title>
      <el-row :style="[themeBackgroundStyle]" class="title-container" type="flex" align="middle" justify="center">
        <span class="title text-size-large color-white">{{ title }}</span>
      </el-row>
    </template>
    <!-- 内部的二次插槽要手动进行销毁，否则el-dialog生命周期走完了 内部插槽的组件生命周期依然存在 -->
    <template v-if="isVisible" #default>
      <slot />
    </template>
    <!--    <template v-if="isVisible" #footer>-->
    <!--      <slot name="footer" />-->
    <!--    </template>-->
  </el-dialog>
</template>

<script>
import { BaseData } from '@/common/data';
import DialogType   from '@/common/enum/dialog-type';
import ThemeMixin   from '@/mixins/theme';

export default {
  name:   'cpm-dialog',
  mixins: [ ThemeMixin ],
  props:  {
    visible:      { type: Boolean, default: BaseData.DialogData.visible },
    type:         { type: String, default: BaseData.DialogData.type },
    center:       { type: Boolean, default: BaseData.DialogData.center },
    top:          { type: String, default: BaseData.DialogData.top },
    title:        { type: String, default: BaseData.DialogData.title },
    width:        { type: String, default: BaseData.DialogData.width },
    modal:        { type: Boolean, default: BaseData.DialogData.modal },
    appendToBody: { type: Boolean, default: BaseData.DialogData.appendToBody },
    action:       { type: String, default: BaseData.DialogData.action },
    params:       { type: Object, default() { return BaseData.DialogData.params } },
  },
  data() {
    return {
      DialogType,
    }
  },
  // 提供给子组件数据（响应式的）
  provide() {
    return {
      dialogParams:  () => this.params,
      dialogVisible: (isVisible) => this.isVisible = isVisible,
    }
  },

  computed: {
    isVisible: {
      get() { return this.visible },
      set(newVal) {
        // 让外层父组件去改变prop值，不能在子组件内部改变prop值
        this.$emit('update:visible', newVal);
      },
    },
  },

  methods: {
    open() { this.$emit('update:visible', true); },
    close() { this.$emit('update:visible', false); },
  },
}
</script>

<style lang="scss" scoped>

.__dialog-container {

  .title-container {

    .title {
      max-width: 70%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
    }
  }
}

</style>
