/**
 * Created by pangguitao on 2017/5/11.
 */
export default /* @ngInject */ function ($resource) {
  const Search = $resource("/payroll/payrolls/details",{})
return Search;
}
