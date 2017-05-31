/**
 * Created by cloverzero on 2017/3/24.
 */
export default /* @ngInject */ function ($resource) {
  const Company = $resource("/config/company/:id", {
    id: '@id'
  }, {
    update: {url:'/config/company',method: 'PUT'}
  });

  return Company;
}
