/**
 * Created by pangguitao on 2017/5/12.
 */
export default /* @ngInject */ function ($resource) {
  const recallOrSend = $resource("/payroll/:methods",{
    methods:'@methods'
    }, {
      update: {
        method: 'PUT'
      }
    }
  )
  return recallOrSend;
}
