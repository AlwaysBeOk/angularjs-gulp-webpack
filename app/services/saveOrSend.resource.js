/**
 * Created by pangguitao on 2017/5/2.
 */
export default /* @ngInject */ function ($resource) {
    const saveOrSend = $resource("/payroll/payrolls/:method", { method: '@method'});

    return saveOrSend;
}
