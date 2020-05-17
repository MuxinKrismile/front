import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';

@Injectable()
export class CompanyService {
  subject = new Subject();
  subjectHaveAttention = new Subject();

  constructor(private http: HttpClient) {
  }

  getBasicInfo(id) {
    const url = environment.apiUrl + 'companyinfo';
    const params = {id: id};
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  getSubject() {
    return this.subject;
  }

  get cid() {
    if (localStorage.getItem('cid') != null) {
      return localStorage.getItem('cid');
    } else {
      return 1;
    }
  }

  get bid() {
    if (localStorage.getItem('bid') != null) {
      return localStorage.getItem('bid');
    } else {
      return 1;
    }
  }

}
