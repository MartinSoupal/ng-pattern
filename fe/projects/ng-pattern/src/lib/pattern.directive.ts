import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[ngPattern]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PatternDirective , multi: true}]
})
export class PatternDirective implements OnInit, Validator {
  @Input()
  set ngPattern(value: string) {
    this._RegExp = new RegExp(value);
  }

  @Input() ngPatternStrict = false;

  @Output() ngPatternInvalid = new EventEmitter<string>();

  private _RegExp = new RegExp('');

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.renderer.listen(this.elementRef.nativeElement, 'focus', this.onFocus);
  }

  onFocus = () => {
    console.log('focus');
    this.renderer.listen(this.elementRef.nativeElement, 'beforeinput', this.onBeforeinput);
  };

  onBeforeinput = (event: InputEvent) => {
    if (!this.ngPatternStrict) {
      return;
    }
    if (event.data !== null) {
      const newValue = `${this.elementRef.nativeElement.value}${event.data || ''}`;
      if (!this._RegExp.test(newValue)) {
        this.ngPatternInvalid.emit(newValue);
        event.preventDefault();
      }
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log(control.value, (this._RegExp.test(control.value)) ? null : { 'ngPattern': true });
    return (this._RegExp.test(control.value)) ? null : { 'ngPattern': true };
  }
}
