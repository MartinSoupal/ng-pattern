import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'fe';

  control = new FormControl('');
  patternControl = new FormControl('');

  invalidString = '';
  pattern: string = '';
  strictControl = new FormControl('');

  ngOnInit(): void {
    this.strictControl.valueChanges.subscribe(
      (value) => {
        if (value && this.control.invalid) {
          this.control.setValue('');
        }
      }
    )
  }

  usePattern(pattern: string) {
    this.patternControl.setValue(pattern);
    if (this.strictControl.value) {
      this.control.setValue('');
    }
  }

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
