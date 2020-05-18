import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  animations: [
    trigger('showHide', [
      state('visible', style({opacity: 1})),
      state('invisible', style({opacity: 0})),
      transition('* => invisible', [
        animate('500ms ease-in')
      ]),
      transition('* => visible', [
        style({opacity: 0}),
        animate('500ms ease-out')
      ])
    ])
  ]
})

export class TileComponent implements OnInit {
  @Input() id: string;
  @Input() color: string;
  @Input() x: number;
  @Input() y: number;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  vanish = false;
  
  constructor() { }

    ngOnInit(): void {
  }

  onShowHide(event: any) {
    const triggerName = `${event.triggerName}`;
    const triggerPhase = `${event.phaseName}`;
    const toState = `${event.toState}`;
    console.warn('### ' + triggerName + ' -> ' + triggerPhase);
    console.warn(`### From State: ${event.fromState}`);
    console.warn(`### To State: ${event.toState}`);
    console.warn(`### Total Time: ${event.totalTime}`);
    if(toState === 'invisible' && triggerPhase === 'done') {
      this.doRemove();
    } else if (toState === 'visible') {
      const bp = true;
    }
  }

  remove() {
    this.vanish = true;
  }

  doRemove() {
    this.delete.emit(null);
  }

  getReadableId(): string {
    return this.id.substring(0, 4);
  }

  getColor() {
    return this.color;
  }
}
