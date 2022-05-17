import Colors      from '@/styles/colors.json';
import ELStyle     from '@/styles/element-ui-styles.json';
import ElVariables from '@/styles/element-variables.scss';
import CommonUtils from '@/utils/common';
import CSSColor    from 'css-color-function';
import RGBHex      from 'rgb-hex';

const ThemeKit = {};
const STYLE_ID = 'el-theme';

const tintFun  = (color = '', percent = 0) => `color(${ color } tint(${ percent }%))`;
const shadeFun = (color = '', percent = 0) => `color(${ color } shade(${ percent }%))`;

/**
 * 颜色加亮
 * @param color 颜色
 * @param percent 比例
 * @return {string}
 */
ThemeKit.light = (color = '', percent = 0) =>
  `#${ RGBHex(CSSColor.convert(tintFun(color, percent))) }`;

/**
 * 颜色加暗
 * @param color 颜色
 * @param percent 比例
 * @return {string}
 */
ThemeKit.dark = (color = '', percent = 0) =>
  `#${ RGBHex(CSSColor.convert(shadeFun(color, percent))) }`;

/**
 * 生成颜色标记表
 * @param color
 * @return {{primary: (string|*)}}
 */
ThemeKit.generateColorsMap = (color = '') => {
  const colorsMap = {
    primary: color ? color : ElVariables.theme,
  };
  
  const colorKeys = Colors.colorKeys;
  CommonUtils.forEach(Object.keys(colorKeys), key => {
    const colorValue = colorKeys[key].replace(/primary/g, colorsMap.primary);
    // 通过css color函数转换颜色字符串为十六进制的颜色值
    colorsMap[key]   = `#${ RGBHex(CSSColor.convert(colorValue)) }`;
  });
  
  return colorsMap;
}

/**
 * 获取打上颜色标记的elementUI样式模板
 * @return {string}
 */
const _getElCSSTemplate = () => {
  const colorValues = Colors.colorValues;
  let elCSSString   = ELStyle.data;
  // 去除font-face相关引用路径，以免报引用失败警告
  elCSSString       = elCSSString.replace(/@font-face{[^}]+}/, '');
  // 根据颜色值给elementUI的样式表打上颜色标记
  CommonUtils.forEach(Object.keys(colorValues), color => {
    elCSSString = elCSSString.replace(new RegExp(color, 'ig'), colorValues[color]);
  });
  return elCSSString;
}

/**
 * 生成替换后的主题样式
 * @param colorsMap
 * @return {string}
 */
const _generateThemeStyle = (colorsMap = {}) => {
  let elCSSTemplate = _getElCSSTemplate();
  
  CommonUtils.forEach(Object.keys(colorsMap), colorKey => {
    // ????primary => ????#409EFF
    elCSSTemplate = elCSSTemplate.replace(new RegExp('(:|\\s+)' + colorKey, 'g'), '$1' + colorsMap[colorKey]);
  });
  
  return elCSSTemplate;
}

/**
 * 设置新的主题样式
 * @param colorsMap
 */
ThemeKit.setThemeStyle = (colorsMap = {}) => {
  console.log('主题Map：', colorsMap);
  const newStyle = _generateThemeStyle(colorsMap);
  let style      = document.getElementById(STYLE_ID);
  if (!style) {
    style    = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  style.innerText = newStyle;
}

export default ThemeKit;
