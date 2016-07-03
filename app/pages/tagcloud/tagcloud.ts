import {Component} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import {PreviewPage} from '../preview/preview';

@Component({
	templateUrl: "build/pages/tagcloud/tagcloud.html"
})

export class TagCloudPage {

	ringSize: number;
	ringWidth: number;

	currentWord: string;

	words: string[] = ['Aupechaub', 'Blöffsack', 'Bschishung', 'Bünzli', 'Cheib', 'Siech', 'Fötzu', 'Gigu', 'Löu', 'Höseler', 'Püüru', 'Tubu', 'Theresli', 'Süffu', 'Tüpflischisser', 'Vagant', 'Wurzle',  'Süürmu', 'Glünggi', 'Chuderluuri', 'Gumsle', 'Grete', 'Ziger', 'läärs Hemmli', 'Haaghuuri', 'Rüedu', 'Rybise', 'Wyb'	]; 

	constructor(private nav: NavController, navParams: NavParams) {

		this.currentWord = '';

		this.ringSize = navParams.get('ringSize');
		this.ringWidth = navParams.get('ringWidth');

	}

	addWord() {
		this.words.push(this.currentWord);
		this.currentWord = "";
	}

	delete(word) {
		var index = this.words.indexOf(word);
		if (index >-1) {
			this.words.splice(index, 1);
		} 
	}

	onContinue() {
		this.nav.push(PreviewPage, {ringWidth: this.ringWidth, ringSize: this.ringSize, words: this.words});
	}
}