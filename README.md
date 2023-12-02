# Fyle Frontend Challenge

##Introduction
Welcome to the Fyle Internship Assignment Angular application! This project aims to provide a user-friendly web app for exploring GitHub profiles and repositories. Utilizing Angular and the GitHub API, users can seamlessly search for GitHub users, view their profiles, and explore their repositories.

## Features

- **User Search**: Easily search for GitHub users by entering their username.
- **Profile Details**: Get detailed information about a user, including their bio, location, and social links.
- **Repository Display**: View a list of repositories for the searched user, complete with descriptions and languages used.
- **Pagination**: Navigate through multiple pages of repositories with pagination controls.
- **Loading Skeletons**: Experience a smooth loading experience with skeleton loaders while data is being fetched.
- **Error Handling**: Gracefully handle errors, providing informative messages for invalid input or failed API requests.

## How to Use

1. Enter a GitHub username in the search box at the top of the page.
2. Click the "Search" button or press Enter to retrieve user information and repositories.
3. Explore the user's profile details and repositories listed below.
4. Navigate through multiple pages of repositories using the pagination controls.

## Libraries Used

This Angular application utilizes several libraries to enhance functionality and improve the development process:

### [Angular](https://angular.io/)
Angular is a powerful and widely-used web application framework. In this project, Angular is the core framework for building the user interface and managing application logic.

### [ngx-skeleton-loader](https://www.npmjs.com/package/ngx-skeleton-loader)
The `ngx-skeleton-loader` library is employed to enhance the user experience during data fetching. It provides loading skeletons, creating a smooth transition while waiting for data to load.

### [GitHub Octokit](https://github.com/octokit/rest.js)
Octokit is a JavaScript toolkit for interacting with the GitHub API. The `Octokit` library is utilized in the `ApiService` to make requests to the GitHub API, fetching user details and repositories.

### [HttpClientModule](https://angular.io/api/common/http/HttpClientModule)
`HttpClientModule` is part of the Angular framework and is used for making HTTP requests. In this project, it is employed to communicate with the GitHub API and retrieve data.

### [FormsModule](https://angular.io/guide/forms)
Angular's `FormsModule` is used for handling forms and implementing two-way data binding. It plays a crucial role in capturing user input for GitHub username search.

### [NgxSkeletonLoaderModule](https://www.npmjs.com/package/ngx-skeleton-loader)
The `NgxSkeletonLoaderModule` is imported to integrate the `ngx-skeleton-loader` library. It enhances the user interface by providing loading skeletons while waiting for data to be fetched.

These libraries collectively contribute to the development and functionality of the Fyle Internship Assignment Angular application, ensuring a robust and user-friendly experience.

## Getting Started

To run the application locally:

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Run `ng serve` for a dev server.
4. Navigate to `http://localhost:4200/` in your browser.

Feel free to explore and enjoy exploring GitHub profiles with the Fyle Internship Assignment web app!

## Author

- Shantanu Dipak Rajmane
