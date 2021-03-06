import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {
  constructor(private service: DeviceDetectorService) {
  }

  public getDeviceCat(): string {
    let result = ' ' + '?';
    
    if (this.isDesktop()) {
      result = ' ' + 'desktop';
    } else if (this.isMobile()) {
      result =  ' ' + 'mobile';
    } else if (this.isTablet()) {
      result =  ' ' + 'tablet';
    } 

    return result;
  }

  public getScreenWidth() {
    return window.innerWidth;
  }

  public getScreenHeight() {
    return window.innerHeight;
  }

  public isMobile(): boolean {
    return this.service.isMobile();
  }

  public isDesktop(): boolean {
    return this.service.isDesktop();
  }

  public isTablet(): boolean {
    return this.service.isTablet();
  }

  public getDeviceInfo() {
    const deviceInfo = this.service.getDeviceInfo();
    return deviceInfo;
  }

  public getDevice() {
    const device = this.service.device;
    return device;
  }

  public getBrowser() {
    return this.service.browser;
  }

  public getBrowserVersion() {
    return this.service.browser_version;
  }

  public getOS() {
    return this.service.os;
  }

  public getOSVersion() {
    return this.service.os_version;
  }
}
