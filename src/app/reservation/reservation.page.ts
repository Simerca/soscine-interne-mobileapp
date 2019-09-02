import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  id:any;
  result:BarcodeScanResult;
  data:any;
  constructor(
    private route: ActivatedRoute,
    private http:HttpClient,
    private barcodeScanner:BarcodeScanner,
    private toastCtrl: ToastController,
  ) { }

  sub:any;

  ngOnInit() {

    this.sub = this.route.params.subscribe(param => {
      this.id = param['id'];
      this.http.get('https://cyberudresh.unet.dev/index.php/api/items_reservations/'+this.id).subscribe(data => {
      this.data = data;
    });
    });

  }

  launchScan(){

    this.barcodeScanner.scan().then(barcodeData => {
      this.result = barcodeData;
     }).catch(err => {
         console.log('Error', err);
         this.toastCtrl.create({
           message:err.message
         })
     });

  }

  

}
