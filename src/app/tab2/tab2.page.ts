import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public data:any;
  public myDate:any;

  constructor(
    private http:HttpClient,
    private datePipe:DatePipe,
    private router:Router
  ) {}

  ngOnInit(){

    console.log('On Init');
    this.http.get('https://cyberudresh.unet.dev/index.php/api/reservations').subscribe(data => {
      this.data = data;
    });

  }

  search(e){
    let newDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(newDate);
    console.log(this.myDate);
    console.log(e);
    var value = e.detail.value;
    this.http.get('https://cyberudresh.unet.dev/index.php/api/reservations/'+newDate).subscribe(data => {
      this.data = data;
    });
  }

  goToReservation(id){
    this.router.navigate(['/reservation', id])
  }

}
