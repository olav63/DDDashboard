import { Injectable } from '@angular/core';
import { GridsterConfig, GridsterItem, DisplayGrid, GridsterComponentInterface, GridsterItemComponentInterface, GridsterComponent } from 'angular-gridster2';
import { LocalStorageServiceService } from './local-storage.service';

export interface IComponent {
  pos: Position,
  id: string;
  componentRef: string;
}

interface Position {
  x: number,
  y: number
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public options: GridsterConfig = {
    gridType: "fixed",
    swap: false,
    pushItems: false,
    displayGrid: DisplayGrid.Always,
    mobileBreakpoint: 120,
    draggable: {
      enabled: true,
    },
    compactType: "none",
    minRows: 0,
    maxRows: 5,
    minCols: 0,
    maxCols: 5,
    margin: 5,
    fixedRowHeight: 100,
    fixedColWidth: 100,
    resizable: {
      enabled: false
    }
  };

  public layout: GridsterItem[] = [];

  dropId: string;
  gridRowCount: number;
  gridColumnCount: number;

  constructor(private localStorageService: LocalStorageServiceService) {
    this.initLayout();
  }

  addItem(appId: string, x: number, y: number): void {
    this.layout.push({
      cols: 1,
      rows: 1,
      x: x,
      y: y,
      appId: appId
    });
  }

  initLayout() {
    this.gridRowCount = 0;
    this.gridColumnCount = 0;
    this.readFromLocalStorage();
  }

  deleteItem(id: string): void {
    const item = this.layout.find(itm => itm.appId === id);
    const itemIndex = this.layout.indexOf(item);
    const newLocal = this.layout.splice(itemIndex, 1);
  }

  saveToLocalStorage() {
    this.localStorageService.saveToLocalStorage(this.layout);
  }

  readFromLocalStorage() {
    this.layout = this.localStorageService.readFromLocalStorage();
  }
}
