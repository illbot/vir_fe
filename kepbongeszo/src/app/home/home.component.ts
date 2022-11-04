import { Component} from '@angular/core';

interface IGreeting {
  id: Number,
  content: String
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() {}
}
