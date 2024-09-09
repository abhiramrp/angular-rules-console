import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RulesEngineComponent } from "./rules-engine/rules-engine.component";
import { TessComponent } from "./tess/tess/tess.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RulesEngineComponent, TessComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-rules-console';
}
