import { routes }             from '@/router'
import PermissionModuleEntity from '@/beans/cms/permission-module';
import Config                 from '@/config/config';
import CommonUtils            from '@/utils/common';


/**
 * Filter asynchronous routing tables by recursion
 * @param userLevel
 * @return {any}
 */
const sideBarRoutes = (userLevel = Config.defaultUserLevel) => {
  const allRoutes = [];
  CommonUtils.deepClone(routes, allRoutes);
  
  function filterAsyncRoutes(currentRoutes, currentUserLevel) {
    return currentRoutes.filter(route => {
      if (Array.isArray(route.children) && route.children.length > 0) {
        route.children = filterAsyncRoutes(route.children, currentUserLevel)
      }
      if (!CommonUtils.isNull(route.meta?.level)) {
        return currentUserLevel <= route.meta.level;
      } else {
        return true;
      }
    });
  }
  
  function filterEmptyChildrenRoute(permissionRoutes) {
    return permissionRoutes.filter(route => {
      if (route.children && route.children.length > 0) {
        route.children = filterEmptyChildrenRoute(route.children);
        return route.children.length > 0;
      } else {
        return !(route.children && !route.children.length);
      }
    });
  }
  
  // 去除没有权限的路由
  const routeArr = filterAsyncRoutes(allRoutes, userLevel);
  // 去除不存在任何子路由的一级路由
  return filterEmptyChildrenRoute(routeArr);
}

const state = {
  modules:     [],
  permissions: [],
  userLevel:   Config.defaultUserLevel,
}

const getters = {
  modules:     state => state.modules,
  permissions: state => state.permissions,
  routes:      state => { return sideBarRoutes(state.userLevel) },
}

const mutations = {
  
  setModules(state, modules) {
    if (!!modules && modules.length !== 0) {
      state.modules     = modules.map(m => new PermissionModuleEntity(m));
      state.permissions = state.modules
                               .flatMap(module => module.permissions)
                               .map(permission => permission.name);
    }
  },
  
  setUserLevel(state, level) {
    state.userLevel = level;
  },
  
  clearPermissions(state) {
    state.userLevel   = Config.defaultUserLevel;
    state.modules     = [];
    state.permissions = [];
  },
}

const actions = {
  
  setPermission({ commit, dispatch }, payload) {
    const { modules, level } = payload;
    commit('setUserLevel', level);
    commit('setModules', modules);
  },
  
  resetPermission({ commit }) {
    commit('clearPermissions');
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
