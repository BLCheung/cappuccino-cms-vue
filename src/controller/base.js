import { BaseData } from '@/common/data';
import BaseActions  from '@/common/constant/actions';
import { Message }  from 'element-ui';
import CommonUtils  from '@/utils/common';

export default class BaseController {
  /** Vue视图层上下文 **/
  VueContext = null;
  
  /** 视图数据 **/
  ViewData = {};
  
  /** 基础视图Ref **/
  ViewRef = Object.assign({}, BaseData.ViewRef);
  
  /** 页面数据 **/
  PageData = Object.assign({}, BaseData.PageData);
  
  /** 弹窗数据 **/
  DialogData = Object.assign({}, BaseData.DialogData);
  
  /** 多重弹窗数据 **/
  MultiDialogData = {};
  
  /** 路由数据 **/
  RouteData = {};
  
  /** 表单数据 **/
  FormData = {};
  
  /** 表单校验规则 **/
  FormRules = {};
  
  // 当前vue上下文所对应的页面路由
  $route = null;
  
  constructor(vueContext) {
    this.VueContext = vueContext;
    this._initVueData(this.VueContext);
    this.onVueContextMounted(this.VueContext);
  }
  
  getVueContext() {
    return this.VueContext || null;
  }
  
  bindData2Vue() {
    this.VueContext.ViewData        = this.ViewData;
    this.VueContext.ViewRef         = Object.assign(this.ViewRef, BaseData.ViewRef);
    this.VueContext.PageData        = Object.assign(this.PageData, BaseData.PageData);
    this.VueContext.DialogData      = this.$initMultiDialog(this.DialogData);
    this.VueContext.MultiDialogData = this.MultiDialogData;
    this.VueContext.FormData        = this.FormData;
    this.VueContext.FormRules       = this.FormRules;
    this.VueContext.RouteData       = this.RouteData;
    return this;
  }
  
  bindMethod2Vue(methods = []) {
    for (const method of methods) {
      if (this.VueContext[method] && this[method]) {
        this.VueContext[method] = this[method].bind(this);
      }
    }
    return this;
  }
  
  onVueContextMounted(VueContext = null) {}
  
  /**
   * 表单校验监听器
   * @param isValid
   * @param field
   */
  onFormValidateListener(isValid, field) {}
  
  /**
   * 分发自定义事件
   * @param action 事件名
   * @param data  数据
   */
  onDispatchAction(action = BaseActions.ACTION, data = {}) {
    if (!!this.VueContext._$emitAction && typeof this.VueContext._$emitAction === 'function') {
      this.VueContext._$emitAction(action, data);
      return;
    }
    // 如果没有该函数，则自己分发
    this.VueContext.$emit(action, data);
  }
  
  /**
   * 分发添加事件
   * 通过@action-add监听
   * @param data
   */
  onDispatchAddAction(data = {}) { this.onDispatchAction(BaseActions.ACTION_ADD, data); }
  
  /**
   * 分发更新事件
   * 通过@action-update监听
   * @param data
   */
  onDispatchUpdateAction(data = {}) { this.onDispatchAction(BaseActions.ACTION_UPDATE, data); }
  
  /**
   * 分发删除事件
   * 通过@action-delete监听
   * @param data
   */
  onDispatchDeleteAction(data = {}) { this.onDispatchAction(BaseActions.ACTION_DELETE, data); }
  
  /**
   * 分发关闭事件
   * 通过@action-close监听
   * @param data
   */
  onDispatchCloseAction(data = {}) { this.onDispatchAction(BaseActions.ACTION_CLOSE, data); }
  
  /**
   * 创建弹窗
   * @param dialogData
   */
  onCreateDialog(dialogData = {}) {
    Object.assign(this.DialogData, dialogData);
    this.$updateDialogData();
  }
  
  /**
   * 用于初始化一个dialogData
   * @param dialogData
   * @return {{visible: boolean, top: string, appendToBody: boolean, center: boolean, width: string, action: string, title: string, type: string, params: {}, modal: boolean}}
   */
  $initMultiDialog(dialogData = {}) { return this._appendDialogData(dialogData); }
  
