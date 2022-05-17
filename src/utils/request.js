let _debounceTimer = null, _throttleTimeout = null, _lock = false;

const RequestUtil = {};

/**
 * 节流函数，一定时间内只触发一次
 * @example RequestUtil.throttle(async => await this.fetchData());
 * @param requestFunc
 * @param delay
 */
RequestUtil.throttle = (requestFunc, delay = 500) => {
  if (!_lock) {
    _lock = true;
    typeof requestFunc === 'function' && requestFunc();
    _throttleTimeout = setTimeout(() => {
      _lock = false;
    }, delay);
  }
}

/**
 * 防抖函数，一定时间内只有最后一次操作才触发
 * @example RequestUtil.debounce(async => await this.fetchData());
 * @param requestFunc
 * @param delay
 */
RequestUtil.debounce = (requestFunc, delay = 500) => {
  if (_debounceTimer !== null) clearTimeout(_debounceTimer);
  _debounceTimer = setTimeout(async () => {
    typeof requestFunc === 'function' && requestFunc();
  }, delay);
}

export default RequestUtil;
