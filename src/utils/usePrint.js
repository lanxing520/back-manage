import printJS from 'print-js';

export function usePrint() {
  const printHtml = (elementId, options = {}) => {
    printJS({
      printable: elementId,
      type: 'html',
      css: options.css, // 可传入自定义CSS
      scanStyles: options.scanStyles || false, // 是否扫描样式
      targetStyles: options.targetStyles || ['*'], // 要包含的样式
      ignoreElements: options.ignoreElements || [], // 要忽略的元素
    });
  };

  return { printHtml };
}