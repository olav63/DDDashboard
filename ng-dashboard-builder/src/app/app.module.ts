import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AppTileComponent } from './components/tiles/app-tile/app-tile.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AppTileComponent
  ],
  imports: [
    BrowserModule,
    GridsterModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
  ]
})
export class AppModule { }