  /** 辅助方法 **/
  
  /**
   * 更新视图数据
   */
  $updateViewData() { this.VueContext.ViewData = this.ViewData; }
  
  /**
   * 更新表单数据
   */
  $updateFormData() { this.VueContext.FormData = this.FormData; }
  
  /**
   * 更新表单数据
   */
  $updateFormRules() { this.VueContext.FormRules = this.FormRules; }
  
  /**
   * 更新对话框数据
   */
  $updateDialogData() { this.VueContext.DialogData = this.DialogData; }
  
  /**
   * 更新多重对话框数据
   */
  $updateMultiDialogData() { this.VueContext.MultiDialogData = this.MultiDialogData; }
  
  /**
   * 获取视图层的弹窗params props
   * @return {null|*}
   */
  $getDialogParams() {
    if (!!this.VueContext.getDialogParams
      && typeof this.VueContext.getDialogParams === 'function') {
      return this.VueContext.getDialogParams();
    }
    return null;
  }
  
  /**
   * 设置弹窗追加数据
   * @param params
   * @param whichDialogData 哪一个弹窗数据
   */
  $setDialogParams(params = {}, whichDialogData = null) {
    if (CommonUtils.isNull(whichDialogData)) {
      this.DialogData.params = params;
      return;
    }
    whichDialogData.params = params;
  }
  
  /**
   * 进行表单校验
   * @param formRef 表单的ref名称，如不指定则默认为form
   * @param showError 是否展示表单项错误
   */
  $validateForm(formRef = this.ViewRef.form, showError = false) {
    if (!this.VueContext.$refs[formRef]) return;
    this.VueContext.$refs[formRef].validate((isValid, field) => {
      if (showError && !isValid) Message.warning(Object.values(field)[0][0].message);
      this.onFormValidateListener(isValid, field);
    });
  }
  
  /**
   * 重置表单校验态
   * @param formRef 表单的ref名称，如不指定则默认为form
   */
  $resetForm(formRef = this.ViewRef.form) {
    if (!this.VueContext.$refs[formRef]) {
      console.warn('该表单ref不存在！');
      return;
    }
    this.VueContext.$refs[formRef].resetFields();
  }
  
  /**
   * 提交按钮不可点击
   * @param disabled
   */
  $setSubmitDisabled(disabled = true) { this.VueContext.PageData.submitDisabled = disabled; }
  
  /**
   * 提交按钮加载态
   * @param loading
   */
  $setSubmitLoading(loading = true) { this.VueContext.PageData.submitLoading = loading; }
  
  /**
   * 详情页加载态
   * @param loading
   */
  $setDetailLoading(loading = true) { this.VueContext.PageData.detailLoading = loading; }
  
  /**
   * 按钮加载态
   * @param loading
   */
  $setBtnLoading(loading = true) { this.VueContext.PageData.btnLoading = loading; }
  
  /**
   * 打开弹窗
   */
  $openDialog(dialogData = null) {
    if (CommonUtils.isNull(dialogData)) {
      this.VueContext.DialogData.visible = true;
      return;
    }
    dialogData.visible = true;
  }
  
  /**
   * 关闭弹窗
   */
  $closeDialog(dialogData = null) {
    if (CommonUtils.isNull(dialogData)) {
      this.VueContext.DialogData.visible = false;
      return;
    }
    dialogData.visible = false;
  }
  
  /**
   * 关闭当前弹窗（适用于当前是MultiDialogData的弹窗）
   */
  $closeCurrentDialog() { !!this.VueContext.setDialogVisible && this.VueContext.setDialogVisible(false); }
  
  /**
   * 初始化Vue内部相关实例数据
   * @param VueContext
   * @private
   */
  _initVueData(VueContext) {
    const { $route } = VueContext;
    this.$route      = $route;
    this.RouteData   = {
      ...this.$route.query,
      ...this.$route.params,
    };
  }
  
  _appendDialogData(dialogData = {}) {
    const newData = Object.assign({}, dialogData);
    return Object.assign(dialogData, BaseData.DialogData, newData);
  }
  
  
}
