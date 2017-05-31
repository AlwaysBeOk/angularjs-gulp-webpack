import './enterprise-information.scss';

export const EnterpriseInformationTemplate = require('./enterprise-information.html');

export class EnterpriseInformationController {

  /* @ngInject */
  constructor($routeParams, Company, DictService, NotificationService) {
    let id = '1490307725470';
    this.Company = Company;
    this.DictService = DictService;
    this.NotificationService = NotificationService;

    this.scaleTypes = [];
    this.businessTypes = [];
    this.company = this.Company.get({id: id});
    this.DictService.getScaleTypes().then(types => this.scaleTypes = types);
    this.DictService.getBusinessType().then(types => this.businessTypes = types);
  }

  update() {
    this.company.$update().then(() => {
      this.NotificationService.notify('更新成功');
    },() => {
      this.NotificationService.notify('更新失败，请稍候重试');
    });
  }
}

