/**
 * Data Binding Function
 *
 *   in jsp
 *   <input type=text id="myText1">
 *   <input type=text id="myText2">
 *   <span type=text id="myDomElement"></span>
 *  
 *   in javscript file
 *   let obj = {a:123}
 *   let myInputElement1 = document.getElementById("myText1")
 *   let myInputElement2 = document.getElementById("myText2")
 *   let myDOMElement = document.getElementById("myDomElement")
 *   new Binding({
 *     object: obj,
 *     property: "a"
 *   })
 *   .addBinding(myInputElement1, "value", "keyup")
 *   .addBinding(myInputElement2, "value", "keyup")
 *   .addBinding(myDOMElement, "innerHTML")
 *
 *   obj.a = 456;
 *
 *   @param b 
 */
function Binding(b) {
  _this = this;
  this.elementBindings = [];
  this.value = b.object[b.property];
  this.valueGetter = function(){
      return _this.value;
  }
  this.valueSetter = function(val){
      _this.value = val;
      for (var i = 0; i < _this.elementBindings.length; i++) {
          var binding=_this.elementBindings[i];
          binding.element[binding.attribute] = val;
      }
  }
  this.addBinding = function(element, attribute, event){
      var binding = {
          element: element,
          attribute: attribute
      }
      if (event){
          element.addEventListener(event, function(event){
              _this.valueSetter(element[attribute]);
          })
          binding.event = event;
      }       
      this.elementBindings.push(binding);
      element[attribute] = _this.value;
      return _this;
  }

  Object.defineProperty(b.object, b.property, {
      get: this.valueGetter,
      set: this.valueSetter
  }); 

  b.object[b.property] = this.value;
}
