import { Injectable, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem, DisplayGrid, GridsterComponentInterface, GridsterItemComponentInterface, GridsterComponent } from 'angular-gridster2';
import { LocalStorageServiceService } from './local-storage.service';
import { HostListener } from "@angular/core";
import { DeviceService } from './device.service';

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
    gridType: 'fit',
    swap: false,
    pushItems: false,
    displayGrid: DisplayGrid.Always,
    mobileBreakpoint: 120,
    draggable: {
      enabled: true,
    },
    defaultItemCols: 1,
    defaultItemRows: 1,
    compactType: 'none',
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
  screenHeight: number;
  screenWidth: number;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  constructor(private localStorageService: LocalStorageServiceService, private deviceService: DeviceService) {
    this.initLayout();
  }

getGridType(): string {
    return this.options.gridType;
  }

  getSwap(): string {
    return this.options.swap === true ? 'swap' : 'no swap';
  }

  getPush(): string {
    return this.options.pushItems === true? 'push' : 'no push';
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
    const isMobile = this.deviceService.isMobile();
    this.options.gridType = isMobile ? 'fit' : 'fixed';
    this.options.swap = isMobile;
    this.options.pushItems = isMobile;
  }

  deleteItem(id: string): void {
    const item = this.layout.find(itm => itm.appId === id);
    const itemIndex = this.layout.indexOf(item);
    this.layout.splice(itemIndex, 1);
  }

  saveToLocalStorage() {
    this.localStorageService.saveToLocalStorage(this.layout);
  }

  readFromLocalStorage() {
    this.layout = this.localStorageService.readFromLocalStorage();
  }
}
