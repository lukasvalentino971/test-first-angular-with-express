import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  userId!: string;
  user: any = {};
  isDataLoaded = false; // Flag to track whether user data has been loaded

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.getUser();
  }

  getUser() {
    this.http.get(`http://localhost:3000/user/${this.userId}`).subscribe((data: any) => {
      console.log(data); // Check if data is retrieved correctly
      this.user = data;
      this.isDataLoaded = true; // Set flag to true when user data is loaded
    }, error => {
      console.error(error); // Log any errors
    });
  }

  editUser() {
    this.http.put(`http://localhost:3000/user/${this.userId}`, this.user).subscribe((data: any) => {
      console.log('User updated successfully');
      this.router.navigate(['/dashboard']);
    });
  }
}
