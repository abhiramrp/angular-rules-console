import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JsonRulesEngineService } from '../json-rules-engine.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rules-engine',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rules-engine.component.html',
  styleUrl: './rules-engine.component.scss',
})
export class RulesEngineComponent {
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

  constructor() {}

  ngOnInit(): void {}

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
          { type: 'number', placeholder: 'Input 2' },
          { type: 'text', placeholder: 'Input 2 Text' },
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

  executeFunction() {
    if (this.selectedItem) {
      this.output = this.performAction(this.selectedItem, this.inputs);
    }
  }

  performAction(item: string, inputs: any[]): string {
    switch (item) {
      case 'Date Calculator':
        return `Executed action for ${item} with input: ${inputs[0]}`;
      case 'Text Similarity':
        return `Executed action for ${item} with inputs: ${inputs[0]}, ${inputs[1]}`;
      case 'Geolocation Identification':
        return `Executed action for ${item} with inputs: ${inputs[0]}, ${inputs[1]}`;
      case 'Almost Palindrome':
        return `Executed action for ${item} with input: ${inputs[0]}`;
      case 'Language Detection':
        return `Executed action for ${item} with input: ${inputs[0]}`;
      case 'Traffic Predictor':
        return `Executed action for ${item} with input: ${inputs[0]}`;
      default:
        return 'No action defined';
    }
  }
}
