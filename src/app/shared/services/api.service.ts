import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first, map, share } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Category, CategoryResponse, Item, ItemsResponse } from '../types/types';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<CategoryResponse>(`${ environment.url }/categories`).pipe(
      map((response: CategoryResponse) => {
        return response.data;
      }),
      catchError(this.handleError),
      share());
  }

  public getItems(id: string): Observable<Item[]> {
    return this.http.get<ItemsResponse>(`${ environment.url }/categories/${id}/goods`)
      .pipe(first(), map((response: ItemsResponse) => {
        return response.data;
      }));
  }

  private handleError(error: Response) {
    console.log('Http request error: ', error);
    return throwError('HTTP Error');
  }
}
