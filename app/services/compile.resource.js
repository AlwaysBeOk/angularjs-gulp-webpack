/**
 * Created by pangguitao on 2017/5/5.
 */
export default /* @ngInject */ function ($resource) {
    const Compile = $resource("/payroll/company/:corpid/payrolls/:salaryBillId", {
        corpid:'@corpid',
        salaryBillId: '@salaryBillId',
    },{},{query:{method:'GET',isArray:false}});
    return Compile;
}

