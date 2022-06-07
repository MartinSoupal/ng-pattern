import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import {
  AbstractControl,
  NgControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[ngPattern]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PatternDirective, multi: true },
  ],
})
export class PatternDirective implements OnInit, OnDestroy, Validator {

  @Input()
  set ngPattern(value: string) {
    this._RegExp = new RegExp(value);
    this._onChange();
  }

  @Input() ngPatternStrict = false;

  @Output() ngPatternInvalid = new EventEmitter<string>();

  private set subs(value: () => void) {
    this._subs.push(value);
  }

  private _subs: Array<() => void> = [];
  private onFocusSub: () => void = () => null;

  private _RegExp = new RegExp('');
  private _onChange: () => void = () => null;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.onFocusSub = this.renderer.listen(this.elementRef.nativeElement, 'focus', this.onFocus);
  }

  private onFocus = () => {
    this.subs = this.renderer.listen(
      this.elementRef.nativeElement,
      'beforeinput',
      this.onBeforeinput
    );
    this.subs = this.renderer.listen(
      this.elementRef.nativeElement,
      'blur',
      this.onBlur
    );
  };

  private onBeforeinput = (event: InputEvent) => {
    if (event.data !== null) {
      const newValue = `${this.elementRef.nativeElement.value}${
        event.data || ''
      }`;
      if (!this._RegExp.test(newValue)) {
        this.ngPatternInvalid.emit(newValue);
        if (this.ngPatternStrict) {
          event.preventDefault();
        }
      }
    }
  };

  private onBlur = () => {
    this.unsubscribeOnBlur();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this._RegExp.test(control.value) || control.value === ''
      ? null
      : { ngPattern: true };
  }

  registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }

  private unsubscribeOnBlur() {
    this._subs.forEach(
      sub => sub(),
    );
  }

  private unsubscribeAll() {
    this._subs.forEach(
      sub => sub(),
    );
    this.onFocusSub();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }
}
