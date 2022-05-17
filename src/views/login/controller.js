import BaseController from '@/controller/base';
import UserModel      from '@/models/cms/user';
import LoginDTO       from '@/dto/cms/login-dto';
import LoginRules     from './rules';
import { Message }    from 'element-ui';
import store          from '@/store';
import BaseRouter     from '@/router/api/base';

export default class LoginController extends BaseController {
  
  constructor(context) {
    super(context);
  }
  
  onVueContextMounted(VueContext = null) {
    // 如需对整个对象进行赋值，需要在bindData2Vue()之前先进行赋值，否则bindData2Vue()后再赋值的对象跟控制器内的对象不是同一个
    this.FormData  = new LoginDTO();
    this.FormRules = LoginRules;
    this.bindData2Vue()
        .bindMethod2Vue([ 'onLogin' ]);
  }
  
  onLogin() {
    this.$validateForm();
  }
  
  async onFormValidateListener(isValid, field) {
    if (!isValid) {
      Message.info('请把信息补充完整!');
      return;
    }
    await this.handleLogin();
  }
  
  async handleLogin() {
    this.$setSubmitLoading();
    const dto = this.FormData.toDTO();
    const loginRes = await UserModel.login(dto);
    if (!loginRes.isOK()) {
      this.$setSubmitLoading(false);
      return;
    }
    store.commit('user/saveToken', loginRes.data);
    
    const userRes = await UserModel.getUserInfoAndPermissions();
    await store.dispatch('user/initUserAndPermission', userRes.data);
    
    this.$setSubmitLoading(false);
    this.$setSubmitDisabled();
    
    BaseRouter.nav2Home(true);
  }
}
