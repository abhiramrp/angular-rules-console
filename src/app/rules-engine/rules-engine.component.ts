import { Component, OnInit } from '@angular/core';
import { Engine } from 'json-rules-engine';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JSONRulesService } from '../services/jsonrules.service';

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

  constructor(private jsonRulesService: JSONRulesService) {
  }

  /*

  ngOnInit() {
    this.jsonRulesService.getRules().subscribe((rules) => {
      rules.forEach((rule: any) => this.engine.addRule(rule));
    });

    this.engine.addOperator(
      'almostPalindrome',
      (factValue: string, jsonValue: boolean) => {
        return (
          this.jsonRulesService.isAlmostPalindrome(factValue) === jsonValue
        );
      }
    );
  }
  */ 

  ngOnInit() {
  }

  onSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedItem = target.value;
    this.inputs = this.getInputsForItem(this.selectedItem);
    this.output = "";
  }

  getInputsForItem(item: string): any[] {
    // Define different input structures for each item here
    switch (item) {
      case 'Date Calculator':
        return [{ label: "L: ", type: 'text', placeholder: 'Input 1' }];
      case 'Text Similarity':
        return [
          { label: "L: ", type: 'text', placeholder: 'Text 1' },
          { label: "L: ", type: 'text', placeholder: 'Text 2' },
        ];
      case 'Geolocation Identification':
        return [
          { label: "L: ", type: 'number', placeholder: 'Input 3' },
          { label: "L: ", type: 'text', placeholder: 'Input 3 Text' },
        ];
      case 'Almost Palindrome':
        return [{ label: "Enter Palindrome: ", type: 'text', placeholder: 'Text' }];
      case 'Language Detection':
        return [{ label: "L: ", type: 'text', placeholder: 'Input 5' }];
      case 'Traffic Predictor':
        return [{ label: "L: ", type: 'text', placeholder: 'Input 6' }];

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
        return await this.jsonRulesService.operatorTextSimilarity(
          inputs[0].value,
          inputs[1].value
        );
      case 'Geolocation Identification':
        return `Executed action for ${item} with inputs: ${inputs[0].value}, ${inputs[1].value}`;
      case 'Almost Palindrome':
        return await this.jsonRulesService.operatorAlmostPalindrome(inputs[0].value);
      case 'Language Detection':
        return `Executed action for ${item} with input: ${inputs[0].value}`;
      case 'Traffic Predictor':
        return `Executed action for ${item} with input: ${inputs[0].value}`;
      default:
        return 'No action defined';
    }
  }

}
