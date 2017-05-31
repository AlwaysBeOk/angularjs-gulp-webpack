export default /* @ngInject */ function ($resource, $q) {
  const Payroll = $resource("/payroll/company/:companyId/payrolls/page/:page", {
    companyId: '@id',
    page: '@page'
  });
  Payroll.create = function (payroll, file) {
    return $q((resolve, reject) => {
      let url = '/payroll/payrolls';

      const formData = new FormData();
      for (let key in payroll) {
        if (payroll.hasOwnProperty(key)) {
          formData.append(key, payroll[key]);
        }
      }
      formData.append('file', file);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.send(formData);
      xhr.onload = function () {
        if (this.status == 200) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };
      xhr.ontimeout = function () {
        reject(xhr);
      };
    }).then(function (xhr) {
      return JSON.parse(xhr.responseText);
    });
  };

  return Payroll;
}
