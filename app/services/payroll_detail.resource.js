export default /* @ngInject */ function ($resource) {
  const PayrollDetail = $resource("/payroll/company/:corpid/billdetails/:salaryBillId/page/:pageno", {
    corpid:'@corpid',
    salaryBillId: '@salaryBillId',
    pageno: '@pageno'
  });

  return PayrollDetail;
}
