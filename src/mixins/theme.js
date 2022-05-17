import { mapActions, mapGetters } from 'vuex';
import ThemeKit                   from '@/kit/theme-kit';

const ThemeMixin = {
  
  computed: {
    ...mapGetters('theme', [ 'theme' ]),
    
    /**
     * 主题颜色style
     * @return {{}}
     */
    themeColorStyle() {
      const style = {};
      style.color = this.theme.primary;
      return style;
    },
    
    /**
     * 主题背景style
     * @return {{}}
     */
    themeBackgroundStyle() {
      const style           = {};
      style.backgroundColor = this.theme.primary;
      return style;
    },
    
    /**
     * 表格头主题样式
     */
    themeTableHeader() {
      const style           = {};
      style.backgroundColor = ThemeKit.light(this.theme.primary, 80);
      style.height          = '60px';
      return style;
    },
  },
  
  methods: {
    ...mapActions('theme', [ 'setThemeStyle' ]),
  },
}

export default ThemeMixin;
