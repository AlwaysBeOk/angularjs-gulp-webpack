import angular from 'angular';
import 'angular-animate';
import 'angular-resource';
import 'angular-route';
import 'angular-aria';
import 'angular-material';
import 'angular-messages';
import 'angular-material-data-table';

import {RootController } from './views/root.ctrl';
import {HomepageController, HomepageTemplate } from './views/homepage/homepage.ctrl';
import {PayrollsListController, PayrollsListTemplate } from './views/payrolls-list/payrolls-list.ctrl';
import {PayrollsManagementController, PayrollsManagementTemplate} from './views/payrolls-management/payrolls-management.ctrl';
import {EnterpriseInformationController, EnterpriseInformationTemplate} from './views/enterprise-information/enterprise-information.ctrl';
import {PayOffController,PayOffTemplate} from './views/pay-off/pay-off.ctrl';
import {SettingsController, SettingsTemplate } from './views/settings/settings.ctrl';
import {PermissionController, PermissionTemplate} from './views/permission/permission.ctrl';
import {TransferController, TransferTemplate} from './views/permission-transfer/permission-transfer.ctrl';
import {WaitingDisposeController, WaitingDisposeTemplate} from './views/waiting-dispose/waiting-dispose.ctrl';
import {SyncListController,SyncListTemplate} from './views/sync-list/sync-list.ctrl';
import {InstructionsController, InstructionsTemplate} from './views/instructions/instructions.ctrl';
import {CommonProblemsController, CommonProblemsTemplate} from './views/common-problems/common-problems.ctrl';
import {AboutController } from './views/about/about.ctrl';
import {WelfareManagerTemplate, WelfareManagerController} from './views/welfare-manager/welfare-manager.ctrl';
import {WelfareInfoTemplate, WelfareInfoController} from './views/welfare-info/welfare-info.ctrl';


import Payroll from './services/payroll.resource';
import PayrollDetail from './services/payroll_detail.resource';
import Company from './services/company.resource';
import SaveOrSend from './services/saveOrSend.resource';
import SalaryBillIdDelete from './services/salarybillDelete.resource';
import Compile from './services/compile.resource';
import DictService from './services/dict.service';
import Payroll_ from './services/payroll_.resource';
import CheckDetail from './services/checkdetail.resource';
import Search from './services/search.resource';
import recallOrSend from './services/recallOrSend.ctrl';
import NotificationService from './services/notification.service';

import DigitFilter from './filters/digits.filters';
import Payroll_detail from './filters/payroll_details.filters';

const appModule = angular
  .module('payroll', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngMaterial',
    'md.data.table',
    'ngMessages'
  ]);

appModule.controller('RootController', RootController);
appModule.controller('HomepageController', HomepageController);
appModule.controller('PayrollsListController', PayrollsListController);
appModule.controller('PayrollsManagementController', PayrollsManagementController);
appModule.controller('EnterpriseInformationController', EnterpriseInformationController);
appModule.controller('PayOffController', PayOffController);
appModule.controller('SettingsController', SettingsController);
appModule.controller('PermissionController', PermissionController);
appModule.controller('TransferController', TransferController);
appModule.controller('WaitingDisposeController',WaitingDisposeController);
appModule.controller('SyncListController', SyncListController);
appModule.controller('InstructionsController',InstructionsController);
appModule.controller('CommonProblemsController',CommonProblemsController);
appModule.controller('AboutController', AboutController);
appModule.controller('WelfareManagerController', WelfareManagerController);
appModule.controller('WelfareInfoController', WelfareInfoController);

appModule.service('DictService', DictService);
appModule.service('NotificationService', NotificationService);
appModule.factory('Payroll', Payroll);
appModule.factory('Company', Company);
appModule.factory('PayrollDetail', PayrollDetail);
appModule.factory('SaveOrSend',SaveOrSend);
appModule.factory('SalaryBillIdDelete',SalaryBillIdDelete);
appModule.factory('Compile',Compile);
appModule.factory('Payroll_',Payroll_);
appModule.factory('CheckDetail',CheckDetail);
appModule.factory('Search',Search);
appModule.factory('recallOrSend',recallOrSend);
appModule.filter('Digit', DigitFilter);
appModule.filter('Payroll_detail',Payroll_detail);

