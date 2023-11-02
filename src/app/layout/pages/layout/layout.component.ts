import { Component } from '@angular/core';
import { UiEventEmitter } from '@nikosoftware/core-ui/event-emitter';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.base.css', './layout.component.css'],
})
export class LayoutComponent {
  constructor(private eventEmitter: UiEventEmitter) {}

  onClick() {
    this.eventEmitter.emit('territory.new');
  }
}
