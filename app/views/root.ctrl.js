import './root.scss';
import 'angular-material/angular-material.scss';
import 'material-design-icons-iconfont/dist/material-design-icons.scss';
import 'angular-material-data-table/dist/md-data-table.css';

const AGENT_WEB = "Agent-WEB";
const AGENT_DD = "Agent-DD";
export class RootController {
  /*@ngInject*/
  constructor($location) {
    // this.code = $location.absUrl().split('?')[1].split('=')[1];
    this.agent_type = AGENT_WEB ;
    this.content = 'web';
    this.flog = true;  //判断在什么浏览器中打开，进行样式变更
    if(this.flog){
      this.agent_type = AGENT_WEB;
      this.content = 'web';
    }else{
      this.agent_type = AGENT_DD;
      this.content = 'dd';
    }
  }





}
//console.log(DingTalkPC.ua)
//引入钉钉桌面端JSAPI后可直接获取
/*
 {
 isDesktop: true, //是否在桌面端
 isInDingTalk: true, //页面是否在钉钉网页端，windows端，mac端 的工作模块容器内显示
 isWeb: false, //是否是网页端
 isWin: true, //是否是windows客户端
 isMac: true, //是否是mac客户端
 hostVersion : '3.1.0' //当前客户端版本
 language : 'zh_CN' //当前客户端的语言设置，当前值可能是："zh_CN","zh_TW","en_US"（注意：需具备jsapi 2.6.0版本以上，客户端版本3.3.0以上才能检测出到此字段， 当客户端版本低于3.3.0，而jsAPI使用了2.6.0,则此字段值为 “*” ）
 }
 */
