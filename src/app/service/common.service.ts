import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';

@Injectable()
export class CommonService {
  special = 0;
  promise = 0;
  /*商标模块搜索*/
  brandSearch = '';
  mid = 1;
  /*失信人模块搜索*/
  promiseSearch = '';

  editNoteId = 0;
  attentionId = 1;
  groupId = 0;

  subject = new Subject<string>();
  subjectPromise = new Subject<string>();
  subjectMonitor = new Subject();
  subjectNote = new Subject();
  subjectAttention = new Subject();
  subjectGroup = new Subject();

  constructor(private http: HttpClient) {

  }

  register(username: string, mail: string, password: string) {
    const url = environment.apiUrl + 'register';
    return this.http.post(url, {username: username, mail: mail, password: password}).toPromise();
  }

  getEnterpriseGraphById(id) {
    const url = environment.apiUrl + 'enterprisegraph';
    const params = {id: id.toString()};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  getInvestmentGraphById(id) {
    const url = environment.apiUrl + 'investmentgraph';
    const params = {id: id.toString()};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  getAssociationGraphById(id) {
    const url = environment.apiUrl + 'associationgraph';
    const params = {id: id.toString()};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  getEquityStructureGraphById(id) {
    console.log(id);
    const url = environment.apiUrl + 'equitystructuregraph';
    const params = {id: id.toString()};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  getSecondEquityStructureGraphById(id) {
    const url = environment.apiUrl + 'secondequitystructuregraph';
    const params = {id: id.toString()};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  getCompanyShortInfoByKey(key: string) {
    const url = environment.apiUrl + 'companyShortInfo';
    const params = {key: key};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  getBossGraphById(id) {
    const url = environment.apiUrl + 'bossgraph';
    const params = {id: id.toString()};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  /*老板信息*/
  getBossInfoById(id) {
    const url = environment.Url + 'bossinfo';
    const params = {id: id};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  getBossId(name) {
    const url = environment.Url + 'bossid';
    const params = {name: name};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  getMultipleAssociationGraph(nodes) {
    const url = environment.apiUrl + 'multipleAssociationGraph';
    const params = {nodes: nodes};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  getHintCompany(name) {
    const url = environment.apiUrl + 'hintcompany';
    const params = {name: name};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  getHintBoss(id) {
    const url = environment.apiUrl + 'hintboss';
    const params = {id: id};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  getSearchHint(key, kind) {
    const url = environment.apiUrl + 'searchhint';
    const params = {key: key, kind: kind};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  /*法律诉讼信息*/
  getLegalactionInfo(id) {
    const url = environment.apiUrl + 'legalaction';
    const params = {id: id};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  /*经营状况信息*/
  getOperatingConditions(id) {
    const url = environment.apiUrl + 'operatingconditions';
    const params = {id: id};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  /*热门推荐*/
  getNews() {
    const url = environment.apiUrl + 'news';
    return this.http.get(url).toPromise();
  }

  /*热门推荐详细信息*/
  getNewsInfo(info) {
    const url = environment.apiUrl + 'newsbody';
    const params = {url: info};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  /*专利查询-商标*/
  getBrand(name) {
    const url = environment.apiUrl + 'searchbrand';
    const params = {key: name};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  /*专利查询-商标详细信息*/
  getBrandInfo(id) {
    console.log('商标id：' + id);
    const url = environment.apiUrl + 'brandbody';
    const params = {id: id};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  /*专利查询-失信人*/
  getLostPro(name) {
    const url = environment.apiUrl + 'searchlosecredit';
    const params = {key: name};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  /*专利查询-失信人详细信息*/
  getLostProInfo(id) {
    const url = environment.apiUrl + 'losecreditbody';
    const params = {id: id};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  map = new Map();
  filterSubject = new Subject();

  changePas(id, oldPas, newPas) {
    const url = environment.Url + 'changePas';
    const params = {id: id, oldPas: oldPas, newPas: newPas};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  /*监控公司*/
  getMonitorCompany(uid) {
    const url = environment.Url + 'monitors';
    const params = {uid: uid};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  selectMonitor(monitor) {
    const url = environment.Url + 'selectMonitor';
    return this.http.post(url, monitor).toPromise();
  }

  addMonitor(monitor) {
    const url = environment.Url + 'addMonitor';
    return this.http.put(url, monitor).toPromise();
  }

  cancelMonitor(id) {
    const url = environment.Url + 'cancelMonitor/' + id;
    return this.http.delete(url).toPromise();
  }

  /*笔记*/
  getNotes(uid) {
    const url = environment.Url + 'notes';
    const params = {uid: uid};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  deleteNote(id) {
    const url = environment.Url + 'deleteNote/' + id;
    return this.http.delete(url).toPromise();
  }

  updateNote(note) {
    const url = environment.Url + 'updateNote';
    return this.http.put(url, note).toPromise();
  }

  getNote(id) {
    const url = environment.Url + 'getNote';
    const params = {id: id};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  getCompanyNotes(note) {
    const url = environment.Url + 'getCompanyNotes';
    return this.http.post(url, note).toPromise();
  }

  addNote(note) {
    const url = environment.Url + 'addNote';
    return this.http.put(url, note).toPromise();
  }

  /*关注*/
  getGroups() {
    const url = environment.Url + 'groups';
    return this.http.get(url).toPromise();
  }

  updateGroup(group) {
    const url = environment.Url + 'updateGroup';
    return this.http.put(url, group).toPromise();
  }

  deleteGroup(id) {
    const url = environment.Url + 'deleteGroup/' + id;
    return this.http.delete(url).toPromise();
  }

  addGroup(group) {
    const url = environment.Url + 'addGroup';
    return this.http.put(url, group).toPromise();
  }

  updateAttention(attention) {
    const url = environment.Url + 'updateAttention';
    return this.http.put(url, attention).toPromise();
  }

  getAttentionCompany(uid, type) {
    console.log(type);
    const url = environment.Url + 'attentions';
    const params = {uid: uid, type: type};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  deleteAttention(id) {
    const url = environment.Url + 'deleteAttention/' + id;
    return this.http.delete(url).toPromise();
  }

  selectAttention(attention) {
    const url = environment.Url + 'selectAttention';
    return this.http.post(url, attention).toPromise();
  }

  addAttention(attention) {
    console.log('1233');
    console.log(attention);
    const url = environment.Url + 'addAttention';
    return this.http.put(url, attention).toPromise();
  }

  /*消息*/
  getMessages(uid) {
    const url = environment.Url + 'getMessages';
    const params = {uid: uid};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

}
