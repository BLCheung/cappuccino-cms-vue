import DialogType from '@/common/enum/dialog-type';

const BaseData = {
  /** 基础视图数据 **/
  ViewData: {},
  
  /** 基础视图Ref **/
  ViewRef: { form: 'form', table: 'table', dialog: 'dialog' },
  
  /** 基础页面数据 **/
  PageData: {
    submitDisabled: false,  // 提交按钮不可点击
    submitLoading:  false,  // 提交时加载
    detailLoading:  false,  // 打开详情页时加载
    btnLoading:     false,  // 点击按钮时加载
  },
  
  /** 基础弹窗数据 **/
  DialogData: {
    title:        '对话框',
    visible:      false,              // 是否可见
    width:        '50%',              // 宽度，只有在normal类型才生效
    top:          '15vh',             // 距离顶部距离，只有在normal类型才生效
    modal:        true,               // 是否开启遮罩
    center:       true,               // 弹窗顶部与底部是否垂直居中对齐
    type:         DialogType.Normal,  // 弹窗类型，normal，large，fullscreen
    appendToBody: false,              // 如果弹窗内部还嵌套了弹窗，则内部弹窗需要设置该属性为true
    action:       '',                 // 自定义的监听事件标识，外部可通过@监听该事件
    params:       {},                 // 追加的自定义参数
  },
  
  /** 基础表单数据 **/
  FormData: {},
  
  /** 基础表单校验规则 **/
  FormRules: {},
  
  /** 路由数据 **/
  RouteData: {},
}

const PagingData = {
  /** 基础表格数据 **/
  TableData: {
    disabled:    false,
    list:        [],
    loading:     false,
    total:       0,
    selections:  [],
    defaultSort: {},
  },
  
  /** 基础分页查询数据 **/
  PagingQuery: { page: 1, limit: 20 },
  
  /** 基础分页字段排序 eg: { prop: 'createTime', order: 'ascending/descending' } **/
  PagingSort: {},
  
  /** 分页追加的查询参数 eg: { keyword: '', startTime: '' } **/
  PagingSearch: {},
}

export {
  BaseData,
  PagingData,
}
