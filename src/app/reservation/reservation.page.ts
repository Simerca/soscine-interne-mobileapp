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

    this.initItem();

  }

  initItem(){
    this.sub = this.route.params.subscribe(param => {
      this.id = param['id'];
      this.http.get('https://cyberudresh.unet.dev/index.php/api/items_reservations/'+this.id).subscribe(data => {
      this.data = data;
      });
    });
  }

  launchScan(id){
    this.barcodeScanner.scan().then(barcodeData => {
      this.result = barcodeData;
      var postData = {
        'item_id':id,
        'n_serie':this.result.text
      }
      this.http.post('https://cyberudresh.unet.dev/index.php/api/set_items_number/', postData,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        }).subscribe(data => {
          
      });
     }).catch(err => {
         console.log('Error', err);
         this.toastCtrl.create({
           message:err.message
         })
     });

  }

  

}
