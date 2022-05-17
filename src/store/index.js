import Vue             from 'vue';
import Vuex            from 'vuex';
import VuexPersistence from 'vuex-persist';
import getters         from './getters';
import app             from '@/store/modules/app';
import tagsView        from '@/store/modules/tagsView';
import errorLog        from '@/store/modules/errorLog';
import permission      from '@/store/modules/permission';
import settings        from '@/store/modules/settings';
import user            from '@/store/modules/user';
import theme           from '@/store/modules/theme';

Vue.use(Vuex);

const vueLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: [ 'settings', 'user', 'theme', 'permission' ],
});

const store = new Vuex.Store({
  modules: {
    app,
    tagsView,
    errorLog,
    permission,
    settings,
    user,
    theme,
  },
  getters,
  plugins: [ vueLocal.plugin ],
});

export default store;
