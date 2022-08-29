import { delay, tap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export class CrudServices <T> {

  constructor(protected http: HttpClient, private API_URL: any){}

  list() {
    return this.http.get<T[]>(this.API_URL)
    .pipe(
      delay(1000),
      tap(console.log)
    );
  }

  loadById(id: T){
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private create(registro: T) {
    return this.http.post(this.API_URL, registro).pipe(take(1));
  }

  private update(registro: any){
    return this.http.put(`${this.API_URL}/${registro.id}`, registro).pipe(take(1))
  }

  save(registro: any){
    if(registro.id){
      return this.update(registro)
    }else{
      return this.create(registro)
    }
  }

  remove(id: any){
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }

}
