import {Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import {ConfirmationPage} from '../confirmation/confirmation';

@Component({
	templateUrl: 'build/pages/order/order.html'
})

export class OrderPage {

	dataUrl: string;

	person: Person;

	constructor(private nav: NavController, navParams: NavParams) {
		this.dataUrl = navParams.get('dataUrl');

		this.person = new Person();
	}

	onSend() {
		// TODO post image

		this.nav.push(ConfirmationPage);
	}

}

export class Person {
	firstname: string;
	lastname: string;
	address: string;
	zip: number;
	city: string;
	phone: string;
}