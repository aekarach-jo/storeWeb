import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { store } from './models/Store';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }
  public getAllStore() {
    return this.http.get<store>(`${environment.apiUrl}Store/GetAllStore`)
  }
  public getStoreById(storeid: string) {
    return this.http.get<store>(`${environment.apiUrl}Store/GetStoreById/${storeid}`)
  }
  public createStore(store: store) {
    return this.http.post<store>(`${environment.apiUrl}Store/CreateStore`, store)
  }
  public editStore(storeid: string, store: store) {
    return this.http.put<store>(`${environment.apiUrl}Store/EditStore/${storeid}`, store)
  }
  public deleteStore(storeId: string) {
    return this.http.get<store>(`${environment.apiUrl}Store/DeleteStore/${storeId}`)
  }

}
