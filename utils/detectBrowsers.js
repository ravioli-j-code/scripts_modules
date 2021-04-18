const CurrentBrowsers = (function() {
  
  // Opera 8.0+
  const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  
  // Firefox 1.0+
  const isFirefox =  typeof InstallTrigger !== 'undefined';
  
  // Safari 3.0+ "[object HTMLElementConstructor]"
  const isSafari = /constructor/i.test(window.HTMLElement) || (function(p) { 
    return p.toString() === '[object SafariRemoteNotification]';
  })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
  
  // Internet Explorer 6 - 11
  const isIE = /*@cc_on!@*/ false || !!document.documentMode;
  
  // Edge 20+
  const isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1 - 79
  const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  // Edge (based on chromium) detection
  const isEdgeChromium = isChrome && navigator.userAgent.indexOf('Edg') != -1;

  const detectBrowser = function () {
    if (isOpera) return 'OPERA';
    else if (isFirefox) return 'FIREFOX';
    else if (isSafari) return 'SAFARI';
    else if (isIE) return 'IE';
    else if (isEdge) return 'EDGE';
    else if (isChrome) return 'CHROME';
    else if (isEdgeChromium) return 'EDGECHROMIUM';
    else return 'UNKNOWN';
  }
  
  return {
    getType : detectBrowser
  };

})();
