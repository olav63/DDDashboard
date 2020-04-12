import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GridsterModule } from 'angular-gridster2';
// import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    GridsterModule,
    DeviceDetectorModule.forRoot()
    // Ng2DeviceDetectorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
  ]
})
export class AppModule { }
