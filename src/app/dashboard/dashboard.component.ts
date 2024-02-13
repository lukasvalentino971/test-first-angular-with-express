import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient){}

  users: any = [];
  searchTerm: string = '';
  editedUser: any = {};
  alertType: 'success' | 'error' | 'notsame' | null = null;
  showAddUser: boolean = false;

  // Function to show the Add User modal
  showAddUserModal() {
    this.showAddUser = true;
  }

  // Function to hide the Add User modal
  hideAddUserModal() {
    this.showAddUser = false;
  }

  ngOnInit(): void {
      this.http.get('http://localhost:3000/user').subscribe(response => {
        this.users = response;
      }, error => {
        console.log(error);
      });
  }

  closeAlert() {
    this.alertType = null; // Set alertType to null to hide the alert
  }

  addUser(username: string, email: string, password: string) {
    // Periksa apakah username, email, dan password telah diisi
    if (!username || !email || !password) {
      console.error('Username, email, and password are required.');
      this.alertType = 'error';
      return;
    }
  
    // Periksa apakah email mengandung '@'
    if (!email.includes('@')) {
      console.error('Email must contain @ symbol.');
      this.alertType = 'notsame';
      return;
    }
  
    const newUser = { username, email, password, role: 'user' };
    this.http.post('http://localhost:3000/user', newUser)
      .subscribe((response: any) => {
        console.log('New user added:', response);
        this.users.push(response);
        this.alertType = 'success'; // Set alertType to success if user created successfully
      }, (error) => {
        console.error('Error adding user:', error);
        this.alertType = 'error'; // Set alertType to error if failed to create user
      });
}

  

  deleteUser(userId: number) {
    this.http.delete(`http://localhost:3000/user/${userId}`)
      .subscribe(() => {
        console.log('User deleted successfully');
        this.users = this.users.filter((user: any) => user.id !== userId);
        this.alertType = 'success'; // Set alertType to success if user deleted successfully
      }, (error) => {
        console.error('Error deleting user:', error);
        this.alertType = 'error'; // Set alertType to error if failed to delete user
      });
  }


  searchUsers() {
    this.http.get(`http://localhost:3000/user/search?query=${this.searchTerm}`)
      .subscribe((response: any) => {
        this.users = response;
      }, error => {
        console.log(error);
      });
  }

  get filteredUsers(): any[] {
    return this.users.filter((user: any) =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
}
