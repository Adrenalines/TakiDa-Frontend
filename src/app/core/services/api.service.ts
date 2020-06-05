import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  CallbackRequest,
  PostResponse,
  Category,
  CategoryResponse,
  ItemsResponse,
  Slide,
  OrderRequest, ItemResponse, Item
} from '../../shared/types/types';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  itemsByCategory: Map<string, Observable<ItemsResponse>>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.itemsByCategory = new Map<string, Observable<ItemsResponse>>();
  }

  private static handleError(error: Response) {
    console.log('Http request error: ', error);
    return throwError('HTTP Error');
  }

  public getCategories(): Observable<Category[]> {
    return isPlatformBrowser(this.platformId) ?
      this.http.get<CategoryResponse>(`${ environment.url }/categories`).pipe(
      map((response: CategoryResponse) => {
        return response.data;
      }),
      catchError(ApiService.handleError),
      shareReplay()
    )
      : null;
  }

  public getItems(id: string, limit?: number, offset?: number): Observable<ItemsResponse> {
    if (this.itemsByCategory.has(`${id}${limit}`)) {
      return this.itemsByCategory.get(`${id}${limit}`);
    } else {
      const items = this.http.get<ItemsResponse>(`${ environment.url }/categories/${ id }/goods`, {
        params: {
          limit: limit.toString(),
          offset: offset.toString()
        }
      }).pipe(
        catchError(ApiService.handleError),
        shareReplay()
      );
      this.itemsByCategory.set(`${id}${limit}`, items);
      return isPlatformBrowser(this.platformId) ? items : null;
    }
  }

  public getItem(id: string): Observable<Item> {
    return isPlatformBrowser(this.platformId) ?
      this.http.get<ItemResponse>(`${ environment.url }/goods/${ id }`).pipe(
      map((response: ItemResponse) => {
        return response.data;
      }),
      catchError(ApiService.handleError),
      shareReplay()
    )
      : null;
  }

  public postCallBack(callData: CallbackRequest): Observable<boolean> {
    return isPlatformBrowser(this.platformId) ?
      this.http.post<PostResponse>(`${ environment.url }/booking/callbacks`, callData).pipe(
      map((response: PostResponse) => {
        return response.success;
      }),
      catchError(ApiService.handleError)
    )
      : null;
  }

  public postOrder(orderData: OrderRequest): Observable<boolean> {
    return isPlatformBrowser(this.platformId) ?
      this.http.post<PostResponse>(`${ environment.url }/booking`, orderData).pipe(
      map((response: PostResponse) => {
        return response.success;
      }),
      catchError(ApiService.handleError)
    )
      : null;
  }


  public getSlides(): Observable<Slide[]> {
    return isPlatformBrowser(this.platformId) ? this.http.get<Slide[]>('/assets/slidesStore.json').pipe(
      catchError(ApiService.handleError),
      shareReplay()
    )
      : null;
  }
}
