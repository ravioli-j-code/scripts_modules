
/**
 * Ajax Function for Pure Javascript
 * @param url
 * @param method : "GET", "POST", etc..
 * @param data : let dataObject = {}
 * @param option : true or false for set async status
 * @param callBackFunction
 * @param isLoadingImg
 */
function FNAjaxModule(url, method, data, option, callBackFunction, isLoadingImg) {
  if(method.toUpperCase() === "FILE") {
    fileDownload(url, data);
    return;
  }
  let isLoading = !isNull(isLoadingImg) && isLoadingImg !== false ? true : isLoadingImg;
  const ajaxOption = {
    async: typeof option === "boolean" ? option : option.async || true, 
    contentType: option.contentType || "application/x-www-form-urlencoded; charset=utf-8",
  }
	     
  let xhr = new XMLHttpRequest();
	
  if(method.toUpperCase() === "GET") {
    xhr.open(method.toUpperCase(), url + "?" + jsonParamSerialize(data), ajaxOption.async);
  } else {
    xhr.open(method.toUpperCase(), url, ajaxOption.async);
  }

  xhr.setRequestHeader("ajax-request", "true");
    
  if (ajaxOption.contentType !== "multipart/form-data") {
    xhr.setRequestHeader("Content-Type", ajaxOption.contentType);
  }
  
  let csrfToken = document.getElementsByName("_csrf")[0].getAttribute("content");
  let csrfHeader = document.getElementsByName("_csrf_header")[0].getAttribute("content");
  xhr.setRequestHeader(csrfHeader, csrfToken);

  if(url.indexOf("session") === -1){
    ajaxLoadingImage(isLoading);
  }
    
  const dataOption = {
    "application/x-www-form-urlencoded; charset=utf-8": jsonParamSerialize(data),
    "application/json; charset=utf-8": JSON.stringify(data),
    "multipart/form-data": data
  }
  
  const params = dataOption[ajaxOption.contentType];

  xhr.send(method.toUpperCase() === "GET" ? null : params || data);

  xhr.onreadystatechange = function () {
    if(this.readyState === 4) {
      ajaxLoadingImage(false);

      if(this.status === 200) {
        callBackFunction(this.responseText && JSON.parse(this.responseText));
      } else if(this.status === 6653) {
        alert("로그인 세션이 만료되었습니다."); // expired session
        window.location.href =  getContextPath()+'/login'; // redirect to login page url
      } else if(this.status === 400) {
        alert(this.responseText || "웹 페이지에서 유효하지 않은 요청을 하였습니다.(400)"); // invalid request
      } else if(this.status === 403) {
        alert(this.responseText || "웹 페이지를 볼 수 있는 권한이 없습니다.(403)"); // no authority
      } else if(this.status === 404) {
        alert("요청하신 페이지를 찾을 수 없습니다.(404)"); // page not found
      } else if(this.status === 405) {
        alert("서버로 올바르지 않은 요청이 들어왔습니다.(405)"); // invalid server request
      } else if(this.status === 500) {
        alert("내부서버 오류가 발생하였습니다.(500)"); // internal server error
      } else {
        alert("알 수 없는 오류가 발생했습니다."); // unknown error
      }
    }
  };

  xhr.onerror = function () {
    ajaxLoadingImage(false);
  };
}

/**
 * function for return contextpath
 *
 *   ctx is defined in jsp
 *   <input type="hidden" id="ctx" value="${pageContext.request.contextPath}">
 *
 * @returns {*}
 */
function getContextPath() {
  return document.getElementById("ctx").value;
}

/**
 * Show Image File while Loading Ajax
 *
 *     add tags to jsp file
 *     <article id="ajaxLoadingDiv" class="jsDiv">
 *       <img src="<c:url value="/images/loading2_1.gif" />" alt="processing" />
 *     </article>
 *
 *     add scss
 *     #ajaxLoadingDiv.on { 
 *       z-index: 10; display: block;
 *       img { position: absolute; top: 50%; left: 50%; margin: -150px 0 0 -150px; padding:20px; background: #fff;border-radius: 50%}
 *     }
 *
 * @param isShow
 * @returns {boolean}
 */
function ajaxLoadingImage(isShow) {
  if(!document.getElementById("ajaxLoadingDiv")) return false;
  if(isShow) document.getElementById("ajaxLoadingDiv").classList.add("on");
  else document.getElementById("ajaxLoadingDiv").classList.remove("on");
}

/**
 * Serialize Json Parameters
 * @param jsonData
 * @returns {string}
 */
function jsonParamSerialize(jsonData) {
  if(isNull(jsonData)) return "";
  let resultParam = [];

  for(let data in jsonData) {
      resultParam.push(data + "=" + encodeURIComponent(jsonData[data]))
  }
  return resultParam.join("&");
}

/**
 * convert to Json Parameter Type
 * @param url
 * @param data
 */
function fileDownload(url, data) {
  window.location.href = url + "?" + jsonParamSerialize(data);
}

/**
 * check whether value is null or not
 * @param value
 * @returns {boolean}
 */
function isNull(value) {
  let blank_pattern = /^\s+|\s+$/g;
  if(blank_pattern.test(value)) return true;
  return !value;
}


