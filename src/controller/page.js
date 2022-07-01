import BaseController from '@/controller/base';
import { PagingData } from '@/common/data';
import CommonUtils    from '@/utils/common';

export default class PagingController extends BaseController {
  
  TableData = Object.assign({}, PagingData.TableData);
  
  PagingQuery = Object.assign({}, PagingData.PagingQuery);
  
  PagingSort = Object.assign({}, PagingData.PagingSort);
  
  PagingSearch = Object.assign({}, PagingData.PagingSearch);
  
  PagingEntity = null;
  
  PagingRequest = async (data) => { throw new Error('子类未声明分页请求函数!'); };
  
  constructor(vueContext) {
    super(vueContext);
  }
  
  bindData2Vue() {
    super.bindData2Vue();
    this.VueContext.TableData    = this.TableData;
    this.VueContext.PagingQuery  = this.PagingQuery;
    this.VueContext.PagingSearch = this.PagingSearch;
    return this;
  }
  
  bindMethod2Vue(methods = []) {
    super.bindMethod2Vue(methods);
    this.VueContext.onTableRowClassName    = this.onTableRowItemInit.bind(this);
    this.VueContext.onTableCellClassName   = this.onTableCellItemInit.bind(this);
    this.VueContext.onTableRowStyle        = this.onTableRowStyle.bind(this);
    this.VueContext.onTableCellStyle       = this.onTableCellStyle.bind(this);
    this.VueContext.onPaginationChange     = this.onPagingQueryChange.bind(this);
    this.VueContext.onTableSelectionChange = this.onSelectionChange.bind(this);
    return this;
  }
  
  /**
   * 表格行的数据初始化
   * @param row
   * @param rowIndex
   */
  onTableRowItemInit({ row, rowIndex }) {}
  
  /**
   * 表格列的数据初始化
   * @param row
   * @param column
   * @param rowIndex
   * @param columnIndex
   */
  onTableCellItemInit({ row, column, rowIndex, columnIndex }) {}
  
  /**
   * 表格行的样式回调
   * 需要改变行的样式的话必须返回一个style对象
   * @param row
   * @param rowIndex
   * @return {{}}
   */
  onTableRowStyle({ row, rowIndex }) { return {}; }
  
  /**
   * 表格列的样式回调
   * 需要改变列的样式的话必须返回一个style对象
   * @param row
   * @param column
   * @param rowIndex
   * @param columnIndex
   * @return {{}}
   */
  onTableCellStyle({ row, column, rowIndex, columnIndex }) { return {}; }
  
  /**
   * 分页器发生改变
   * @param page 页码
   * @param limit 每页条目数
   */
  onPagingQueryChange({ page, limit }) {}
  
  /**
   * 表格选项发生改变
   * @param selection
   */
  onSelectionChange(selection) { this.TableData.selections = selection; }
  
  /**
   * 设置分页列表
   * @param list
   */
  $setList(list = []) { this.TableData.list = list; }
  
  /**
   * 获取当前表格所有选中的条目
   * @return {[]|*[]}
   */
  $getSelections() { return this.TableData.selections || []; }
  
  /**
   * 获取当前表格所有选中的条目id
   * @return {*[]}
   */
  $getSelectionsIds() { return this.TableData.selections.map(item => item.id); }
  
  /**
   * 列表加载态
   * @param loading
   */
  $setPagingLoading(loading = true) { this.TableData.loading = loading; }
  
  /**
   * 更新表格数据
   */
  $updateTableData() { this.VueContext.TableData = this.TableData; }
  
  /**
   * 更新分页查询
   */
  $updatePagingQuery() { this.VueContext.PagingQuery = this.PagingQuery; }
  
  /**
   * 更新分页搜索
   */
  $updatePagingSearch() { this.VueContext.PagingSearch = this.PagingSearch; }
  
  /**
   * 通过id获取指定条目
   * @param id
   * @return {*}
   */
  $getItemById(id) { return this.TableData.list.find(item => this.$isSameItem(id, item)); }
  
  /**
   * 通过id更新条目
   * @param id
   * @param newItem
   */
  $updateItemById(id, newItem) {
    // const index = this.TableData.list.findIndex(item => this.$isSameItem(id, item));
    // this.TableData.list.splice(index, 1, newItem);
    const findItem = this.TableData.list.find(item => this.$isSameItem(id, item));
    Object.assign(findItem, newItem);
  }
  
  /**
   * 通过下标更新条目
   * @param index
   * @param newItem
   */
  $updateItemByIndex(index, newItem) { this.TableData.list.splice(index, 1, newItem); }
  
  /**
   * 通过下标增加条目
   * @param index
   * @param newItem
   */
  $addItemByIndex(index, newItem) { this.TableData.list.splice(index, 0, newItem); }
  
  /**
   * 通过id删除条目
   * @param id
   */
  $deleteItemById(id) {
    const index = this.TableData.list.findIndex(item => this.$isSameItem(id, item));
    this.TableData.list.splice(index, 1);
  }
  
  /**
   * 通过下标删除条目
   * @param index
   */
  $deleteItemByIndex(index) { this.TableData.list.splice(index, 1); }
  
  /**
   * 批量删除指定id的条目
   * @param ids
   */
  $deleteItemByIds(ids = []) {
    if (ids.length === 0) return;
    for (let i = this.TableData.list.length - 1; i >= 0; i--) {
      if (ids.indexOf(this.TableData.list[i].id) !== -1) {
        this.TableData.list.splice(i, 1);
      }
    }
  }
  
  /**
   * 是否同一item
   * @param id
   * @param item
   * @return {boolean}
   */
  $isSameItem(id, item) { return id == item.id; }
  
  /**
   * 清空搜索参数
   */
  $resetSearch() {
    const searchKeys = Object.keys(this.PagingSearch);
    CommonUtils.forEach(searchKeys, key => this.PagingSearch[key] = '');
  }
  
  /**
   * 分页加载
   * @param isRefresh
   * @return {Promise<void>}
   */
  async $startPaging(isRefresh = false) {
    this.$setPagingLoading(true);
    this.PagingRequest(this._getPagingParams(isRefresh))
        .then((res) => {
          if (!res.isOK()) {
            this.PagingQuery.pageNum = this.PagingQuery.pageNum === 1 ? 1 : this.PagingQuery.pageNum - 1;
            return;
          }
          const { hasNext, pageNum, pageSize, total, totalPage, list } = res.data;
      
          if (!!this.PagingEntity && this.PagingEntity instanceof Function) {
            const entityList = [];
            CommonUtils.forEach(list, item => {
              // noinspection JSValidateTypes
              entityList.push(new this.PagingEntity(item));
            });
            this.TableData.list = entityList;
          } else {
            this.TableData.list = list;
          }
          this.TableData.total = total;
        })
        .finally(() => {
          this.$setPagingLoading(false);
        });
  }
  
  
  _getPagingParams(isRefresh = false) {
    let pagingQuery;
    let sorts;
    if (!isRefresh) {
      pagingQuery = this.PagingQuery;
      sorts       = this.PagingSort;
    } else {
      pagingQuery = Object.assign({}, PagingData.PagingQuery);
      sorts       = this.TableData.defaultSort;
      // this.$resetSearch();
    }
    return {
      pageNum:  pagingQuery.page,
      pageSize: pagingQuery.limit,
      ...sorts,
      ...this.PagingSearch,
    };
  }
}
