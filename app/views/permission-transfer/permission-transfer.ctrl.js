/**
 * Created by pangguitao on 2017/3/21.
 */
import './permission-transfer.scss';

export const TransferTemplate = require('./permission-transfer.html');

export class TransferController {

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
        .textContent('权限转移设置成功')
        .ariaLabel('Alert Dialog Demo')
        .ok('确认')
        .targetEvent($ev)
    );
  }
}
