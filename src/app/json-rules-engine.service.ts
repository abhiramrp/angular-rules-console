import { Injectable } from '@angular/core';
import { Engine } from 'json-rules-engine';

@Injectable({
  providedIn: 'root'
})
export class JsonRulesEngineService {
  private engine: Engine; 

  constructor() { 
    this.engine = new Engine();


    // this.engine.addRule(rule);
  }

  async run(facts: any) {
    return this.engine.run(facts);
  }
}
