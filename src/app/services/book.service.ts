import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { BuchPage } from '../models/bookpage.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addBook(book: Book): Observable<void> {
    return this.http.post<void>(this.apiUrl, book);
  }

  updateBook(book: Book) {
    return this.http.put(`http://localhost:8080/api/books/${book.id}`, book);
  }

  getBooksPaginated(page: number, size: number): Observable<BuchPage> {
    return this.http.get<BuchPage>(`${this.apiUrl}/paginated/${page}/${size}`);
  }
}
