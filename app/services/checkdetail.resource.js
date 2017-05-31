/**
 * Created by pangguitao on 2017/5/9.
 */
export default /* @ngInject */ function ($resource) {
    const CheckDetail =$resource('/payroll/company/:corpid/payrolls/:salaryBillId/details/:id',{
      corpid:'@corpid',
      salaryBillId:'@salaryBillId',
      id:'@id'
    });
    return CheckDetail;
}


