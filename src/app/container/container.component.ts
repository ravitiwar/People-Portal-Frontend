import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  public isEmployeeVisible = true;

  constructor() {
  }

  ngOnInit(): void {
  }


  public switchResource(): void {
    this.isEmployeeVisible = !this.isEmployeeVisible;
  }

}