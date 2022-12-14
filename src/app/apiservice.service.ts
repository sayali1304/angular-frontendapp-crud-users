import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
apiUrl="http://localhost:3000/users";
createUrl="http://localhost:3000/user";

  constructor(private http:HttpClient) { }

// Get Aall Data Observe....

  getAllUser():Observable<any>{
    return this.http.get(`${this.apiUrl}`);

  }

  // create data
 
  createData(data:any):Observable<any>{
    console.log(data,'Data Created')
    return this.http.post(`${this.createUrl}`,data);
  }
    
  //  delete data
  deleteData(id:any):Observable<any>{
   let ids=id;
    return this.http.delete(`${this.createUrl}/${ids}`);
  }

  //  Update data
  updateData(data:any,id:any):Observable<any>{
    let ids = id;
    return this.http.put(`${this.createUrl}/${ids}`,data);
  }
  // getSingleData
  getSingleData(id:any):Observable<any>{
    let ids =id;
    return this.http.get(`${this.createUrl}/${ids}`);

  }
}

