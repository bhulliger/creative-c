import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import {TagCloudPage} from '../tagcloud/tagcloud';

@Component({
	templateUrl: 'build/pages/generic-ring-parameter/generic-ring-parameter.html'
})

export class GenericRingParameterPage {

	// provide Angular with metadata about things it should inject in the constructor
	static get parameter() {
		return [[NavController], [NavParams]];
	}

	ringSize: number = 56;
	ringWidth: number = 5;
	template: any;

	constructor(private nav: NavController, navParams: NavParams) {
		this.template = navParams.get('template');
	}

	onContinue(event) {
		if (this.template.uid === 'tagcloud') {
			this.nav.push(TagCloudPage, {ringWidth: this.ringWidth, ringSize: this.ringSize});
		} else {
			alert('unknown template: ' + this.template.uid);
		}
		
	}
}