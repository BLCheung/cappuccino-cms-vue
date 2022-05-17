import BaseController from '@/controller/base';

export default class HomeController extends BaseController {
  
  constructor(context) {
    super(context)
      .bindData2Vue()
      .bindMethod2Vue([]);
  }
  
  onVueContextMounted(VueContext = null) {
  }
}
