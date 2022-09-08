import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  showDeleteBox = true;
  id!: number;

  setShowDeleteBox() {
    this.showDeleteBox = !this.showDeleteBox;
    return this.showDeleteBox
  }

  setId(id: number) {
    this.id = id;
  }

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, classe: string) {
    this.snackBar.open(msg, 'x', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [classe]
    });
  };

  create (product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(environment.baseUrl + '/products', product).pipe(
      map(object => object),
      catchError(error => this.erroHandler(error))
    );
  };

  erroHandler(error: any): Observable<any> {
    this.showMessage('Internal error server.', 'msg-fail');

    return EMPTY
  }

  read(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(environment.baseUrl + '/products');
  }

  readById(id: string | number): Observable<IProduct> {
    const url = environment.baseUrl + '/products/' + id;
    return this.http.get<IProduct>(url);
  }

  update(product: IProduct): Observable<IProduct> {
    const url = environment.baseUrl + '/products/' + this.id;
    return this.http.put<IProduct>(url, product);
  }

  delete(id: number): Observable<IProduct> {
    const url = environment.baseUrl + '/products/' + id;
    return this.http.delete<IProduct>(url);
  }

;}
