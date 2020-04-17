import { DisplayGrid, GridsterConfig } from 'angular-gridster2';
import { gridTypes, compactTypes } from 'angular-gridster2/lib/gridsterConfig.interface';

export class LayoutConfig implements GridsterConfig {
  gridType: gridTypes = 'fit';
  swap = false;
  pushItems = false;
  compactType: compactTypes = 'compactUp&Left';
  displayGrid = DisplayGrid.Always;
  mobileBreakpoint = 120;
  draggable = {
    enabled: true
  };
  defaultItemCols = 1;
  defaultItemRows = 1;
  margin = 5;
  fixedRowHeight = 100;
  fixedColWidth = 100;
  resizable = {
    enabled: false
  };
  itemChangeCallback: any;
}
