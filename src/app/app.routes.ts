import { Routes } from '@angular/router';
import { RulesEngineComponent } from './rules-engine/rules-engine.component';



export const routes: Routes = [
    {
        path: 'json-rules-engine',
        title: 'JSON Rules Engine',
        component: RulesEngineComponent,
    }
];
