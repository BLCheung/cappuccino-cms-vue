import BaseController    from '@/controller/base';
import store             from '@/store';
import CommonUtils       from '@/utils/common';
import UserModel         from '@/models/cms/user';
import UpdateUserInfoDTO from '@/dto/cms/update-user-info-dto';
import UserInfoRules     from './rules';

export default class UserInfoEditDialogController extends BaseController {
  
  _userInfo = {};
  
  constructor(context) {
    super(context);
  }
  
  onVueContextMounted(VueContext = null) {
    this.FormRules = UserInfoRules;
    this.bindData2Vue()
        .bindMethod2Vue([ 'onPost', 'onReset' ]);
  }
  
  getUserInfo() {
    const userInfo = store.getters['user/userInfo'];
    // 备份一份
    CommonUtils.deepClone(userInfo, this._userInfo);
    this.FormData = new UpdateUserInfoDTO(userInfo);
    this.$updateFormData();
  }
  
  onReset() {
    this.FormData = new UpdateUserInfoDTO(this._userInfo);
    this.$updateFormData();
  }
  
  onPost() { this.$validateForm(this.ViewRef.form, true); }
  
  onFormValidateListener(isValid, field) {
    if (!isValid) return;
    this.getVueContext().$confirm('确定提交？')
        .then(async _ => {
          await this.onPostUserInfo();
        })
        .catch(_ => {
        });
  }
  
  async onPostUserInfo() {
    this.$setDetailLoading(true);
    const userInfoDTO = this.FormData.toDTO();
    const res         = await UserModel.update(userInfoDTO);
    if (!res.isOK()) {
      this.$setDetailLoading(false);
      return;
    }
    this.$setDetailLoading(false);
    this.onDispatchCloseAction();
    this.onDispatchUpdateAction(userInfoDTO);
  }
}
