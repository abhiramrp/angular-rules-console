import { Routes } from '@angular/router';

import { RulesComponentComponent } from './rules-component/rules-component.component';

export const routes: Routes = [
    {
        path: 'json-rules-engine',
        title: 'JSON Rules Engine',
        component: RulesComponentComponent,
    }
];
