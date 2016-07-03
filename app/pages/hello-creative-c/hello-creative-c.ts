import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import {GenericRingParameterPage} from '../generic-ring-parameter/generic-ring-parameter';

@Component({
	templateUrl: 'build/pages/hello-creative-c/hello-creative-c.html'
})

export class HelloCreativeCPage {

	selectedTemplate: any;
	templates: Array<{uid: string, title: string, img: string, description: string}>;

	constructor(private nav: NavController, navParams: NavParams) {

		this.templates = [];
		this.templates.push({ uid: 'tagcloud', title: 'Ring Tagcloud', img: 'img/tagcloud.png', description: 'Lorem ipsum dolor sit amet'});
		this.templates.push({ uid: 'recipe', title: 'Drink Rezept', img: 'img/tagcloud.png', description: 'Lorem ipsum dolor sit amet'});

	}

	templateTapped(event, template) {
		this.nav.push(GenericRingParameterPage, {template: template});
	}
}
