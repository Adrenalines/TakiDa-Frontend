import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CallbackRequest, CallbackResponse, Category, CategoryResponse, Item, ItemsResponse } from '../../shared/types/types';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  private static handleError(error: Response) {
    console.log('Http request error: ', error);
    return throwError('HTTP Error');
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<CategoryResponse>(`${ environment.url }/categories`).pipe(
      map((response: CategoryResponse) => {
        return response.data;
      }),
      catchError(ApiService.handleError),
      share()
    );
  }

  public getItems(id: string): Observable<Item[]> {
    return this.http.get<ItemsResponse>(`${ environment.url }/categories/${id}/goods`).pipe(
      map((response: ItemsResponse) => {
        return response.data;
      }),
      catchError(ApiService.handleError)
    );
  }

  public callBack(callData: CallbackRequest): Observable<boolean> {
    return this.http.post<CallbackResponse>(`${ environment.url }/booking/callbacks`, callData).pipe(
      map((response: CallbackResponse) => {
        return response.success;
      }),
      catchError(ApiService.handleError)
    );
  }
}
