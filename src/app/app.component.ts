import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  items: MenuItem[] = [];
  something = 'something';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
      { label: 'Dashboard', routerLink: ['/dashboard'] },
      { label: 'Heroes', routerLink: ['/heroes'] },
    ];
  }
}
