import './pay-off.scss';
export const PayOffTemplate = require('./pay-off.html');

const PROGRESS_STATE_UPLOAD = 'upload';
const PROGRESS_STATE_CHECK = 'check';
const PROGRESS_STATE_WELFARE = 'welfare';
const PROGRESS_STATE_SEND = 'send';
const PROGRESS_START_POPUP = 'POPUP';

export class PayOffController {
  /* @ngInject */
  constructor(Payroll, DictService,$location,SaveOrSend,Compile,NotificationService,$mdPanel) {
    this.loading = false;           //加载样式
    this.$mdPanel = $mdPanel;
    this.location = $location;
    this.NotificationService = NotificationService;
    this.Payroll = Payroll;          //Payroll excel提交服务
    this.SaveOrSend = SaveOrSend;    //SaveAndSend 发送接口服务
    this.Compile = Compile;          //compile 点击工资条管理模块后调用的接口
    this.payroll = new Payroll();   //对象化parroll 往里添加属性作为参数
    this.salaryDetail = {};          //明细说明获取值对象
    this.payroll.companyId = 'dingc224c85226e166b735c2f4657eb6378f';
    this.payroll.salaryMonth = '';
    this.payroll.salaryTypeDictId = '';
    this.payroll.salaryTitle = '';
    this.payTypes = [];              //薪资类型请求后数据
    this.data = {};                  //上传工资单后台返回数据
    this.tableHeader = [];           //工资单中表头信息
    this.tableData = [];             //工资单中所有信息
    this.salaryBillId = 0;           //本次上传的工资单id
    this.fieldMapping = {};          //映射对象，用于数据传送映射到数据库对应字段
    this.name = '';                  //用于保存不用于展示到预览页面姓名数据
    this.mobile = '';                //用于保存不用于展示到预览页面手机号数据
    this.salary = '';                //用于保存不用于展示到预览页面实发工资数据
    this.mapping = {                 //映射字段，包括三个下拉列表中index
      name: -1,
      mobile: -1,
      salary: -1
    };
    this.remind_float = false;     //提示性信息是否显示
    DictService.getPayTypes().then(types => this.payTypes = types);//薪资类型请求
    if(this.location.search().id){
      // console.log(this.location.search().id);
      this.progressState = PROGRESS_STATE_CHECK;
      this.salaryBillId = this.location.search().id;
      this.Compile.get({
        corpid:'dingc224c85226e166b735c2f4657eb6378f',
        salaryBillId:this.salaryBillId
      },{},(payroll)=>{
        console.log(payroll);
        this.tableHeader = payroll.excelHeader;
        this.tableData = payroll.excelData;
        this.tableDataLength = payroll.excelData.length;
        //从工资条管理点击编辑进去以下三条保存上传的数据
        this.payroll.salaryMonth = payroll.salaryMonth;
        this.payroll.salaryTypeDictId = payroll.salaryTypeDictId;
        this.payroll.salaryTitle = payroll.salaryTitle;
        for (let header of this.tableHeader) {
          this.fieldMapping[header] = {
            mapping: '',
            isShown: true,
            salaryDetail:''
          };
        }
      },(fail)=>{
        // console.log(fail);
        // TODO
      })
    }else{
      this.progressState = PROGRESS_STATE_UPLOAD;
    }
  }
  //组合发薪标题
  change(){
    let len = this.payTypes.length,text= "",payTypes =this.payTypes,payroll = this.payroll;
    //根据列表表单value值，或取到对应文本
    for(let i =0;i<len;i++){
      if(payTypes[i].dictInfoId == payroll.salaryTypeDictId){
        text = payTypes[i].infoName;
      }
    }
    let date = payroll.salaryMonth.substring(0,4)+'年'+payroll.salaryMonth.substring(4,6)+'月';
    if(payroll.salaryMonth && !payroll.salaryTypeDictId){
      payroll.salaryTitle = date;
    }else if(!payroll.salaryMonth && payroll.salaryTypeDictId){
      payroll.salaryTitle = text;
    }else {
      payroll.salaryTitle = date + text;
    }
  }
  //核对信息提示显示
  onRemind(){
    this.remind_float = true;
  }
  //核对信息提示隐藏
  outRemind(){
    this.remind_float = false;
  }
  //点击上传excel
  upload() {
    const uploadInput = document.getElementById("upload");
    const clickEvent = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    uploadInput.dispatchEvent(clickEvent);
  }

