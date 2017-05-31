/**
 * Created by zhangshuang on 2017/5/3.
 */
import './welfare-info.scss';
export const WelfareInfoTemplate = require('./welfare-info.html');
export class WelfareInfoController{
  constructor($mdPanel) {
    this.$mdPanel = $mdPanel;
    this.init();
  }

  init() {
    this.resWelfareInfo();
    this.welfareInfoObj = {
      title: '2017年03月福利',
      welfareCount: 2,
      receiveStaff: 92
    };
  }

  resWelfareInfo() {
    return this.welfareInfoCard = [
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
      controller: WelfareInfoController,
      controllerAs: 'welfareInfo',
      disableParentScroll: this.disableParentScroll,
      template:
        `<md-card class="welfare-panel" layout="column">
          <md-card-title>
            <md-card-title-text>福利详情</md-card-title-text>
          </md-card-title>
          <md-content>
            <img src="${item.img}" alt="${item.title}">
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
          <md-button class="md-raised md-primary zs-confirm-button" ng-click="welfareInfo.closeBatchAddCouponPanel()">确定</md-button>
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
