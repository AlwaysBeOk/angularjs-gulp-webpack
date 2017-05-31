import './payrolls-list.scss';

export const PayrollsListTemplate = require('./payrolls-list.html');

export class PayrollsListController {
  /* @ngInject */
  constructor($mdDialog, $routeParams, $location, NotificationService, Payroll, $window, SalaryBillIdDelete, Payroll_) {
    this.$mdDialog = $mdDialog;
    this.$location = $location;
    this.Payroll = Payroll;
    this.Payroll_ = Payroll_;
    this.$window = $window;
    this.SalaryBillIdDelete = SalaryBillIdDelete;
    this.NotificationService = NotificationService;
    this.page = $routeParams.page - 0 || 1;
    this.Payroll.get({
      companyId: 'dingc224c85226e166b735c2f4657eb6378f',
      page: this.page
    },success=>{
      this.payrolls = success;
      this.pageCount = Math.ceil(this.payrolls.payload.totalCount/10);
    },fail=>{
      //TODO
    });
  }
  //点击salaryBill
  showDetails(salaryBillId){
    this.Payroll_.get({methods:'status',id:salaryBillId},{},
      (success)=>{
        console.log(success.payload.status);
        if(success.payload.status != 0) {
          this.$location.path('/payrolls/'+salaryBillId+'/page/1');
          this.$location.search('corpId','dingc224c85226e166b735c2f4657eb6378f');
        }else {
          this.NotificationService.notify('请先在上一步进行保存或者发送，才能查看薪资详情！');
        }
      },
      ()=>{
        //TODO
      }
    )
  }
  //点击编辑
  compile(salaryBillId,$event) {
    $event.stopPropagation();
    this.Payroll_.get({methods:'status',id:salaryBillId},{},
      (success)=>{
        if(success.payload.status == 0) {
          this.$location.path('/pay');
          this.$location.search('id', salaryBillId)
        }else {
          this.NotificationService.notify('已在上一步保存或发送成功，不能进行编辑！');
        }
      },
      ()=>{
        //TODO
      }
    )
  }
  //点击删除
  confirmDelete(salaryBillId,$event) {
    $event.stopPropagation();
    this.$mdDialog.show(
      this.$mdDialog.confirm()
      .clickOutsideToClose(true)
      .title('提示')
      .textContent('此操作将此条信息删除,是否删除？')
      .ok('确认')
      .cancel('取消')
      .targetEvent($event)
    ).then(() => {
      console.log(salaryBillId);
      this.SalaryBillIdDelete.delete({salaryBillId:salaryBillId},{},(success)=>{
        console.log(success);
        this.$window.location.reload(true);
      });
    });
  }
  // 下一页
  next() {
    this.go(this.page + 1);
  }
  //上一页
  prev() {
    this.go(this.page - 1);
  }
  
  go(page) {
    const path = this.$location.path();
    const pattern = path.substring(0, path.lastIndexOf('/') + 1);
    this.$location.path(pattern + page);
  }
}
