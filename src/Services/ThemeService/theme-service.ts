// src/app/theme.service.ts
import { Injectable } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storageKey = 'theme';

  init() {
    const saved = localStorage.getItem(this.storageKey) as Theme | null;
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const initial: Theme = saved ?? (prefersDark ? 'dark' : 'light');
    this.apply(initial);
  }

  toggle() {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    this.apply(current === 'dark' ? 'light' : 'dark');
    console.log('Toggling theme...');
  }

  apply(theme: Theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem(this.storageKey, theme);
  }
}