  fileSelected(input) {
    this.loading = true;
    this.Payroll.create(this.payroll, input.files[0]).then(payroll => {
      this.loading = false;
      this.data = payroll;
      this.tableHeader = payroll.excelHeader;
      this.tableData = payroll.excelData;
      this.tableDataLength = payroll.excelData.length;
      this.salaryBillId = payroll.salaryBillId;
      this.progressState = PROGRESS_STATE_CHECK;
      this.detail = {};
      for (let header of this.tableHeader) {
        this.fieldMapping[header] = {
          mapping: '',
          isShown: true,
          salaryDetail:''
        };
      }
      console.log(this.data);
    },fail=>{
      //TODO
    });
  }
  
  //点击检查页面重新上传
  afresh_check() {
    const uploadInput = document.getElementById("upload2");
    const clickEvent = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    uploadInput.dispatchEvent(clickEvent);
  }
  //点击检查页面下一步
  next_check() {
    this.resWelfareList();
    this.progressState = PROGRESS_STATE_WELFARE;
  }
  
  //点击发放福利上一步
  afresh_welfare(){
    this.progressState = PROGRESS_STATE_CHECK;
  }
  
  //点击发放福利下一步
  next_welfare(){
    for (let key in this.mapping) {
      let index =this.mapping[key];
      let filed = this.tableHeader[index];
      this.fieldMapping[filed].mapping = key;
    }
    this.commonGet(); //获取三个必须字段映射的值对应的表头
      // this.filedMapping ={
      //   姓名:{maping:"name",isShown:true,salaryDetail:''},
      //    电话:{maping:"mobile",isShown:true,salaryDetail:''}
      // }
    this.detail = this.tableData[0]; //使手机预览页面不空白
    this.progressState = PROGRESS_STATE_SEND;
  }
  //点击发送页面上一步
  previous() {
    this.progressState = PROGRESS_STATE_WELFARE;
  }
  //点击编辑图标文本框可以输入
  editChange(key){
    document.querySelector('#textarea' + key).removeAttribute('disabled');
    document.querySelector('#textarea' + key).focus();
  }
  //文本框失去焦点时不能编辑
  blur(key){
    document.querySelector('#textarea' + key).setAttribute('disabled','disabled');
  }
  //点击保存不发送
  save_() {
    this.addSalaryDetail();
    let param = {"salaryBillId":this.salaryBillId-0,"fieldMapping":JSON.stringify(this.fieldMapping)};
    param = JSON.stringify(param);
    console.log(param);
    this.SaveOrSend.save({method:'save'},param,(success)=>{
      this.NotificationService.notify('保存成功');
    },(fail)=>{
      this.NotificationService.notify('保存失败');
    });
  }

