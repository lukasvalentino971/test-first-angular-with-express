import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-item-list',
  template: `

    <!-- <input [(ngModel)]="message" placeholder="Enter your message" />
    <p>You entered: {{ message }}</p> -->
  `,
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  items: string[] = ['item 1', 'item 2', 'item 3'];

  message: string = '';
}
