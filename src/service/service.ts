import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from 'src/model/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  addJobURL: string;
  getJobURL: string;
  updateJobUrl: string;
  deleteJobUrl: string;
  getJobByUrl: string;
  httpClient: any;
  baseUrl: any;

  constructor(private http: HttpClient) {

    this.addJobURL = 'http://localhost:8080/create';
    this.getJobURL = 'http://localhost:8080/get/all';
    this.updateJobUrl = 'http://localhost:8080/asset/update';
    this.deleteJobUrl = 'http://localhost:8080/asset/delete';
    this.getJobByUrl = 'http://localhost:8080/asset/get';
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.addJobURL, job);
  }

  getAllJob(): Observable<Job[]> {
    return this.http.get<Job[]>(this.getJobURL);
  }

  /*updateEmployee(empId: Number, emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.updateEmpUrl, + '/' + empId, emp);
  }
  */
  updateJob(id: Number, job: Job): Observable<Object> {
    return this.http.put(`${this.updateJobUrl}/${id}`, job);
  }

  deleteJob(job: Job): Observable<Job> {
    return this.http.delete<Job>(this.deleteJobUrl + '/' + job.id);
  }

  getJobById(job: Job): Observable<Job> {
    return this.http.get<Job>(this.getJobByUrl + '/' + job.id);
  }


}
