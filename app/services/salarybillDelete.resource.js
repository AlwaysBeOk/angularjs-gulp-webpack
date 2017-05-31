/**
 * Created by pangguitao on 2017/5/5.
 */
export default /* @ngInject */ function ($resource) {
    const salaryBillIdDelete = $resource("/payroll/deletesalarybill/:salaryBillId", { salaryBillId: '@salaryBillId'});

    return salaryBillIdDelete;
}
