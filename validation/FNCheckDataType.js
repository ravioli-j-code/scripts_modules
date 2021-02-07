const FNCheckDataType = {

  // check parameter is number
  // ex. 
  // console.log(FNCheckDataType.isNumber(11))         true
  // console.log(FNCheckDataType.isNumber("11"))       false
  // console.log(FNCheckDataType.isNumber(11.1))       true
  // console.log(FNCheckDataType.isNumber(NaN))        false
  // console.log(FNCheckDataType.isNumber(Infinity))   false
  isNumber : function(p) {
    if ( typeof p !== 'number' ) return false;
    if ( p !== Number(p) ) return false;
    if ( !isFinite(p) ) return false;
    return true;    
  },
  
  // check content is number whether parameter is string or number.
  // ex. 
  // console.log(FNCheckDataType.isNumberContent(11))        true
  // console.log(FNCheckDataType.isNumberContent("11"))      true
  // console.log(FNCheckDataType.isNumberContent(""))        false
  // console.log(FNCheckDataType.isNumberContent(0))         true
  // console.log(FNCheckDataType.isNumberContent(NaN))       false
  // console.log(FNCheckDataType.isNumberContent())          false
  // console.log(FNCheckDataType.isNumberContent("abc"))     false
  // console.log(FNCheckDataType.isNumberContent(11.1))      true
  // console.log(FNCheckDataType.isNumberContent(Infinity))  false
  isNumberContent : function(p) {
    if ( typeof p === 'string' && ( Number(p) === 0 || !isFinite(p) ) ) return false;
    if ( !isFinite(p) ) return false;
    return true;    
  }
  
}
