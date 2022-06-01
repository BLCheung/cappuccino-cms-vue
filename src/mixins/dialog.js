const DialogMixin = {
  data() {
    return {}
  },
  inject: [ 'dialogParams', 'setVisible' ],
  
  methods: {
    getDialogParams() {
      // let newParams = {};
      // 深拷贝，为了解除引用共享
      // CommonUtils.deepClone(this.params, newParams);
      return this.dialogParams();
    },
    
    setDialogVisible(isVisible) {
      this.setVisible(isVisible);
    },
  },
}

export default DialogMixin;
