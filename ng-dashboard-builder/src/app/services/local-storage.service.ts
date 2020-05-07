import { Injectable } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageServiceService {
  public saveToLocalStorage(items: GridsterItem[]) {
    localStorage.clear();
    items.forEach(item => {
      const position = this.positionToString(item.x, item.y);
      localStorage.setItem(item.id, position);
    });
  }

  private positionToString(x: number, y: number): string {
    const result = '#x:' + x.toString() + '#y:' + y.toString();
    return result;
  }

  public readFromLocalStorage(): GridsterItem[] {
    const items: GridsterItem[] = [];
    const localStorageSize = localStorage.length;
    for (let i = 0; i < localStorageSize; i++) {
      const id = localStorage.key(i);
      const positionString = localStorage.getItem(id);
      const position: number[] = this.positionStringToPosition(positionString);
      const restoredItem = {
        cols: 1,
        rows: 1,
        x: position[0],
        y: position[1],
        id,
        armed: true
      };
      items.push(restoredItem);
    }
    return items;
  }

  private positionStringToPosition(itemString: string): number[] {
    const xMarker: number = itemString.search('#x:');
    const yMarker: number = itemString.search('#y:');
    const xString: string = itemString.substring(xMarker + '#x:'.length, yMarker);
    const yString: string = itemString.substr(yMarker + '#y:'.length);
    return [Number(xString), Number(yString)];
  }
}
