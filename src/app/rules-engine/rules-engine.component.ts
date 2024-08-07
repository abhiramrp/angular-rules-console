import { Component, OnInit } from '@angular/core';
import { Engine } from 'json-rules-engine';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JSONRulesService } from '../jsonrules.service';

@Component({
  selector: 'app-rules-engine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rules-engine.component.html',
  styleUrl: './rules-engine.component.scss',
})

export class RulesEngineComponent implements OnInit {
  // result: string;
  items: string[] = [
    'Date Calculator',
    'Text Similarity',
    'Geolocation Identification',
    'Almost Palindrome',
    'Language Detection',
    'Traffic Predictor',
  ];

  selectedItem: string | null = null;
  inputs: any[] = [];
  output: string = '';
  engine: Engine;

  constructor(private jsonRulesService: JSONRulesService) {
    this.engine = new Engine();
  }

  ngOnInit() {
    this.jsonRulesService.getRules().subscribe(rules => {
      rules.forEach((rule: any) => this.engine.addRule(rule));
    });
  }

  onSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedItem = target.value;
    this.inputs = this.getInputsForItem(this.selectedItem);
  }


  getInputsForItem(item: string): any[] {
    // Define different input structures for each item here
    switch (item) {
      case 'Date Calculator':
        return [{ type: 'text', placeholder: 'Input 1' }];
      case 'Text Similarity':
        return [
          { type: 'text', placeholder: 'Text 1' },
          { type: 'text', placeholder: 'Text 2' },
        ];
      case 'Geolocation Identification':
        return [
          { type: 'number', placeholder: 'Input 3' },
          { type: 'text', placeholder: 'Input 3 Text' },
        ];
      case 'Almost Palindrome':
        return [{ type: 'text', placeholder: 'Input 4' }];
      case 'Language Detection':
        return [{ type: 'text', placeholder: 'Input 5' }];
      case 'Traffic Predictor':
        return [{ type: 'text', placeholder: 'Input 6' }];

      default:
        return [];
    }
  }

  async executeFunction() {
    if (this.selectedItem) {
      this.output = await this.performAction(this.selectedItem, this.inputs);
    }
  }

  async performAction(item: string, inputs: any[]): Promise<any> {
    switch (item) {
      case 'Date Calculator':
        return `Executed action for ${item} with input: ${inputs[0].value}`;
      case 'Text Similarity':
        return await this.operatorTextSimilarity(inputs[0].value, inputs[1].value);
      case 'Geolocation Identification':
        return `Executed action for ${item} with inputs: ${inputs[0].value}, ${inputs[1].value}`;
      case 'Almost Palindrome':
        return `Executed action for ${item} with input: ${inputs[0].value}`;
      case 'Language Detection':
        return `Executed action for ${item} with input: ${inputs[0].value}`;
      case 'Traffic Predictor':
        return `Executed action for ${item} with input: ${inputs[0].value}`;
      default:
        return 'No action defined';
    }
  }

  operatorTextSimilarity(text1: string, text2: string): Promise<string | undefined> {
    const lowerText1 = text1.toLowerCase();
    const lowerText2 = text2.toLowerCase();

    const words1 = lowerText1.split(' ');
    const words2 = lowerText2.split(' ');

    const intersection = words1.filter(word => words2.includes(word)).length;
    const union = new Set([...words1, ...words2]).size;

    const similarity = (intersection / union) * 100;

    const facts = { similarity };

    return new Promise((resolve, reject) => {
      this.engine
        .run(facts)
        .then(results => {
          let message: string | undefined = undefined;
          results.events.map(event => {
            message = event.params?.['message'];
          });
          resolve(message); // Resolve the promise with the message
        })
        .catch(error => {
          console.log(error);
          reject(error); // Reject the promise in case of an error
        });
    });
  }

  
}
