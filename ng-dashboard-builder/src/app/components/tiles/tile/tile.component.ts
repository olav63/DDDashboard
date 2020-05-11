import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})

export class TileComponent implements OnInit {
  @Input() id: string;
  @Input() x: number;
  @Input() y: number;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

    ngOnInit(): void {
  }

  remove() {
    this.delete.emit(null);
  }

  getReadableId(): string {
    return this.id.substring(0, 4);
  }
}
