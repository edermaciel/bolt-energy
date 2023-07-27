import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit {
  currentArea: string = 'Usuários Cadastrados';

  constructor() { }

  ngOnInit(): void {
  }

}
