import UserEntity  from '@/beans/cms/user';
import CommonUtils from '@/utils/common';
import GroupEntity from '@/beans/cms/group';

export default class UserGroupEntity extends UserEntity {
  
  groups = [];
  
  constructor(item) {
    super(item);
    CommonUtils.forEach(item?.groups, group => {
      this.groups.push(new GroupEntity(group));
    });
  }
}
