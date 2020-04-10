import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { LayoutService, IComponent  } from '../../services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  
  constructor(
    public layoutService: LayoutService
  ) { }
  
  ngOnInit(): void {
  }

  get components(): IComponent[] {
    return this.layoutService.components;
  }

  get options(): GridsterConfig {
    return this.layoutService.options;
  }
  
  get layout(): GridsterItem[] {
    return this.layoutService.layout;
  }
}
