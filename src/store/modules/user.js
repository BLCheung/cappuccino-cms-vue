import { resetRouter } from '@/router'
import TokenKit        from '@/kit/token-kit';
import UserInfoEntity  from '@/beans/cms/user-info';

const state = {
  isUserLogin:  false,
  accessToken:  TokenKit.getToken(TokenKit.ACCESS_TOKEN),
  refreshToken: TokenKit.getToken(TokenKit.REFRESH_TOKEN),
  userInfo:     {},
}

const getters = {
  token:       (state) => { return { accessToken: state.accessToken, refreshToken: state.refreshToken } },
  userInfo:    (state) => state.userInfo,
  isUserLogin: (state) => state.isUserLogin,
}

const mutations = {
  
  saveToken(state, data) {
    const { accessToken, refreshToken } = data;
    TokenKit.setTokens(accessToken, refreshToken);
    state.accessToken  = accessToken;
    state.refreshToken = refreshToken;
  },
  
  setUserInfo(state, data) {
    state.userInfo = new UserInfoEntity(data);
  },
  
  removeUser(state) {
    state.userInfo     = {};
    state.accessToken  = '';
    state.refreshToken = '';
    TokenKit.removeTokens();
    state.isUserLogin = false;
  },
  
}

const actions = {
  
  async initUserAndPermission({ commit, state, dispatch }, data) {
    commit('setUserInfo', data);
    const payload = { modules: data.modules, level: data.userLevel };
    await dispatch('permission/setPermission', payload, { root: true });
    state.isUserLogin = true;
  },
  
  logout({ commit, dispatch }) {
    commit('removeUser');
    dispatch('permission/resetPermission', null, { root: true });
    dispatch('tagsView/delAllViews', null, { root: true });
    resetRouter();
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
