import { Injectable } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageServiceService {
  public saveToLocalStorage(layout: GridsterItem[]) {
    localStorage.clear();
    layout.forEach(item => {
      const position = this.positionToString(item.x, item.y);
      localStorage.setItem(item.appId, position);
    });
  }

  private positionToString(x: number, y: number): string {
    let result = "#x:" + x.toString() + "#y:" + y.toString();
    return result;
  }

  public readFromLocalStorage(): GridsterItem[] {
    const layout: GridsterItem[] = [];
    const localStorageSize = localStorage.length;
    for (let i = 0; i < localStorageSize; i++) {
      const appId = localStorage.key(i);
      const positionString = localStorage.getItem(appId);
      const position: number[] = this.positionStringToPosition(positionString);
      const restoredItem = {
        cols: 1,
        rows: 1,
        x: position[0],
        y: position[1],
        appId: appId
      };
      layout.push(restoredItem)
    }
    return layout;
  }

  private positionStringToPosition(itemString: string): number[] {
    const xMarker: number = itemString.search('#x:');
    const yMarker: number = itemString.search('#y:');
    const xString: string = itemString.substring(xMarker + '#x:'.length, yMarker);
    const yString: string = itemString.substr(yMarker + '#y:'.length);
    return [Number(xString), Number(yString)];
  }
}
