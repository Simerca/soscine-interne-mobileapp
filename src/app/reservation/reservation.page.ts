import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {

  id:any;
  data:any;
  constructor(
    private route: ActivatedRoute,
    private http:HttpClient,
    private barcodeScanner:BarcodeScanner
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
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });

  }

  

}
