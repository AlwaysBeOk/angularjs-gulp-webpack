/**
 * Created by pangguitao on 2017/3/21.
 */
import './permission.scss';

export const PermissionTemplate = require('./permission.html');

export class PermissionController {

  constructor($mdDialog) {
    this.names = ["cendy","kiddy","marking","lissis","john","dsdds"];
    this.data = [];
    this.$mdDialog = $mdDialog;
  }
  submitPermission($ev) {
    this.$mdDialog.show(
      this.$mdDialog.alert()
        .clickOutsideToClose(true)
        .title('成功')
        .textContent('权限设置成功')
        .ariaLabel('Alert Dialog Demo')
        .ok('确认')
        .targetEvent($ev)
    );
  }
}
