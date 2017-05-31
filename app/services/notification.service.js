/**
 * Created by cloverzero on 2017/4/10.
 */


export default class NotificationService {
  /* @ngInject */
  constructor($mdToast) {
    this.$mdToast = $mdToast;
  }
  notify(message) {
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent(message)
        .position("bottom right")
        .hideDelay(3000)
    );
  }
}
