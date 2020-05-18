import { Injectable } from '@angular/core';
import { DisplayGrid, GridsterConfig, GridsterItem, GridsterComponent } from 'angular-gridster2';
import { UUID } from 'angular2-uuid';
import { DeviceService } from './device.service';
import { LocalStorageServiceService } from './local-storage.service';
import { TileComponent } from '../components/tiles/tile/tile.component';
import { R3TargetBinder } from '@angular/compiler';

export const DEFAULT_TILE_SIZE = [100, 100];
export const MIN_TILE_SIZE = [75, 75];
export const MAX_TILE_SIZE = [125, 125];

@Injectable({
  providedIn: 'root'
})

export class LayoutService {
  public options: GridsterConfig;
  public layout: GridsterItem[] = [];
  
  constructor(private localStorageService: LocalStorageServiceService, private deviceService: DeviceService) {
    this.initGrid();
    this.getItemsFromLocalStorage();
  }

  public initGrid() {
    this.options = {
      gridType:'fixed',
      swap: false,
      pushItems: true,
      scrollToNewItems: true,
      compactTypes: 'compactUp&Left',
      displayGrid: DisplayGrid.None,
      mobileBreakpoint: 120,
      draggable: {
        enabled: true,
        delayStart: 250,
        start: this.dragStart.bind(this),
        stop: this.dragStop.bind(this),
        ignoreContentClass: 'TileComponent',
      },
      defaultItemCols: 1,
      defaultItemRows: 1,
      maxCols: 20,
      maxRows: 20,
      margin: 0,
      resizable: {
        enabled: false
      },
      itemChangeCallback: this.itemChangeCallback.bind(this),
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
  }

  private initHandHeldGrid() {
    const screenWidth = this.deviceService.getScreenWidth();
    this.options.maxCols = Math.floor(screenWidth / DEFAULT_TILE_SIZE[0]);
    this.options.margin = Math.floor((screenWidth - this.options.maxCols * DEFAULT_TILE_SIZE[0]) / (this.options.maxCols - 1));
    this.options.fixedColWidth = Math.floor((screenWidth - (this.options.maxCols - 1 ) * this.options.margin) / this.options.maxCols) - 10;
    this.options.fixedRowHeight = this.options.fixedColWidth;
    this.options.outerMargin = false;
  }

  private initMobileGrid() {
    this.initHandHeldGrid();
    this.options.compactType = 'compactUp&Left';
    
  }

  private initDesktopGrid() {
    this.options.fixedColWidth = DEFAULT_TILE_SIZE[0];
    this.options.fixedRowHeight = DEFAULT_TILE_SIZE[1];
    this.options.margin = Math.floor(DEFAULT_TILE_SIZE[0] / 10);
    this.options.pushItems = false;
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

  getMargin(): number {
    return this.options.margin;
  }

  getFixedColWidth(): number {
    return this.options.fixedColWidth;
  }

  getMarginSize(): number {
    return this.options.margin;
  }

  getCompactType(): string {
    return this.options.compactType ? this.options.compactType : 'no compact type';
  }

  addItem(x: number, y: number, cols?: number, rows?: number): void {
    this.layout.push({
      cols,
      rows,
      x,
      y,
      color: '#00FF00',
      id: UUID.UUID(),
      armed: true
    });
    this.putItemsToLocalStorage();
  }

  deleteItem(id: string): void {
    const item = this.layout.find(itm => itm.id === id);
    const itemIndex = this.layout.indexOf(item);
    this.layout.splice(itemIndex, 1);
    this.putItemsToLocalStorage();
  }

  deleteAllItems() {
    this.layout.splice(0, this.layout.length);
    this.putItemsToLocalStorage();
  }

  putItemsToLocalStorage() {
    this.localStorageService.saveToLocalStorage(this.layout);
  }

  getItemsFromLocalStorage() {
    this.layout = this.localStorageService.readFromLocalStorage();
  }

  itemChangeCallback() {
    this.putItemsToLocalStorage();
  }

  dragStart(item: GridsterItem) {
    item.armed = true;
    item.layerIndex = 1;
  }

  dragStop(item: GridsterItem) {
    item.layerIndex = 0
    if (this.deviceService.isDesktop()){
      item.armed = false;
    }
  }
}
