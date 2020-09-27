import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Products } from '../../models/products';

@Component({
  selector: "ed-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {

urlPattern  = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/;

  form: FormGroup = this.fb.group({
    title: ["",[Validators.required,Validators.minLength(5)]],
    brand: ["",[Validators.required]],
    price: ["",[Validators.required,this.minPrice(5)]],
    salePrice: ["",[Validators.required,this.minPrice(5)]],
    thumbImage: ["",[Validators.required,Validators.pattern(this.urlPattern)]],
  });
  // variables que vamos a recibir para mostrar en el formulario
  @Input() title: string;
  @Input() labelSubmit: string;
  @Input() 
  set model(m:Products){
    if(!m){
      return;
    }
    else{
      this.form.patchValue(m);
    }
  }
  // eventos que van a escuchar cuando se lleve haga una opcion
  @Output() submit: EventEmitter<Products> = new EventEmitter<Products>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(private fb:FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      const product = this.form.value;
      this.submit.emit(product); // enviamos el modelo de datos
    } else {
      console.error("Form invalid");
    }
  }
  onCancel() {
    this.cancel.emit();
  }
  get imgForm() {
    return this.form.get("thumbImage").value;
  }

  private minPrice(minPrice: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if(control.value !== undefined && control.value <= minPrice) {
        return {
          'minprice' : true
        }
      } else {
        return null;
      }
    }
}
}