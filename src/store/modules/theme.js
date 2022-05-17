import variables from '@/styles/variables.scss';
import ThemeKit  from '@/kit/theme-kit';

const state = {
  // 当前主题主色
  theme: {
    primary: '',
    ...variables,
  },
}

const getters = {
  theme: state => state.theme,
}

const mutations = {
  setThemeColor(state, colorsMap = {}) {
    Object.assign(state.theme, colorsMap);
  },
}

const actions = {
  
  setThemeStyle({ commit }, color = '') {
    // 生成颜色样式表
    const colorsMap = ThemeKit.generateColorsMap(color || variables.primary);
    ThemeKit.setThemeStyle(colorsMap);
    commit('setThemeColor', colorsMap);
  },
  
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
