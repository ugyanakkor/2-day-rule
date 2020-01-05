import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-challenge',
    templateUrl: './challenge.component.html',
    styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent{
   @Input() message: string;
   @Output() close = new EventEmitter<void>();

   onClose(){
       this.close.emit();
   }
}