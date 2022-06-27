import { Component, Input, OnInit } from '@angular/core';
import { Condition } from 'src/app/models/condition.model';
import { Compare } from 'src/app/models/compare.model';
import { HandSide } from 'src/app/models/hand-side.model';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  @Input() compare!: Compare;
  @Input() condition!: Condition;

  handside :any
  constructor() { }

  ngOnInit(): void {
    this.compare
  }


  get setLeftHandSide(){
    // this.handside = {
    //   name : this.compare.leftHandSide?.value,
    //   value: this.compare.leftHandSide?.value
    // }
    this.handside = {
      name : 'vocab1',
      value: 'vocab1',
    }
    return this.handside
  }
}
