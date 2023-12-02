import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loadingState = false;  // Flag to indicate if the data is being loaded
  isSearched = false;  // Flag to indicate if a search has been performed

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    // this.apiService.getUser('johnpapa').subscribe(console.log);
  }

  username: string = '';  // The GitHub username entered by the user
  user: any;  // The user details retrieved from the API
  repos: any[] = [];  // The repositories of the user

  itemsPerPageOptions = [10, 20, 50, 100];  // Options for the number of repositories per page

  itemsPerPage = this.itemsPerPageOptions[0];  // Number of repositories per page
  currentPage = 1;   // Current page
  errorMessage = '';  // Error message
  totalPages?: number;  // Total pages

  // Function to handle the change in the number of repositories per page
  onItemsPerPageChange(newItemsPerPage: string) {
    this.itemsPerPage = Number(newItemsPerPage);
    this.onSearch(this.username);
  }

  // Function to handle the search for a GitHub user
  onSearch(username: string){
    console.log(this.username);
    this.currentPage = 1;
    this.isSearched = true;
    this.loadingState = true;
    this.user = null;
    if(!username.trim()) {
      this.isSearched = true;
      this.loadingState = false;
      this.errorMessage = 'Invalid input. Please enter a valid GitHub username.';
      return;
    }
    this.apiService.getuserDetails(this.username).then((user: any) => {
      console.log(user);
      this.user = user;
      this.apiService.getUserRepos(this.username,this.currentPage,this.itemsPerPage).subscribe((repos : any) => {
        console.log(repos);
        this.repos = repos;
        this.apiService.getTotalPages(this.username, this.itemsPerPage).subscribe(totalPages => {
          this.totalPages = totalPages;
          console.log(this.totalPages);
        }, err => {
          console.log(err);
          this.errorMessage = 'Error fetching total pages. Please try again.';
          this.loadingState = false;
        });
        this.loadingState = false;
      }, err => {
        console.log(err);
        this.errorMessage = 'Error fetching repositories. Please try again.';
        this.loadingState = false;
      });
    }, err => {
      console.log(err);
      this.errorMessage = 'User does not exist. Please try another username.';
      this.loadingState = false;
    });
  }

  // Function to handle the pagination change
  onPaginationChange(username: string, page: number, perPage: number){
    this.isSearched = true;
    this.loadingState = true;
    this.apiService.getUserRepos(this.username,this.currentPage,this.itemsPerPage).subscribe((repos: any) => {
      console.log(repos);
      this.repos = repos;
      this.loadingState = false;
    }, err => {
      console.log(err);
      this.loadingState = false;
    });
  }

  // Function to go to the first page
  goToFirstPage(): void {
    this.currentPage = 1;
    this.onPaginationChange(this.username, this.currentPage, this.itemsPerPage);
  }

  // Function to go to the previous page
  goToPreviousPage(): void {
    this.currentPage = Math.max(1, this.currentPage - 1);
    this.onPaginationChange(this.username, this.currentPage, this.itemsPerPage);
  }

  // Function to go to the next page
  goToNextPage(): void {
    this.currentPage = this.currentPage + 1;
    this.onPaginationChange(this.username, this.currentPage, this.itemsPerPage);
  }

  // Function to go to the last page
  goToLastPage(): void {
    if (this.totalPages) {
      this.currentPage = this.totalPages;
      this.onPaginationChange(this.username, this.currentPage, this.itemsPerPage);
    }
  }

}
