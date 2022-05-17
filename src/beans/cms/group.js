import CommonUtils from '@/utils/common';
import UserLevel   from '@/common/enum/user-level';

/**
 * 分组实体数据
 */
export default class GroupEntity {
  
  id        = null;
  name      = '';
  info      = '';
  level     = '';
  levelName = '';
  
  constructor(item) {
    CommonUtils.copy(item, this);
    this.assembleLevelName();
  }
  
  assembleLevelName() {
    switch (this.level) {
      case UserLevel.Root:
        this.levelName = '超级管理员';
        break;
      case UserLevel.Admin:
        this.levelName = '管理员';
        break;
      case UserLevel.User:
        this.levelName = '普通用户';
        break;
      case UserLevel.Guest:
        this.levelName = '游客';
        break;
    }
  }
}
