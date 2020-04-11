import { Injectable } from '@angular/core';
import { GridsterConfig, GridsterItem, DisplayGrid, GridsterComponentInterface, GridsterItemComponentInterface } from 'angular-gridster2';
import { StringDecoder } from 'string_decoder';

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
    itemChangeCallback: this.itemChangeCallback,
    gridSizeChangedCallback: this.gridSizeChangedCallback,
    gridType: "fixed",
    swap: false,
    pushItems: false,
    displayGrid: DisplayGrid.Always,
    mobileBreakpoint: 120,
    draggable: {
      enabled: true,
    },
    compactType: "none",
    minRows: 1,
    maxRows: 5,
    minCols: 1,
    maxCols: 5,
    fixedRowHeight: 100,
    fixedColWidth: 100,
    resizable: {
      enabled: false
    }
  };

  public layout: GridsterItem[] = [];
  public components: IComponent[] = [];

  dropId: string;

  constructor() {
    this.initLayout();
  }

  appExists(appId: string): boolean {
    this.layout.forEach(item => {
      if (item.appId === appId) {
        return true;
      }
    });
    return false;
  }

  itemChangeCallback(item: GridsterItem) {
    // item.id = "[" + item.x.toString() + ", " + item.y.toString() + "]"
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
    this.readFromLocalStorage();
  }

  deleteItem(id: string): void {
    const item = this.layout.find(itm => itm.appId === id);
    const itemIndex = this.layout.indexOf(item);
    const newLocal = this.layout.splice(itemIndex, 1);
    const comp = this.components.find(cmp => cmp.id === id);
    const compIndex = this.components.indexOf(comp);
    this.components.splice(compIndex, 1);
  }

  gridSizeChangedCallback(gridster: GridsterComponentInterface) {
    return gridster;
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

  saveToLocalStorage() {
    localStorage.clear();
    this.layout.forEach(item => {
      const position = this.positionToString(item.x, item.y);
      localStorage.setItem(item.appId, position);
    });
  }

  private positionToString(x: number, y: number): string {
    let result = "#x:" + x.toString() + "#y:" + y.toString();
    return result;
  }

  readFromLocalStorage() {
    this.layout.splice(0, this.layout.length);
    const localStorageSize = localStorage.length;
    for (let i = 0; i < localStorageSize; i++) {
      const appId = localStorage.key(i);
      const itemString = localStorage.getItem(appId);
      const position: number[] = this.itemStringToPosition(itemString);
      const restoredItem = {
        cols: 1,
        rows: 1,
        x: position[0],
        y: position[1],
        appId: appId
      };
      this.layout.push(restoredItem)
    }
  }

  private itemStringToPosition(itemString: string): number[] {
    const xMarker: number = itemString.search('#x:');
    const yMarker: number = itemString.search('#y:');
    const xString: string = itemString.substring(xMarker + '#x:'.length, yMarker);
    const yString: string = itemString.substr(yMarker + '#y:'.length);
    return [Number(xString), Number(yString)];
  }
}
