import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() htmlCode: string;
  @Input() typescriptCode: string;
  @Input() cssCode: string;
  @Input() cardTitle: string;

  constructor() {}

  ngOnInit(): void {}
}
