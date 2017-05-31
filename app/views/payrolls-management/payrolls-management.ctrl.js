import './payrolls-management.scss';

export const PayrollsManagementTemplate = require('./payrolls-management.html');

export class PayrollsManagementController {
  /* @ngInject */
  constructor($mdDialog,$routeParams,PayrollDetail,$location,CheckDetail,Payroll_,Search,recallOrSend) {
    this.PayrollDetail = PayrollDetail;
    this.CheckDetail = CheckDetail;
    this.Payroll_ = Payroll_;
    this.$routeParams = $routeParams;
    this.payrollId = $routeParams.id;
    this.pageno = $routeParams.page;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.Search = Search;
    this.recallOrSend = recallOrSend;
    this.search = $location.search().corpId;
    this.datas ={};
    this.totalNum = '';
    this.pageNum = 1;
    this.page = $routeParams.page-0 || 1;
    this.commonGetDetail();
    this.conditionQuery();
    this.url= '';
    this.showOrHide = '';
  }
  //查看个人详情
  personDetail(id){
    this.CheckDetail.get({
      corpid:this.search,
      salaryBillId:this.payrollId,
      id:id
    },success=>{
      this.showOrHide = 'showOrHide';
      this.name = success.employeeName;
      this.mobile = success.mobile;
      this.realMoney = success.realMoney;
      this.detailList = [];
      for(let key1 in success.fieldInfoList){
        for(let key2 in success.fieldInfoList[key1]){
          if(!new RegExp('明细').test(key2)){
            this.detailList.push(success.fieldInfoList[key1]);
          }
        }
      }
      console.log(success);
      //TODO
    },fail=>{
      console.log(fail);
      //TODO
    })
  }
  close(){
    this.showOrHide = '';
  }
  //重发个人单条数据
  afreshSend(id,$event,status){
    this.commonDialogConfirm('确定给'+status.employeeName+'重发信息么？',()=>{
      this.recallOrSend.update({methods:'sendsalarybilldetail',id:id},{},(success)=>{
      status.sendStatus =1;
      this.datas.sendCount+=1;
      this.datas.callBackCount-=1;
      this.judgeCount();
    },(fail)=>{
      //TODO
    })},$event)
  }
  //撤回单条个人数据
  recall(id,$event,status){
    this.commonDialogConfirm('确定撤回'+status.employeeName+'薪资信息么？',()=>{
      this.recallOrSend.update({methods:'callbacksalarybilldetail',id:id},{},(success)=>{
        console.log(success);
        //TODO
        status.sendStatus =2;
        this.datas.sendCount-=1;
        this.datas.callBackCount+=1;
        this.judgeCount();
      },(fail)=>{
        // TODO
      })},$event)
  }
  //全部发送
  sendAll($event){
    this.commonDialogConfirm('确定执行全部发送操作么？',()=>{
      // let param = JSON.stringify({"salaryBillId":this.payrollId-0});
      // console.log(param);
      this.recallOrSend.update({methods:'batchsendsalarybilldetail',salaryBillId:this.payrollId-0},{},(success)=>{
        console.log(success);
        this.commonDialogAlert('全部发送成功！',$event);
        this.commonGetDetail();
      },(fail)=>{
        // TODO
      })},$event)
  }
  //全部撤回
  recallAll($event){
    this.commonDialogConfirm('确定执行全部撤回操作么？',()=>{
      // let param = JSON.stringify({"salaryBillId":this.payrollId-0});
      // console.log(param);
      this.recallOrSend.update({methods:'batchcallbacksalarybilldetail',salaryBillId:this.payrollId-0},{},(success)=>{
        console.log(success);
        this.commonDialogAlert('全部撤回成功！',$event);
        this.commonGetDetail();
      },(fail)=>{
        //TODO
      })},$event)
  }
  //批量导出
  batchDerive(){
    this.url = this.$location.hash()+'/payroll/payrolls/details/excel?'+'salaryBillId='+this.payrollId;
    this.batchDeriveUrl();
    window.location.href = this.url;
  }
  conditionQuery(){
    let param = this.commonConditionQuery();
    param.salaryBillId = this.payrollId;
    param.pageno = this.pageno;
    this.Search.get(param,success=>{
      this.details = success.payload.details;
      this.totalNum = success.payload.totalCount;
      this.pageNum = Math.ceil(this.totalNum/10);
      if(this.pageNum == 0){
        this.page = this.pageNum;
      }else {
        this.page = this.$routeParams.page-0 || 1;
      }
    },fail=>{
      //TODO
    })
  }
  //分页
  prev(){
    this.go(this.page - 1);
  }
  next(){
    this.go(this.page + 1);
  }
  go(page) {
    const path = this.$location.path();
    const pattern = path.substring(0, path.lastIndexOf('/') + 1);
    this.$location.path(pattern + page);
  }
  commonDialogAlert(textContent,$event){
    this.$mdDialog.show(
      this.$mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('成功')
        .textContent(textContent)
        .ariaLabel('Alert Dialog Demo')
        .ok('确认')
        .targetEvent($event)
    );
  }
  commonDialogConfirm(textContent,fn,$event){
    this.$mdDialog.show(
      this.$mdDialog.confirm()
        .clickOutsideToClose(true)
        .title('提示')
        .textContent(textContent)
        .ok('确认')
        .cancel('取消')
        .targetEvent($event)
    ).then(() => {
      fn();
    });
  }
  commonGetDetail(){
    this.PayrollDetail.get({
      corpid:this.search,
      salaryBillId: this.payrollId,
      pageno: this.page
    },{},success=>{
      this.datas = success;
      this.details = this.datas.details;
      this.totalNum = this.datas.totalNum;
      this.pageNum = Math.ceil(this.totalNum/10);
    },fail=>{
      // TODO
    });
  }
  judgeCount(){
    if(this.datas.sendCount<0){
      this.datas.sendCount = 0;
    }
    if(this.datas.sendCount>this.datas.totalNum){
      this.datas.sendCount = this.datas.totalNum;
    }
    if(this.datas.callBackCount<0){
      this.datas.callBackCount=0;
    }
    if(this.datas.callBackCount>this.datas.totalNum){
      this.datas.callBackCount = this.datas.totalNum;
    }
  }
  batchDeriveUrl(){
    if(this.searchName){
      this.url += ('&name='+this.searchName);
    }
    if(this.chooseSendStatus){
      this.url += ('&sendStatus='+this.chooseSendStatus);
    }
    if(this.chooseReadStatus){
      this.url += ('&readStatus='+this.chooseReadStatus);
    }
    if(this.chooseConfirmStatus){
      this.url += ('&confirmStatus='+this.chooseConfirmStatus);
    }
  }
  commonConditionQuery(){
    let param = {};
    if(this.searchName){
      param.name = this.searchName;
    }
    if(this.chooseSendStatus){
      param.sendStatus = this.chooseSendStatus;
    }
    if(this.chooseReadStatus){
      param.readStatus = this.chooseReadStatus;
    }
    if(this.chooseConfirmStatus){
      param.confirmStatus = this.chooseConfirmStatus;
    }
    return param;
  }

}
