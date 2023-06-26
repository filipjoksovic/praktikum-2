import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageCacheService {
  public imageCache: { [itemName: string]: string } = {};

  constructor(private http: HttpClient) {}

  getImageForItem(itemName: string): Observable<string> {
    if (itemName in this.imageCache) {
      return of(this.imageCache[itemName]);
    } else {
      return this.http.get<any>(`pexels/search/${itemName}`).pipe(
        tap(data => {
          this.imageCache[itemName] = data[0].src.tiny;
        }),
        map(data => data[0].src.tiny)
      );
    }
  }
}
