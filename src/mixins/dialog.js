const DialogMixin = {
  data() {
    return {}
  },
  inject: [ 'dialogParams', 'dialogVisible' ],
  
  methods: {
    getDialogParams() {
      // let newParams = {};
      // 深拷贝，为了解除引用共享
      // CommonUtils.deepClone(this.params, newParams);
      return this.dialogParams();
    },
  
    /**
     * 关闭当前弹窗组件（前提是当前组件为弹窗组件包裹的插槽内容）
     */
    closeCurrentDialog() { this._setDialogVisible(false); },
    
    _setDialogVisible(isVisible) { this.dialogVisible(isVisible); },
  },
}

export default DialogMixin;
