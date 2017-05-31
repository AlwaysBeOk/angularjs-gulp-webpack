/**
 * Created by pangguitao on 2017/5/8.
 */
export default /* @ngInject */ function ($resource) {
  const Payroll_ = $resource("/payroll/:methods/:id", {
    methods:'@methods',
    id:'@id'
  }
  );
  return Payroll_;
}
