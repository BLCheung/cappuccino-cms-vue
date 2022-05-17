import CommonUtils from '@/utils/common';

const DialogMixin = {
  props: {
    params: {
      type: Object,
      default() { return {}; },
    },
  },
  data() {
    return {}
  },
  
  methods: {
    getDialogParams() {
      let newParams = {};
      // 深拷贝，为了解除引用共享
      CommonUtils.deepClone(this.params, newParams);
      return newParams;
    },
  },
}

export default DialogMixin;
