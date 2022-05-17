<template>
  <el-color-picker
    v-model="primaryColor"
    :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script>
import ThemeMixin from '@/mixins/theme';

export default {
  mixins: [ ThemeMixin ],
  data() {
    return {
      primaryColor: ''
    }
  },
  computed: {
    defaultTheme() {
      return this.theme.primary
    }
  },
  watch: {
    defaultTheme: {
      handler: function(val) {
        this.primaryColor = val
      },
      immediate: true
    },

    primaryColor(val) {
      this.$emit('change', val);
    }
  },
}
</script>

<style>
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
