import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngPattern]',
})
export class PatternDirective implements OnInit {
  @Input()
  set ngPattern(value: string) {
    this._RegExp = new RegExp(value);
  }

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
    if (event.data !== null) {
      const newValue = `${this.elementRef.nativeElement.value}${event.data || ''}`;
      if (!this._RegExp.test(newValue)) {
        this.ngPatternInvalid.emit(newValue);
        event.preventDefault();
      }
    }
  }
}
