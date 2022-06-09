import BaseController  from '@/controller/base';
import CUserInfoEntity from '@/beans/cuser-info';
import CUserModel      from '@/models/cuser';

export default class CDataUserInfoEditDialogController extends BaseController {
  
  constructor(context) {
    super(context);
    console.log('params:', this.$getDialogParams());
    this.userId   = this.$getDialogParams().id;
    this.ViewData = { user: {} };
    
    this.bindData2Vue()
        .bindMethod2Vue([]);
  }
  
  async onLoad() {
    await this.getUserData();
  }
  
  async getUserData() {
    this.$setDetailLoading(true);
    const res = await CUserModel.getCUser(this.userId);
    if (!res.isOK()) {
      this.$setDetailLoading(false);
      return;
    }
    this.updateUserData(res.data);
    this.$setDetailLoading(false);
  }
  
  updateUserData(user = {}) { this.ViewData.user = new CUserInfoEntity(user); }
}
