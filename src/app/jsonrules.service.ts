import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Engine } from 'json-rules-engine';

@Injectable({
  providedIn: 'root',
})

export class JSONRulesService {
  private rulesUrl = 'assets/rules.json';
  private engine: Engine;

  constructor(private http: HttpClient) {
    this.engine = new Engine();
  }

  // ADDING JSON OPERATORS

  private getRules(rulesUrl: string): Observable<any> {
    return this.http.get<any>(rulesUrl);
  }

  private addPalindromeOperator() {
    this.getRules("assets/operators/almostPalindrome.json").subscribe((rules) => {
      rules.forEach((rule: any) => this.engine.addRule(rule));
    });

    this.engine.addOperator(
      'almostPalindrome',
      (factValue: string, jsonValue: boolean) => {
        return (
          this.isAlmostPalindrome(factValue) === jsonValue
        );
      }
    );

  }


  // OPERATOR LOGIC

  private isAlmostPalindrome(str: string): boolean {
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


  // OPERATORS

  operatorTextSimilarity(text1: string, text2: string): Promise<string | undefined> {
    const lowerText1 = text1.toLowerCase();
    const lowerText2 = text2.toLowerCase();

    const words1 = lowerText1.split(' ');
    const words2 = lowerText2.split(' ');

    const intersection = words1.filter((word) => words2.includes(word)).length;
    const union = new Set([...words1, ...words2]).size;

    const similarity = (intersection / union) * 100;

    const facts = { similarity };

    return new Promise((resolve, reject) => {
      this.engine
        .run(facts)
        .then((results) => {
          let message: string | undefined = undefined;
          results.events.map((event) => {
            message = event.params?.['message'];
          });
          resolve(message); // Resolve the promise with the message
        })
        .catch((error) => {
          console.log(error);
          reject(error); // Reject the promise in case of an error
        });
    });
  }

  operatorAlmostPalindrome(palindromeString: string): Promise<string | undefined> {
    this.addPalindromeOperator();

    const facts = { palindromeString };

    return new Promise((resolve, reject) => {
      this.engine
        .run(facts)
        .then((results) => {
          let message: string | undefined = undefined;
          message = results.events.length
            ? results.events[0].params?.['message']
            : 'Not an almost palindrome';
          resolve(message);
        })
        .catch((error) => {
          console.log(error);
          reject(error); // Reject the promise in case of an error
        });
    });
  }







}
