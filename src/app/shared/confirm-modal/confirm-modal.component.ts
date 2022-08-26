import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title!: string;
  @Input() mensagen!: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Sim';

  confirmResult!: Subject<boolean>;


  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

  onConfirm(){
    this.confirmAndClose(true);
  }

  onClose(){
    this.confirmAndClose(false);
  }

  private confirmAndClose(value: boolean){
    this.confirmResult.next(true)
    this.bsModalRef.hide();
  }


}
