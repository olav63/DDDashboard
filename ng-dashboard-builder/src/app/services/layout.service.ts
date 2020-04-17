import { HostListener, Injectable } from '@angular/core';
import { DisplayGrid, GridsterConfig, GridsterItem } from 'angular-gridster2';
import { UUID } from 'angular2-uuid';
import { DeviceService } from './device.service';
import { LocalStorageServiceService } from './local-storage.service';
import { LayoutConfig } from './layout-config';

export interface IComponent {
  pos: Position;
  id: string;
  componentRef: string;
}

interface Position {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root'
})

export class LayoutService {
  public options: LayoutConfig = new LayoutConfig();
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
    return this.options.swap ? 'swap' : 'no swap';
  }

  getPush(): string {
    return this.options.pushItems ? 'push' : 'no push';
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

  initLayout() {
    this.readFromLocalStorage();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    this.options.itemChangeCallback = this.itemChangeCallback.bind(this);
    this.options.gridType = isMobile ? 'fit' : 'fixed';
    this.options.swap = isMobile;
    this.options.pushItems = isMobile || isTablet;
    this.options.compactType = isMobile ? 'compactLeft&Up' : 'none';
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
