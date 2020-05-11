import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { DeviceService } from 'src/app/services/device.service';
import { LayoutService } from '../../services/layout.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations:[
    trigger('showHide', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0 }))
      ])
    ]),
  ]
})

export class LayoutComponent implements OnInit, AfterViewInit {
  @Input() launchId;;
  screenHeight: number = window.innerHeight;
  screenWidth: number = window.innerWidth;
  alive = true;

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.layoutService.initGrid();
  }

  getScreenWidth(): string {
    return this.screenWidth.toString();
  }

  getScreenHeight(): string {
    return this.screenHeight.toString();
  }

  getReadableId(item: GridsterItem): string {
    return item.id.toString().substring(0, 4);
  }

  deleteItem(id: string) {
    this.alive = false;
    this.layoutService.deleteItem(id);
  }

  launchApp(item: GridsterItem) {
    if (!this.deviceService.isDesktop() || item.armed) {
      this.launchId = this.getReadableId(item);
    }
    item.armed = true;
  }

  get options(): GridsterConfig {
    return this.layoutService.options;
  }

  get layout(): GridsterItem[] {
    return this.layoutService.layout;
  }

  constructor(public layoutService: LayoutService, public deviceService: DeviceService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
  }
}
