import { Component, ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { PatternDirective } from './pattern.directive';

@Component({
  template: `<input
    formControl="control"
    type="text"
    [ngPattern]="pattern"
    [ngPatternStrict]="strict"
    (ngPatternInvalid)="invalid($event)"
  />`,
})
class TestComponent {
  control = new FormControl('');

  invalid($event: string) {
    console.log($event);
  }
}

beforeEach(() => {
  const fixture = TestBed.configureTestingModule({
    declarations: [PatternDirective, TestComponent],
  }).createComponent(TestComponent);

  fixture.detectChanges(); // initial binding
});

it('should create an instance', () => {
  expect(TestComponent).toBeTruthy();
});
