import { Component, OnInit } from '@angular/core';
import {  BarcodeScannerOptions,  BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DataServiceProvider } from 'src/providers/data-service/data-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products: any[] = [];
  selectedProduct: any;
  productFound:boolean = false;

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private toast: ToastController,
    public dataService: DataServiceProvider) {
      this.dataService.getProducts()
        .subscribe((response)=> {
            this.products = response
            console.log(this.products);
        });
  }

  ngOnInit() {
  }

  scanCode() {
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      //this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
      if(barcodeData.text.length >0) {
        this.productFound = false;
        //console.log(this.selectedProduct);
        this.presentToast(barcodeData.text);
      } else {
        this.selectedProduct = {};
        this.productFound = false;
        this.presentToast('Product not found');
      }
    }, (err) => {
      this.presentToast(err);
    });
  }

  async presentToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
