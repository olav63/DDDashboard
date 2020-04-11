import { Injectable } from '@angular/core';
import { GridsterConfig, GridsterItem, DisplayGrid, GridsterComponentInterface } from 'angular-gridster2';

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
    initCallback: this.initCallback,
    itemChangeCallback: this.itemChangeCallback,
    dropOverItemsCallback: this.dropOverItemsCallback,
    emptyCellDropCallback: this.emptyCellDropCallback,
    gridType: "scrollVertical",
    swap: false,
    pushItems: false,
    displayGrid: DisplayGrid.Always,
    mobileBreakpoint: 320,
    draggable: {
      enabled: true,


    },
    compactType: "none",
    minRows: 1,
    maxRows: 5,
    minCols: 1,
    maxCols: 5,
    fixedRowHeight: 120,
    fixedColWidth: 120,
    resizable: {
      enabled: false
    }
  };

  public layout: GridsterItem[] = [];
  public components: IComponent[] = [];

  // addCount: number = 0;
  // deleteCount: number = 0;
  // userAgent: DeviceInfo;
  dropId: string;

  constructor() {
    const positions: Position[] = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }];
    this.initLayout(positions);
  }

  initCallback() {
    const bp: boolean = true;
  }

  itemChangeCallback(item: GridsterItem) {
    item.id = "[" + item.x.toString() + ", " + item.y.toString() + "]"
  }

  emptyCellDropCallback(event: MouseEvent, item: GridsterItem) {
    const bp: boolean = true;
  }

  dropOverItemsCallback(sourceItem: GridsterItem, targetItem: GridsterItem) {
    const bp: boolean = true;
  }

  addItem(appId: string, x: number, y: number): void {
    // this.addCount++;
    this.layout.push({
      cols: 1,
      rows: 1,
      x: x,
      y: y,
      appId: appId
    });
    localStorage.setItem("app-id", appId);
  }

  initLayout(positions: Position[]) {
    positions.forEach(position => {
      this.layout.push({
        cols: 1,
        rows: 1,
        id: "[" + position.x.toString() + ", " + position.y.toString() + "]",
        x: position.x,
        y: position.y
      });
    });
  }

  deleteItem(id: string): void {
    // this.deleteCount++;
    const item = this.layout.find(itm => itm.id === id);
    const itemIndex = this.layout.indexOf(item);
    const newLocal = this.layout.splice(itemIndex, 1);
    const comp = this.components.find(cmp => cmp.id === id);
    const compIndex = this.components.indexOf(comp);
    this.components.splice(compIndex, 1);
  }

  setDropId(dropId: string): void {
    this.dropId = dropId;
  }

  dropItem(dragId: string): void {
    const { components } = this;
    const comp: IComponent = components.find(c => c.id === this.dropId);
    const cmpIndex = components.indexOf(comp);
    const updateIdx: number = comp ? cmpIndex : components.length;
    const item = this.layout.find(itm => itm.c === this.dropId);
    const componentItem: IComponent = {
      pos: item ? (item.x && item.y ? { x: item.x, y: item.y } : null) : null,
      id: this.dropId,
      componentRef: dragId
    };
    this.components = Object.assign([], this.components, { [updateIdx]: componentItem });
  }

  getComponentRef(id: string): string {
    const comp = this.components.find(c => c.id === id);
    return comp ? comp.componentRef : null;
  }
}
