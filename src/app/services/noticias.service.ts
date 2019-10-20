import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopHeadLine } from '../interfaces/interfaces';
import { environment } from '../../environments/environment.prod';

const apikey = environment.apiKey;
const apiUrl = environment.url;
const headers = new HttpHeaders({'X-Api-Key': apikey});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) {  }

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadLines() {
    return this.ejecutarQuery<TopHeadLine>(`/top-headlines?country=us&page=${ this.categoriaPage }&page=${ this.headlinesPage }`);
  }

  getCategories(categoria: string) {
    if ( this.categoriaActual === categoria ) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<TopHeadLine>(`/top-headlines?country=us&category=${ categoria}&page=${ this.categoriaPage }`);
    // return this.http.get
    // (`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=c9c2f8a479d547f298e7d0451489d7b3`);
  }
}
