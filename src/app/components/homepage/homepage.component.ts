import { Component } from '@angular/core';
import { DialogService } from 'src/app/services';
import { DialogData } from 'src/app/shared';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent {
  currentArea: string = 'Usuários Cadastrados';

  constructor(private dialogService: DialogService) { }

  openDialog(action: string) {
    const data: DialogData = {
      action,
      userData: null
    }
    this.dialogService.openDialog(data);
  }

}
