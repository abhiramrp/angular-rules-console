import { Component } from '@angular/core';
import { JsonRulesEngineService } from '../json-rules-engine.service';

@Component({
  selector: 'app-rules-engine',
  standalone: true,
  imports: [],
  templateUrl: './rules-engine.component.html',
  styleUrl: './rules-engine.component.scss'
})

export class RulesEngineComponent {
  // result: string; 

  constructor(private engineService: JsonRulesEngineService) {}



}
