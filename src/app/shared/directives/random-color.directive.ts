import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRandomColor]',
})
export class RandomColorDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      this.getRandomColor()
    );
  }

  private getRandomColor(): string {
    const colors = ['#FFC107', '#03A9F4', '#4CAF50', '#F44336', '#9C27B0'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
}
