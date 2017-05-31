/**
 * Created by cloverzero on 2017/4/7.
 */
export default class DictService {



  /* @ngInject */
  constructor($http) {
    this.$http = $http;
    this.url = '/config/getdictinfobytype/';
  }

  getScaleTypes() {
    return this.$http.get(this.url + 'ScaleType').then(function (res) {
      return res.data;
    });
  }

  getBusinessType() {
    return this.$http.get(this.url + 'BusinessType').then(function (res) {
      return res.data;
    });
  }

  getPayTypes() {
    return this.$http.get(this.url + 'PayType').then(function (res) {
      return res.data;
    });
  }
}
