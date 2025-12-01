import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ThemeService } from '../../Services/ThemeService/theme-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'], // <-- plural
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Navbar implements OnInit {
  changeTheme: boolean = true;
  constructor(public theme: ThemeService) {}

  ngOnInit() {
    this.onThemeToggle();
  }

  changeThemeButton() {
    this.changeTheme = !this.changeTheme;
  }

  onThemeToggle() {
    this.changeTheme = !this.changeTheme;
    this.theme.toggle();
  }
}
