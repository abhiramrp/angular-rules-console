# AngularRulesConsole

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

# Adding an Operator to JSON Rules Engine
1. Add your rules to the JSON file [rules.json](public/assets/rules.json). 
2. Edit the inputs at `getInputsForItem()` function in [rules-engine.component.ts](src/app/rules-engine/rules-engine.component.ts). 
3. Write a function for your opeator. Use `Text Similarity` Operator for reference. 
4. Call your operator function in `performAction()` function cases. 
