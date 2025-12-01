import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Navbar } from '../../Components/navbar/navbar';
import { ThemeService } from '../../Services/ThemeService/theme-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Home implements OnInit {
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
