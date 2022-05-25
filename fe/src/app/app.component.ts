import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fe';

  control = new FormControl('');

  invalidString = '';

  copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  invalid(event: string) {
    this.invalidString = event;
    setTimeout(() => {
      this.invalidString = '';
    }, 2000);
  }
}
