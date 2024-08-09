import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class JSONRulesService {
  private rulesUrl = 'assets/rules.json';

  constructor(private http: HttpClient) {}

  getRules(): Observable<any> {
    return this.http.get<any>(this.rulesUrl);
  }

  isAlmostPalindrome(str: string): boolean {
    const isPalindrome = (s: string) => s === s.split('').reverse().join('');

    if (isPalindrome(str)) {
      return true;
    }

    for (let i = 0; i < str.length; i++) {
      const modifiedStr = str.slice(0, i) + str.slice(i + 1);
      if (isPalindrome(modifiedStr)) {
        return true;
      }
    }

    return false;
  }
}
