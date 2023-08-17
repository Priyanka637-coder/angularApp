import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/service/service';
import { FormBuilder } from '@angular/forms';
import { Job } from 'src/model/job';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'my-app';
  jobList: Job[] = [];

  constructor(private formBuilder: FormBuilder, private jobService: JobService) { }

  ngOnInit(): void {

    // this.getAllJob();

  }

  getAllJob() {
    this.jobService.getAllJob().subscribe(res => {
      this.jobList = res;
      console.log(res);
    }, err => {
      console.log("error while fetching data.")
    });
  }
}
