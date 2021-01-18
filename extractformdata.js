/**
 * ie 에서 FormData를 지원하지 않아 대체하기 위해 만든 커스텀 함수
 *
 *      사용법
 *    let exForm = new ExtractFormData(formId);
 *    let searchquery = exForm.getFormData();
 *
 * @param formId
 * @constructor
 */
function ExtractFormData(formId) {
    this.obj = document.getElementById(formId);
    this.extractTag = "input, select, textarea";
}

ExtractFormData.prototype.getFormData = function() {
    let resultObj = {};

    let elements = this.obj.querySelectorAll(this.extractTag);
    for (let i = 0; i < elements.length ; i++ ) {
        let el = elements[i];
        let name = el.getAttribute("name");
        if (el.value && name) {
            if ( el.tagName === "INPUT") {
                resultObj[name] = el.value;
            } else if (el.tagName === "TEXTAREA") {
                resultObj[name] = el.value;
            } else if ( el.tagName === "SELECT" ) {
                resultObj[name] = el.value;
            }
        }
    }

    return resultObj;
};
