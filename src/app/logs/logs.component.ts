import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.serivce';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor(private serverService : ServerService) { }

  ngOnInit() {
  }

}
