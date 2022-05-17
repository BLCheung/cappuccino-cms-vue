<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper" :wrap-style="themeScrollbar">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="theme.primary"
        :text-color="theme.menuActiveText"
        :unique-opened="false"
        :active-text-color="theme.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo           from './Logo'
import SidebarItem    from './SidebarItem'
import ThemeMixin     from '@/mixins/theme';
import ThemeKit       from '@/kit/theme-kit';

export default {
  components: { SidebarItem, Logo },
  mixins:     [ ThemeMixin ],
  computed:   {
    ...mapGetters([
      'sidebar',
    ]),
    ...mapGetters('permission', [ 'routes' ]),
    activeMenu() {
      const route          = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    themeScrollbar() {
      const style           = {};
      style.backgroundImage =
        `linear-gradient(180deg, ${ this.theme.primary }, ${ ThemeKit.light(this.theme.primary, 10) })`;
      return style;
    },
  },
}
</script>
