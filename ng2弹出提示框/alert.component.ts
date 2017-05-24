import { Component, Input, Output, OnChanges, EventEmitter, trigger, state, style, transition, animate } from '@angular/core';

@Component({
	selector: 'alert',
	templateUrl: 'view/alert.component.html',
	animations: [
	    trigger('alertState', [
			state('active', style({visibility:'visible', opacity:1})),
			state('inactive', style({visibility:'hidden', opacity:0})),
			transition('* => active', animate('200ms ease-in')),
			transition('active => inactive', animate('200ms ease-in'))
	    ])
	  ]
})

export class AlertComponent implements OnChanges {
	@Input() type:string;
	@Input() text:string;
	@Input() state:string;
	@Output() alert = new EventEmitter();
	time:any;

	constructor() {}

	ngOnChanges():void {
		var that = this;
		if (this.type != 'loading') {
			clearTimeout(this.time);
			this.time = setTimeout(function(){
				that.alert.emit();
			}, 3000);
		}
	}
	canncleAlert():void {
		if (this.type != 'loading') {
			clearTimeout(this.time);
			this.alert.emit();
		}
	}

	setClasses():string {
		var className = ''
		switch(this.type) {
			case 'error':
				className = 'weui-icon-error';
				break;
			case 'success':
				className = 'weui-icon-success-no-circle';
				break;
			case 'loading':
				className = 'weui-loading';
				break;
		}
		return className;
	}
}
