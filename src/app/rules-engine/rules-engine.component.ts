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
  timeZones: string[] = []; // Time zones array

  constructor(private jsonRulesService: JSONRulesService) {}

  ngOnInit() {
    this.populateTimeZones();
  }

  populateTimeZones() {
    this.timeZones = [
      'Africa/Abidjan', 'Africa/Accra', 'Africa/Addis_Ababa', 'Africa/Algiers',
      'America/New_York', 'America/Los_Angeles', // Add more as required...
    ];
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
        return [
          { label: 'Date 1: ', type: 'datetime-local', placeholder: 'Enter the first date', key: 'date1' },
          { label: 'Date 2: ', type: 'datetime-local', placeholder: 'Enter the second date', key: 'date2' },
          { label: 'Timezone Input: ', type: 'datetime-local', placeholder: 'Enter date for timezone conversion', key: 'timezoneInput' },
          { label: 'Timezone: ', type: 'select', options: this.timeZones, key: 'timezone' },
          { label: 'Date Format Input: ', type: 'text', placeholder: 'MM/DD/YYYY', key: 'dateFormatInput' },
          { label: 'Date Format: ', type: 'select', options: ['MM/DD/YYYY', 'DD/MM/YYYY'], key: 'dateFormat' }
        ];
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
    console.log('performAction triggered with item:', item, 'and inputs:', inputs);

    const inputValues = inputs.reduce((obj, input) => {
      obj[input.key] = input.value;
      return obj;
    }, {});

    console.log('Processed input values:', inputValues);

    let result: any;

    switch (item) {
      case 'Date Calculator':
        const date1 = inputValues.date1;
        const date2 = inputValues.date2;
        const timezoneInput = inputValues.timezoneInput;
        const timezone = inputValues.timezone;
        const dateFormatInput = inputValues.dateFormatInput;
        const dateFormat = inputValues.dateFormat;

        // Perform the desired operation based on the inputs
        if (date1 && date2) {
          result = await this.jsonRulesService.compareDates(date1, date2);
        } else if (timezoneInput && timezone) {
          result = await this.jsonRulesService.convertTimeZone(timezoneInput, timezone);
        } else if (dateFormatInput && dateFormat) {
          result = await this.jsonRulesService.convertDateFormat(dateFormatInput, dateFormat);
        } else {
          result = 'Invalid input for Date Calculator';
        }
        break;

      case 'Text Similarity':
        return await this.jsonRulesService.operatorTextSimilarity(
          inputs[0].value,
          inputs[1].value
        );

      case 'Geolocation Identification':
        result = `Executed action for ${item} with inputs: ${inputValues[0].value}, ${inputValues[1].value}`;
        break;

      case 'Almost Palindrome':
        return await this.jsonRulesService.operatorAlmostPalindrome(inputs[0].value);

      case 'Language Detection':
        result = `Executed action for ${item} with input: ${inputValues[0].value}`;
        break;

      case 'Traffic Predictor':
        result = `Executed action for ${item} with input: ${inputValues[0].value}`;
        break;

      default:
        result = 'No action defined';
        break;
    }

    // Convert result to a string if it is an object
//     if (typeof result === 'object') {
//       return JSON.stringify(result, null, 2); // Pretty-print JSON
//     } else {
//       return result;
//     }
  }

  async executeDateComparison() {
    const date1 = this.inputs[0].value;
    const date2 = this.inputs[1].value;
    if (date1 && date2) {
      const result = await this.jsonRulesService.compareDates(date1, date2);
      this.output = JSON.stringify(result, null, 2);
    } else {
      this.output = 'Please provide both dates for comparison.';
    }
  }

  async executeTimezoneConversion() {
    const timezoneInput = this.inputs[2].value;
    const timezone = this.inputs[3].value;
    if (timezoneInput && timezone) {
      const result = await this.jsonRulesService.convertTimeZone(timezoneInput, timezone);
      this.output = JSON.stringify(result, null, 2);
    } else {
      this.output = 'Please provide the input date and timezone for conversion.';
    }
  }

  async executeDateFormatConversion() {
    const dateFormatInput = this.inputs[4].value;
    const dateFormat = this.inputs[5].value;
    if (dateFormatInput && dateFormat) {
      const result = await this.jsonRulesService.convertDateFormat(dateFormatInput, dateFormat);
      this.output = JSON.stringify(result, null, 2);
    } else {
      this.output = 'Please provide the date input and select the format for conversion.';
    }
  }
}
