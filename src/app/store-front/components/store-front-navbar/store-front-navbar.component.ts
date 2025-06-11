import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-store-front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './store-front-navbar.component.html',
  styleUrl: './store-front-navbar.component.css',
})
export class StoreFrontNavbarComponent {}
