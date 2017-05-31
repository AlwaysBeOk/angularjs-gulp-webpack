/**
 * Created by pangguitao on 2017/5/16.
 */
export default /* @ngInject */ function () {
  return function (input) {
    let output = [];
    angular.forEach(input, function(v,k){
      angular.forEach(v, function(val,key) {
        if (!new RegExp("name").test(key) && !new RegExp("salary").test(key) && !new RegExp("mobile").test(key)) {
          output.push(v);
        }
      })
    });
    return output;
  }
}
