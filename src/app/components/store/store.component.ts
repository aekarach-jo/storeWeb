import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { store } from 'src/app/models/Store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  formStore: any
  storeAllData: any
  storeIdData: any
  storeId: any
  constructor(public route: Router, public callapi: ApiService, public fb: FormBuilder) {
    this.formStore = fb.group({
      storeId: null,
      storeName: null,
      description: null,
      telephone: null,
      status: null,
    })
  }

  emptyForm() {
    this.formStore.patchValue({
      storeId: "",
      storeName: "",
      description: "",
      telephone: "",
      status: "",
    })
  }

  patchValue(receiveStoreId: store) {
    this.formStore.patchValue({
      storeId: receiveStoreId.storeId,
      storeName: receiveStoreId.storeName,
      description: receiveStoreId.description,
      telephone: receiveStoreId.telephone,
      status: receiveStoreId.status,
    })
  }

  getAllStore() {
    this.callapi.getAllStore().subscribe(data => {
      this.storeAllData = data
      console.log(data);
    })
  }

  getStoreById(id: string) {
    this.storeId = id
    this.callapi.getStoreById(id).subscribe(data => {
      this.storeIdData = data
      this.patchValue(this.storeIdData)
    })
  }

  createStore() {
    console.log(this.formStore.value);
    this.formStore.value = "Open"
    this.callapi.createStore(this.formStore.value).subscribe(data => {
      console.log(data);
      Swal.fire({
        position: "center",
        icon: 'success',
        title: "สำเร็จ",
        showConfirmButton: false,
        timer: 1000
      })
      this.emptyForm()
      this.getAllStore()
    })
  }

  editStore() {
    console.log(this.storeId);
    console.log(this.formStore.value);
    
    this.callapi.editStore(this.storeId, this.formStore.value).subscribe(data => {
      console.log(data);
      Swal.fire({
        position: "center",
        icon: 'success',
        title: "แก้ไขสำเร็จ",
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  deleteStore(storeId: string) {
    Swal.fire({
      position: 'center',
      text: "ยืนยันหรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#2aad19',
      confirmButtonText: 'ยืนยัน'
    }).then((result) => {
      if (result.isConfirmed) {
        this.callapi.deleteStore(storeId).subscribe(data => {
          console.log(data);
          Swal.fire({
            position: "center",
            icon: 'success',
            title: "ลบแล้ว",
            showConfirmButton: false,
            timer: 1000
          })
          this.getAllStore();
        })
      }
    })

  }

  ngOnInit(): void {
    this.getAllStore()
  }

}
