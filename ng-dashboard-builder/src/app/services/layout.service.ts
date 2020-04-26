import { Injectable } from '@angular/core';
import { DisplayGrid, GridsterConfig, GridsterItem } from 'angular-gridster2';
import { UUID } from 'angular2-uuid';
import { DeviceService } from './device.service';
import { LocalStorageServiceService } from './local-storage.service';

export const DEFAULT_TILE_SIZE = [100, 100];

@Injectable({
  providedIn: 'root'
})

export class LayoutService {
  public options: GridsterConfig;
  public layout: GridsterItem[] = [];
  
  constructor(private localStorageService: LocalStorageServiceService, private deviceService: DeviceService) {
    this.initGrid();
    this.readFromLocalStorage();
  }

  public initGrid() {
    this.options = {
      gridType:'fixed',
      swap: false,
      pushItems: false,
      compactTypes: 'compactUp&Left',
      displayGrid: DisplayGrid.Always,
      mobileBreakpoint: 120,
      draggable: {
        enabled: true
      },
      defaultItemCols: 1,
      defaultItemRows: 1,
      margin: 0,
      resizable: {
        enabled: false
      },
      itemChangeCallback: this.itemChangeCallback.bind(this)
    }
    if (this.deviceService.isMobile()) {
      this.initMobileGrid();
    } else if (this.deviceService.isTablet()) {
      this.initTabletGrid();
    } else {
      this.initDesktopGrid();
    }
  }

  private initTabletGrid() {
    this.initHandHeldGrid();
    // this.options.pushItems = true;
  }

  private initHandHeldGrid() {
    const availableMaxCols = this.deviceService.getScreenWidth() / DEFAULT_TILE_SIZE[0];
    this.options.maxCols = Math.floor(availableMaxCols);
    this.options.fixedColWidth = this.deviceService.getScreenWidth() / this.options.maxCols;
    this.options.fixedRowHeight = this.options.fixedColWidth;
    this.options.margin = this.options.fixedColWidth / 2;
    this.options.outerMargin = false;
  }

  private initMobileGrid() {
    this.initHandHeldGrid();
    this.options.pushItems = true;
    this.options.compactType = 'compactUp&Left';
  }

  private initDesktopGrid() {
    this.options.fixedColWidth = DEFAULT_TILE_SIZE[0];
    this.options.fixedRowHeight = DEFAULT_TILE_SIZE[1];
    this.options.margin = DEFAULT_TILE_SIZE[0] / 10
  }

  private farestItem(direction: string, viewPoint?: number[]): number {
    let result = 0;
    const viewPointX = viewPoint ? viewPoint[0] : 0;
    const viewPointY = viewPoint ? viewPoint[1] : 0;
    this.layout.forEach(item => {
      if (direction === 'east') {
        result = result < (item.x - viewPointX) ? (item.x - viewPointX) : result;
      } else if (direction === 'west') {
        if (viewPoint) {
          result = viewPointX > item.x ? item.x : result;
        } else {
          throw new Error("Missing value of param <viewPoint> while param <direction> is '" + direction + "'!");
        }
      } else if (direction === 'south'){
        result = result < (item.y - viewPointY) ? (item.y - viewPointY) : result;
      } else if (direction === 'north'){
        if (viewPoint) {
          result = viewPointY > item.y ? item.y : result;
        } else {
          throw new Error("Missing value of param <viewPoint> while param <direction> is '" + direction + "'!");
        }
      } else {
        throw new Error("'" + direction + "' is not a valid value for param <direction>! Must be one of 'north', 'east', 'south' or 'west'.");
      }
    });
    return result;
  }

  getGridType(): string {
    return this.options.gridType;
  }

  getSwap(): string {
    return this.options.swap ? 'swap' : 'no swap';
  }

  getPush(): string {
    return this.options.pushItems ? 'push' : 'no push';
  }

  getMaxCols(): number {
    return this.options.maxCols;
  }

  getFixedColWidth(): number {
    return this.options.fixedColWidth;
  }

  getMarginSize(): number {
    return this.options.margin;
  }

  addItem(x: number, y: number): void {
    this.layout.push({
      cols: 1,
      rows: 1,
      x,
      y,
      id: UUID.UUID()
    });
    this.saveToLocalStorage();
  }

  private initLayout() {
    this.readFromLocalStorage();
    // const isMobile = this.deviceService.isMobile();
    // const isTablet = this.deviceService.isTablet();
    // this.options.gridType = isMobile ? 'fixed' : 'fixed';
    // this.options.swap = isMobile;
    // this.options.pushItems = isMobile || isTablet;
    // this.options.compactType = isMobile ? 'compactLeft&Up' : 'none';
  }

  deleteItem(id: string): void {
    const item = this.layout.find(itm => itm.id === id);
    const itemIndex = this.layout.indexOf(item);
    this.layout.splice(itemIndex, 1);
    this.saveToLocalStorage();
  }

  deleteAllItems() {
    this.layout.splice(0, this.layout.length);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    this.localStorageService.saveToLocalStorage(this.layout);
  }

  readFromLocalStorage() {
    this.layout = this.localStorageService.readFromLocalStorage();
  }

  itemChangeCallback() {
    this.saveToLocalStorage();
  }
}
