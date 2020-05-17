import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {
  }

  search2(key: string, kind: number, sort: number) {
    const url = environment.apiUrl + 'search';
    const params = new HttpParams().set('key', key).append('kind', kind.toString()).append('sort', sort.toString());
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  search(key: string, kind: number) {
    const url = environment.apiUrl + 'search';
    const params = new HttpParams().set('key', key).append('kind', kind.toString());
    const options = {params: params};
    return this.http.get(url, options).toPromise();
  }

  getInterestedPeople() {
    const url = environment.apiUrl + 'interestedpeople';
    return this.http.get(url).toPromise();
  }
}
