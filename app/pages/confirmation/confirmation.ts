import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import {HelloCreativeCPage} from '../hello-creative-c/hello-creative-c';

@Component({
	templateUrl: 'build/pages/confirmation/confirmation.html'
})

export class ConfirmationPage {

	constructor(private nav: NavController, navParams: NavParams) {


	}

	onHome() {
		this.nav.setRoot(HelloCreativeCPage);
	}

}