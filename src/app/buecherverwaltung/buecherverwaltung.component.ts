import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buecherverwaltung',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './buecherverwaltung.component.html',
  styleUrl: './buecherverwaltung.component.css'
})
export class BuecherverwaltungComponent {
  books: Book[] = [];

  newBook: Book = {
    titel: '',
    autor: '',
    erscheinungsjahr: new Date().getFullYear(),
    verfuegbar: ''
  };

  constructor(private bookService: BookService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  addBook(): void {
    this.bookService.addBook(this.newBook).subscribe(() => {
      this.newBook = {
        titel: '',
        autor: '',
        erscheinungsjahr: new Date().getFullYear(),
        verfuegbar: ''
      };
      this.loadBooks();
    });
  }

  deleteBook(id: number) {
    if (confirm('Möchten Sie dieses Buch wirklich löschen?')) {
      this.http.delete(`http://localhost:8080/api/books/${id}`).subscribe(() => {
        // Buch aus der Liste entfernen, ohne nochmal neu zu laden
        this.books = this.books.filter(b => b.id !== id);
      }, error => {
        alert('Fehler beim Löschen des Buchs.');
      });
    }
  }
}
