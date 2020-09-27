import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogModel } from '../../models/confirm-dialog-model';

@Component({
  selector: 'ed-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {


  //tipo de data que va a recibir confirmdialogmodel  estoy ref como el mismo object

  //para usarlo podemos usar una instancia del dialogo
  constructor(public dialogRef:MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: ConfirmDialogModel) { }

  ngOnInit(): void {
  }
  yes(){
   this.dialogRef.close(true);
  }
  close(){
    this.dialogRef.close(false);
  }
}
