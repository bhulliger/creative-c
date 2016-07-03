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

	words: string[] = ['Affenarsch','Arsch','Aupechaub','Blödmusiker','Blöffsack','Bschishung','Butterkuh','Bünzli','Cheib','Chuderluuri','Dräcksack','Dubu','Dödel','Flachgeist','Fotze','Fötzu','Gigu','Gluggerä','Glünggi','Grasdackel','Greetä','Grete','Gränni','Grüsu','gstuelet','Gumsle','Gumslä','Haaghuuri','Höseler','Kackbatzen','läärs Hemmli','Löu','Müürgu','Pfiffä','Pfiiffeheini','Püüru','Rotzpupsi','Rybise','Rüedu','Sachgsicht','Schafsecku','Schesä','Schlammbrot','Senfgurke','Siech','Sissi','Stürmi','Süffu','Sürmu','Süürmu','Theresli','Tubu','Tüpflischisser','Vagant','Voupfoschte','Wurzle','Wyb','zetermordio','Ziger','Zwätschgä']; 

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