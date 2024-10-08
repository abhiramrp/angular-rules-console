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
    this.addTextSimilarityOperator();  // Initialize the text similarity operator
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

  // ADDING TEXT SIMILARITY OPERATOR

  private addTextSimilarityOperator() {
    this.getRules("assets/operators/textsimilarity.json").subscribe((rules) => {
      this.engine.addRule(rules);
    });

    this.engine.addOperator('textSimilarity', (factValue: any, jsonValue: number) => {
      const similarity = this.calculateTextSimilarity(factValue.text1, factValue.text2);
      return similarity >= jsonValue;
    });
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



 private calculateTextSimilarity(text1: string, text2: string): number {
   // Normalize the input
   const normalize = (text: string) => text.toLowerCase().replace(/[^\w\s]/g, '').trim();

   const normalizedText1 = normalize(text1);
   const normalizedText2 = normalize(text2);

   // Use character-level comparison for short texts
   if (normalizedText1.length <= 10 || normalizedText2.length <= 10) {
     const length1 = normalizedText1.length;
     const length2 = normalizedText2.length;
     const maxLength = Math.max(length1, length2);
     let matchCount = 0;

     for (let i = 0; i < Math.min(length1, length2); i++) {
       if (normalizedText1[i] === normalizedText2[i]) {
         matchCount++;
       }
     }

     return (matchCount / maxLength) * 100;
   }

   // Use word-level comparison for longer texts
   const words1 = normalizedText1.split(/\s+/);
   const words2 = normalizedText2.split(/\s+/);

   const wordSet = new Set([...words1, ...words2]);
   let matchCount = 0;

   wordSet.forEach((word) => {
     const count1 = words1.filter(w => w === word).length;
     const count2 = words2.filter(w => w === word).length;
     matchCount += Math.min(count1, count2);
   });

   const maxWords = Math.max(words1.length, words2.length);
   return (matchCount / maxWords) * 100;
 }


  // OPERATORS

operatorTextSimilarity(text1: string, text2: string): Promise<string | undefined> {
  const similarity = this.calculateTextSimilarity(text1, text2); // Calculate similarity percentage
  const facts = { texts: { text1, text2 }, similarity }; // Include similarity in the facts

  return new Promise((resolve, reject) => {
    this.engine
      .run(facts)
      .then((results) => {
        let message: string | undefined = `The texts are not similar. Similarity: ${similarity.toFixed(2)}%`; // Default message with similarity

        if (results.events.length > 0) {
          message = `${results.events[0].params?.['message']} Similarity: ${similarity.toFixed(2)}%`;
        }

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
          let message: string | undefined = 'Not an almost palindrome';

          if (results.events.length > 0) {
            message = results.events[0].params?.['message'];
          }

          resolve(message);
        })
        .catch((error) => {
          console.log(error);
          reject(error); // Reject the promise in case of an error
        });
    });
  }
compareDates(date1: string, date2: string): Promise<any> {
    return this.http.post('http://localhost:3000/compareDates', { date1, date2 }).toPromise();
}

convertTimeZone(date: string, timezone: string): Promise<any> {
    return this.http.post('http://localhost:3000/convertTimeZone', { date, timezone }).toPromise();
}

convertDateFormat(date: string, format: string): Promise<any> {
    return this.http.post('http://localhost:3000/convertDateFormat', { date, format }).toPromise();
}
}


