export class Patent {
  name: string;
  applicantNum: string;
  publicantNum: string;
  category: string;
  requestDate: string;
  inventor: string;
  applicant: string;
}

let PATENT: Patent[] = [
  {
    name: '包装箱（<em>小米</em>）',
    applicantNum: 'CN201330350602.6',
    publicantNum: 'CN302686412S',
    category: '外观设计',
    requestDate: '2013-12-18',
    inventor: '王子壮',
    applicant: '翼城县隆化小米专业合作社'
  }, {
    name: '电视盒(<em>小米</em>二)',
    applicantNum: 'CN201430019888.4',
    publicantNum: 'CN302943753S',
    category: '外观设计',
    requestDate: '2014-09-17',
    inventor: '程兆鹏 于杰 王川',
    applicant: '小米科技有限责任公司'
  }, {
    name: '纸包装袋（<em>小米</em>）',
    applicantNum: 'CN201330350638.4',
    publicantNum: 'CN302686580S',
    category: '外观设计',
    requestDate: '2013-12-18',
    inventor: '王子壮',
    applicant: '翼城县隆化小米专业合作社'
  }, {
    name: '包装箱（石碾<em>小米</em>）',
    applicantNum: 'CN201330350571.4',
    publicantNum: 'CN302686411S',
    category: '外观设计 ',
    requestDate: '2013-12-18',
    inventor: '王子壮',
    applicant: '翼城县隆化小米专业合作社'
  }, {
    name: '醋壶（桃花春<em>小米</em>醋）',
    applicantNum: 'CN201330522185.9',
    publicantNum: 'CN302828965S',
    category: '外观设计',
    requestDate: '2014-05-28',
    inventor: '郭向东',
    applicant: '山西桃花春小米醋业有限公司'
  }, {
    name: '行车记录仪(车<em>小米</em>)',
    applicantNum: 'CN201530522262.X',
    publicantNum: 'CN303677339S',
    category: '外观设计',
    requestDate: '2016-05-18',
    inventor: '沈奇峰',
    applicant: '深圳车小米智能网络科技有限公司'
  }, {
    name: '<em>小米</em>挂面',
    applicantNum: 'CN201210031797.2',
    publicantNum: 'CN102550949A',
    category: '发明公布',
    requestDate: '2012-07-11',
    inventor: '张嘉文 李萍 姜龙波 张文兴 杨斌 杜文娟',
    applicant: '山西省农业科学院谷子研究所'
  }, {
    name: '<em>小米</em>油茶',
    applicantNum: 'CN200710055124.X',
    publicantNum: 'CN101120755A',
    category: '发明公布',
    requestDate: '2008-02-13',
    inventor: '毕根',
    applicant: '毕根'
  }, {
    name: '<em>小米</em>面条',
    applicantNum: 'CN200710071746.1',
    publicantNum: 'CN101190009A',
    category: '发明公布',
    requestDate: '2008-06-14',
    inventor: '尹洪全',
    applicant: '尹洪全'
  }, {
    name: '<em>小米</em>饮料',
    applicantNum: 'CN201510645810.7',
    publicantNum: 'CN106562137A',
    category: '发明公布',
    requestDate: '2017-04-19',
    inventor: '焦秀英',
    applicant: '青岛莹辉达通化工科技有限公司'
  }
];

export default PATENT;