appModule.config(/* @ngInject */ function ($routeProvider) {
  $routeProvider
    .when('/', {         //首页
      template: HomepageTemplate,
      controller: 'HomepageController',
      controllerAs: 'homepage'
    })
    .when("/pay",{      //发工资条
      template:PayOffTemplate,
      controller:'PayOffController',
      controllerAs:'payOff'
    })
    .when('/payrolls/page/:page', {  //工资条管理
      template: PayrollsListTemplate,
      controller: 'PayrollsListController',
      controllerAs: '$ctrl'
    })
    /* 2.0福利 start */
    .when('/welfareManager', { //福利管理
      template: WelfareManagerTemplate,
      controller: 'WelfareManagerController',
      controllerAs: 'welfareManager'
    })
    .when('/welfareInfo', { //福利管理 》 福利详情
      template: WelfareInfoTemplate,
      controller: 'WelfareInfoController',
      controllerAs: 'welfareInfo'
    })
    /* 2.0福利 end */
    .when('/payrolls/:id/page/:page', {  //工资条管理》工资详情
      template: PayrollsManagementTemplate,
      controller: 'PayrollsManagementController',
      controllerAs: 'payrollsMgr'
    })
    .when('/welfareManager', { //福利管理
      template: WelfareManagerTemplate,
      controller: 'WelfareManagerController',
      controllerAs: 'welfareManager'
    })
    .when('/welfareInfo', { //福利管理 》 福利详情
      template: WelfareInfoTemplate,
      controller: 'WelfareInfoController',
      controllerAs: 'welfareInfo'
    })
    .when('/company', {  //企业信息
      template: EnterpriseInformationTemplate,
      controller: 'EnterpriseInformationController',
      controllerAs: "$ctrl"
    })
     .when('/set',{         //设置
       template:SettingsTemplate,
       controller:'SettingsController',
       controllerAs:"setCen"
     })
    .when('/set/1',{
      template:PermissionTemplate,
      controller:'PermissionController',
      controllerAs:'setPmn'
    })
    .when('/set/2',{
      template:TransferTemplate,
      controller:'TransferController',
      controllerAs:'transferPmn'
    })
    .when('/set/3',{
      template:WaitingDisposeTemplate,
      controller:'WaitingDisposeController',
      controllerAs:'waitingDis'
    })
    .when('/set/4',{
      template:SyncListTemplate,
      controller:'SyncListController',
      controllerAs:'syncList'
    })
     .when('/instructions', {  //使用说明
       template: InstructionsTemplate,
       controller: 'InstructionsController',
       controllerAs: 'instructions'
     })
     .when('/problems', {  //常见问题
       template: CommonProblemsTemplate,
       controller: 'CommonProblemsController',
       controllerAs: 'CommonPbm'
     })
    .otherwise({
      redirectTo: '/'
    });
});

appModule.config(/* @ngInject */ function ($mdThemingProvider) {

  $mdThemingProvider.definePalette('white', {
    '50': 'ffffff',
    '100': 'ffffff',
    '200': 'ffffff',
    '300': 'ffffff',
    '400': 'ffffff',
    '500': 'ffffff',
    '600': 'ffffff',
    '700': 'ffffff',
    '800': 'ffffff',
    '900': 'ffffff',
    'A100': 'ffffff',
    'A200': 'ffffff',
    'A400': 'ffffff',
    'A700': 'ffffff',
    'contrastDefaultColor': 'dark',
  });


  $mdThemingProvider.definePalette('sun-blue', {
    '50': 'd1edff',
    '100': 'b3e0ff',
    '200': '94d3ff',
    '300': '75c7ff',
    '400': '57baff',
    '500': '38adff',
    '600': '2091eb',
    '700': '1589d7',
    '800': '0b79c2',
    '900': '0369ae',
    'A100': '99DAFF',
    'A200': '66CCFF',
    'A400': '33B4FF',
    'A700': '0e99e9',
    'contrastDefaultColor': 'light',
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('sun-blue')
    .accentPalette('white');
});