  //点击预览并发送
  preview() {
    this.progressState = PROGRESS_START_POPUP;
    this.addSalaryDetail();
    console.log(this.fieldMapping);
  }
  //点击取消
  cancel() {
    this.progressState = PROGRESS_STATE_SEND;
  }
  //点击每个人预览详细数据
  changeUser(row){
    this.detail = row;
  }
  //点击确认并发送
  affirmAndSend() {
    let param = {"salaryBillId":this.salaryBillId,"fieldMapping":JSON.stringify(this.fieldMapping)};
    param = JSON.stringify(param);
    this.SaveOrSend.save({method:'send'},param,()=>{
      this.location.path('/payrolls/page/1');
    },()=>{
      this.NotificationService.notify('发送失败，请重试！');
    });
  }
  addSalaryDetail(){
    for(let key1 in this.fieldMapping){
      for(let key2 in this.salaryDetail){
        if (key1 == key2){
          this.fieldMapping[key1].salaryDetail= this.salaryDetail[key2];
        }
      }
    }
  }
  commonGet(){
    for(let key in this.fieldMapping){
      if (this.fieldMapping[key].mapping == 'name'){
        this.name = key;
      }else if(this.fieldMapping[key].mapping == 'mobile'){
        this.mobile = key;
      }else if(this.fieldMapping[key].mapping == 'salary'){
        this.salary = key;
      }
    }
  }
  resWelfareList() {
    return this.welfareList = [
      {img: 'http://img1.shop.10086.cn/goods/tw59wasb6gpbzeecf_170x170.png', title: '100MB通用流量券', subtitle: '流量券',tips: ['22324','qu2fsfsdf','fsdfsdfwrewrwerewr','wervdfsafewrq'],verified: false},
      {img: 'http://img1.shop.10086.cn/goods/tw59wasb6gpbzeecf_170x170.png', title: '100MB通用流量券', subtitle: '流量券',tips: ['2342343242432','wo','qu','12313123131231','我了个去'],verified: false},
      {img: 'http://img1.shop.10086.cn/goods/tw59wasb6gpbzeecf_170x170.png', title: '100MB通用流量券', subtitle: '流量券',tips: ['wo','qu'],verified: true},
      {img: 'http://img1.shop.10086.cn/goods/tw59wasb6gpbzeecf_170x170.png', title: '100MB通用流量券', subtitle: '流量券',tips: ['wo','qu'],verified: true},
      {img: 'http://img1.shop.10086.cn/goods/tw59wasb6gpbzeecf_170x170.png', title: '100MB通用流量券', subtitle: '流量券',tips: ['wo','qu'],verified: true},
    ];
  }

  /**
   * 点击卡券，传入卡券信息，打开panel
   * @param item
   */
  openBatchAddCouponPanel(item) {
    const position = this.$mdPanel.newPanelPosition().absolute().center();
    const tips = item.tips;
    const config = {
      attachTo: angular.element(document.body),
      controller: PayOffController,
      controllerAs: 'PayOff',
      disableParentScroll: this.disableParentScroll,
      template:
        `<md-card class="welfare-panel" layout="column">
          <md-card-title>
            <md-card-title-text>福利详情</md-card-title-text>
          </md-card-title>
          <md-content>
            <img src="${item.img}" class="${item.verified ? 'gray' : ''}" alt="${item.title}">
            <p class="welfare-panel-type">${item.subtitle}</p>
            <p class="welfare-panel-name">${item.title}</p>
            <ul class="welfare-panel-tips">
              <li ng-if="${tips[0] != undefined}">${tips[0]}</li>
              <li ng-if="${tips[1] != undefined}">${tips[1]}</li>
              <li ng-if="${tips[2] != undefined}">${tips[2]}</li>
              <li ng-if="${tips[3] != undefined}">${tips[3]}</li>
              <li ng-if="${tips[4] != undefined}">${tips[4]}</li>
              <li ng-if="${tips[5] != undefined}">${tips[5]}</li>
              <li ng-if="${tips[6] != undefined}">${tips[6]}</li>
              <li ng-if="${tips[7] != undefined}">${tips[7]}</li>
              <li ng-if="${tips[8] != undefined}">${tips[8]}</li>
            </ul>
          </md-content>
          <md-button class="md-raised md-primary zs-confirm-button" ng-click="PayOff.closeBatchAddCouponPanel()">确定</md-button>
        </md-card>`
      ,
      hasBackdrop: true, //是否添加遮罩层
      position: position,
      zIndex: 1000,
      clickOutsideToClose: true,
    };
    this.$mdPanel.open(config);
  }
  /**
   * 关闭panel
   */
  closeBatchAddCouponPanel() {
    this.mdPanelRef.close();
  }
}



