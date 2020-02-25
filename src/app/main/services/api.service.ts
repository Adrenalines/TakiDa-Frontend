import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Category, CategoryResponse } from '../../shared/types/types';
import { defaultLocale } from '../../shared/data/languages';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  defaultLocale = defaultLocale;

  constructor(private http: HttpClient) {
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<CategoryResponse>(`${ environment.url }/categories`)
      .pipe(map((response: CategoryResponse) => {
        return response.data;
      }),
        switchMap((data: Category[]) => {
          if (defaultLocale === 'en') {
            return of(data).pipe(map((categories: Category[]) => {
              categories.forEach(category => {
                category.nameEng = category.name;
              });
              return categories;
            }));
          } else {
            return this.getEngCategories(data);
          }
        }), map((response: Category[]) => {
          return response;
        }));
  }

  private getEngCategories(data: Category[]): Observable<Category[]> {
    return this.http.get<CategoryResponse>(`${ environment.url }/categories`, {
        params: {
          locale: 'en'
        }
      })
      .pipe(map((response: CategoryResponse) => {
        return response.data;
      }), map((categories: Category[]) => {
        categories.forEach((category, i) => {
          category.nameEng = category.name;
          category.name = data[i].name;
        });
        return categories;
      }));
  }
}
