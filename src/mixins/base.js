import { BaseData } from '@/common/data';
import BaseActions  from '@/common/constant/actions';

const BaseMixin = {
  data() {
    return {
      ViewData:        Object.assign({}, BaseData.ViewData),
      ViewRef:         Object.assign({}, BaseData.ViewRef),
      PageData:        Object.assign({}, BaseData.PageData),
      DialogData:      Object.assign({}, BaseData.DialogData),
      MultiDialogData: {},
      RouteData:       Object.assign({}, BaseData.RouteData),
      FormData:        Object.assign({}, BaseData.FormData),
      FormRules:       Object.assign({}, BaseData.FormRules),
    }
  },
  // 视图控制器
  controller: null,
  
  created() { this.initBaseData(); },
  
  mounted() { this.initBaseViewData(); },
  
  methods: {
    initBaseData() {},
    
    initBaseViewData() {},
    
    $warningAsync(message = '', title = '', callback) {
      return this.$confirmAsync(message, title, callback, 'warning');
    },
    
    $confirmAsync(message = '', title = '', callback, type = '') {
      return this.$msgbox({
        title,
        message,
        type,
        showCancelButton: true,
        beforeClose:      async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText    = '执行中...';
            callback && typeof callback === 'function' && await callback();
            done();
            instance.confirmButtonLoading = false;
          } else {
            done();
          }
        },
      })
                 .catch(reason => {});
    },
    
    _$emitAction(action = BaseActions.ACTION, data = {}) { this.$emit(action, data); },
  },
}

export default BaseMixin;
