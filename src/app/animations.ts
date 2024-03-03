import { animate, style, transition, trigger } from "@angular/animations";

export const toggle = trigger('fadeSlideInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-10px)' }),
    animate(200, style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate(200, style({ opacity: 0, transform: 'translateY(-10px)' }))
  ])
]);
