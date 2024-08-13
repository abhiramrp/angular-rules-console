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
1. Add your JSON rules file to [operators](public/assets/operators) directory. 
2. Edit the inputs at `getInputsForItem()` function in [rules-engine.component.ts](src/app/rules-engine/rules-engine.component.ts). 
3. In [jsonrules.service.ts](src/app/jsonrules.service.ts) file, add three functions:
    - A private method that adds operator to engine
    - A private method that holds the operator logic
    - A public method that that takes an input and returns a string Promise output.
4. Call the public operator method from `performAction` method in [rules-engine.component.ts](src/app/rules-engine/rules-engine.component.ts)

