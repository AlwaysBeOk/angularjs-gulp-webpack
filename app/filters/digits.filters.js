export default /* @ngInject */ function () {
  return function (numbers) {
    return (numbers + '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  };
}
