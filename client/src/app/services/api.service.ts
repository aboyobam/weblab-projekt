import { Injectable } from '@angular/core';

const API_URL = '/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  get<T = any>(path: string): Promise<T> {
    return fetch(API_URL + path).then(res => res.json()).catch(() => ({ success: false, error: "Etwas ist schiefgelaufen" }));
  }

  post<T = any>(path: string, body: any): Promise<T> {
    return fetch(API_URL + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(res => res.json()).catch(() => ({ success: false, error: "Etwas ist schiefgelaufen" }));;
  }
}
