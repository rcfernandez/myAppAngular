import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.scss']
})
export class StatusFormComponent implements OnInit {

  constructor() { }

  @Input() source;

  ngOnInit(): void {


  }

}
