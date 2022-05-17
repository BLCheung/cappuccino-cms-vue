import BaseMixin      from '@/mixins/base';
import { PagingData } from '@/common/data';

const PagingMixin = {
  mixins: [ BaseMixin ],
  data() {
    return {
      TableData:    Object.assign({}, PagingData.TableData),
      PagingQuery:  Object.assign({}, PagingData.PagingQuery),
      PagingSearch: Object.assign({}, PagingData.PagingSearch),
    }
  },
  
  methods: {
    onTableRowClassName() {},
    
    onTableCellClassName() {},
    
    onTableRowStyle() {},
    
    onTableCellStyle() {},
    
    onPaginationChange() {},
    
    onTableSelectionChange() {},
  },
}

export default PagingMixin;
