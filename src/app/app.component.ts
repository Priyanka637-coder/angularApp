import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/service/service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Job } from 'src/model/job';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'my-app';
  jobList: Job[] = [];
  jobDetail !: FormGroup;

  constructor(private formBuilder: FormBuilder, private jobService: JobService) { }

  ngOnInit(): void {

    this.getAllJob();

    this.jobDetail = this.formBuilder.group({
      Id: [''],
      JobName: [''],
      JobDescription: [''],
      Status: ['']
    });

  }

  searchTerm: string = '';
  filteredJobList: any[] = [];

  getAllJob() {
    this.jobService.getAllJob().subscribe(res => {
      this.jobList = res;
      this.filteredJobList = this.jobList;
      console.log(res);
    }, err => {
      console.log("error while fetching data.")
    });
  }

  filterJobs() {
    this.filteredJobList = this.jobList.filter(job => job.jobName.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }


  deleteJob(job: Job): void {
    if (confirm("Are you sure you want to delete the job?")) {
      this.jobService.deleteJob(job).subscribe(
        res => {
          console.log(res);
          alert('Job deleted successfully');
          this.getAllJob();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  reprocessJob(job: Job) {
    job.status = true;
    this.jobService.updateJob(job.id, job).subscribe(res => {
      console.log(res);
      this.getAllJob();
    }, err => {
      console.log(err);
    })
  }

  exportToCSV() {
    const csvRows = [];
    const headers = ['ID', 'Job Name', 'Job Description', 'Status'];
    csvRows.push(headers.join(','));

    this.jobList.forEach(job => {
      const values = [
        job.id,
        job.jobName,
        job.jobDescription,
        job.status ? 'Completed' : 'Failed'
      ];
      csvRows.push(values.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'job_data.csv';
    link.click();
  }
}
