import { Component, OnInit, AfterViewInit, Input, Injectable } from '@angular/core';
import { GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';

@Component({
  selector: 'app-app-tile',
  templateUrl: './app-tile.component.html',
  styleUrls: ['./app-tile.component.scss']
})
export class AppTileComponent implements AfterViewInit, GridsterItem {
  // position: number[];

  @Injectable() position: number[];
  constructor() {
  }

  [propName: string]: any;
  x: number = this.position[0];
  y: number = this.position[0];
  rows: number;
  cols: number;
  layerIndex?: number;
  initCallback?: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
  dragEnabled?: boolean;
  resizeEnabled?: boolean;
  compactEnabled?: boolean;
  maxItemRows?: number = 0;
  minItemRows?: number = 0;
  maxItemCols?: number;
  minItemCols?: number;
  minItemArea?: number;
  maxItemArea?: number;

  ngAfterViewInit(): void {
    throw new Error("Method not implemented.");
  }
}
