import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">🍔 FoodDash</a>
        <span class="navbar-text text-white">
          Backend Status: 
          <span [class]="backendOnline ? 'badge bg-success' : 'badge bg-warning text-dark'">
            {{ response }}
          </span>
        </span>
      </div>
    </nav>

    <header class="bg-white py-5 border-bottom">
      <div class="container text-center py-5">
        <h1 class="display-4 fw-bold text-dark">Hungry? We got you.</h1>
        <p class="lead text-muted">Order from the best restaurants in town.</p>
        <div class="d-flex justify-content-center gap-2">
          <button class="btn btn-danger btn-lg px-4">Order Now</button>
          <button class="btn btn-outline-secondary btn-lg px-4">View Menu</button>
        </div>
      </div>
    </header>

    <section class="container my-5">
      <h2 class="mb-4">Popular Categories</h2>
      <div class="row g-4">
        <div class="col-md-4" *ngFor="let item of categories">
          <div class="card h-100 shadow-sm border-0">
            <div class="bg-secondary text-white d-flex align-items-center justify-content-center" style="height: 200px;">
              <span class="display-1">{{ item.icon }}</span>
            </div>
            <div class="card-body text-center">
              <h5 class="card-title fw-bold">{{ item.name }}</h5>
              <p class="card-text text-muted">Freshly prepared {{ item.name.toLowerCase() }} delivered to your door.</p>
              <a href="#" class="btn btn-outline-danger w-100">Explore</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="py-4 bg-dark text-white text-center mt-auto">
      <p>&copy; 2026 FoodDash Inc. Powered by Spring Boot & Angular</p>
    </footer>
  `,
  styles: [`
    .card { transition: transform 0.2s ease-in-out; }
    .card:hover { transform: translateY(-5px); }
  `]
})
export class App {
  response = 'Connecting to API...';
  backendOnline = false;
  
  categories = [
    { name: 'Burgers', icon: '🍔' },
    { name: 'Pizza', icon: '🍕' },
    { name: 'Sushi', icon: '🍣' }
  ];

  constructor(private http: HttpClient) {
    this.http.get('/api/hello', { responseType: 'text' }).subscribe({
      next: (data) => {
        this.response = data; // Displays "Hello from Spring Boot!"
        this.backendOnline = true;
      },
      error: () => {
        this.response = 'Offline';
        this.backendOnline = false;
      }
    });
  }
}

bootstrapApplication(App, {
  providers: [importProvidersFrom(HttpClientModule)]
});