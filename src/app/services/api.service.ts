import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, from, map, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Octokit } from '@octokit/rest';

/**
 * Service for making API requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  octokit: Octokit;

  /**
   * Constructs a new ApiService instance.
   * @param httpClient - The HttpClient instance for making HTTP requests.
   */
  constructor(
    private httpClient: HttpClient
  ) {
    this.octokit = new Octokit();
  }

  /**
   * Retrieves details of a user.
   * @param username - The username of the user.
   * @returns A promise that resolves to the user details.
   */
  getuserDetails(username: string) {
    return this.octokit.users.getByUsername({
      username: username
    });
  }

  /**
   * Retrieves the total number of pages for a user's repositories.
   * @param username - The username of the user.
   * @param perPage - The number of repositories per page (default: 10).
   * @returns An Observable that emits the total number of pages.
   */
  getTotalPages(username: string, perPage: number = 10): Observable<number> {
    return from(this.octokit.repos.listForUser({ username, page: 1, per_page: perPage }))
      .pipe(
        map(response => {
          const linkHeader = response.headers.link;
          let totalPages = 1;

          if (linkHeader) {
            const lastLink = linkHeader.split(', ').find(link => link.endsWith('rel="last"'));
            if (lastLink) {
              const lastPageMatch = lastLink.match(/page=(\d+)/);
              if (lastPageMatch) {
                totalPages = Number(lastPageMatch[1]);
              }
            }
          }

          return totalPages;
        }),
        catchError(error => {
          console.error('Error fetching repositories:', error);
          return throwError(error);
        })
      );
  }

  /**
   * Retrieves the repositories of a user.
   * @param username - The username of the user.
   * @param page - The page number (default: 1).
   * @param perPage - The number of repositories per page (default: 10).
   * @returns An Observable that emits an array of user repositories.
   */
  getUserRepos(username: string, page: number = 1, perPage: number = 10): Observable<any[]> {
    return from(this.octokit.repos.listForUser({ username, page, per_page: perPage }))
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error fetching repositories:', error);
          return throwError(error);
        }),
        mergeMap(repos =>
          forkJoin(
            repos.map(repo =>
              from(this.octokit.request('GET ' + repo.languages_url))
                .pipe(
                  map(languages => ({
                    ...repo,
                    languages: Object.keys(languages.data)
                  }))
                )
            )
          )
        )
      );
  }
}
