import { Component, OnInit, Inject } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { LayoutService, IComponent } from '../../services/layout.service';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})

export class LayoutComponent implements OnInit {

  get options(): GridsterConfig {
    return this.layoutService.options;
  }

  get layout(): GridsterItem[] {
    return this.layoutService.layout;
  }

  constructor(public layoutService: LayoutService, public deviceService: DeviceService) {
  }

  ngOnInit() {
  }
}
