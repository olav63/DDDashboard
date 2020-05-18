import { Injectable } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageServiceService {
  public saveToLocalStorage(items: GridsterItem[]) {
    localStorage.clear();
    items.forEach(item => {
      const location = this.location(item.x, item.y, item.cols, item.rows);
      localStorage.setItem(item.id, location);
    });
  }

  private location(x: number, y: number, cols: number, rows: number): string {
    const result = '#x:' + x.toString() + '#y:' + y.toString() + '#col:' + cols.toString()  + '#row:' + rows.toString();
    return result;
  }

  public readFromLocalStorage(): GridsterItem[] {
    const items: GridsterItem[] = [];
    const localStorageSize = localStorage.length;
    for (let i = 0; i < localStorageSize; i++) {
      const id = localStorage.key(i);
      const tileString = localStorage.getItem(id);
      const position: number[] = this.tileStringToPosition(tileString);
      const size: number[] =  this.tileStringToSize(tileString);
      const restoredItem = {
        cols: size[0],
        rows: size[1],
        x: position[0],
        y: position[1],
        id,
        color: '#AAAAAA',
        armed: true
      };
      items.push(restoredItem);
    }
    return items;
  }

  private tileStringToSize(tileString: string): number[] {
    const colMarker: number = tileString.search('#col:');
    const rowMarker: number = tileString.search('#row:');
    const colString: string = tileString.substring(colMarker + '#col:'.length, rowMarker);
    const rowString: string = tileString.substr(rowMarker + '#row:'.length);
    return [Number(colString), Number(rowString)];
  }

  private tileStringToPosition(tileString: string): number[] {
    const xMarker: number = tileString.search('#x:');
    const yMarker: number = tileString.search('#y:');
    const colMarker: number = tileString.search('#col:');
    const xString: string = tileString.substring(xMarker + '#x:'.length, yMarker);
    const yString: string = tileString.substring(yMarker + '#y:'.length, colMarker);
    return [Number(xString), Number(yString)];
  }
}
