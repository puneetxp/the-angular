import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'the-not-allowed',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  host: {
    class: "w-full flex justify-center grow content-center bg-blue-800"
  },
  templateUrl: './not-allowed.component.html',
  styleUrls: ['./not-allowed.component.scss']
})
export class NotAllowedComponent {

}
