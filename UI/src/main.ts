import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>Hello from Angular!</h1><p>Backend says: {{ response }}</p>`,
})
export class App {
  response = 'Waiting...';
  constructor(private http: HttpClient) {
    this.http.get('/api/hello', {responseType: 'text'}).subscribe(data => this.response = data);
  }
}

bootstrapApplication(App, {
  providers: [importProvidersFrom(HttpClientModule)]
});