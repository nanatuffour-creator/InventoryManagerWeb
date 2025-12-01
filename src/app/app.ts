import { Component, OnInit, signal } from '@angular/core';
import { Layout } from '../Components/layout/layout';
import { ThemeService } from '../Services/ThemeService/theme-service';
import { RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('InventoryManagerWeb');
  constructor(public theme: ThemeService) {}
  ngOnInit() {
    this.theme.init();
  }
}
