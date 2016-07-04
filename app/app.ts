import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {HelloCreativeCPage} from './pages/hello-creative-c/hello-creative-c';
import {AboutPage} from './pages/about-page/about-page';
import {ContactPage} from './pages/contact-page/contact-page';
 

@Component({
  templateUrl: 'build/app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HelloCreativeCPage;
  pages: Array<{ title: string, component: any }>;

  constructor(private platform:Platform, private menu: MenuController) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
    	{ title: 'Creative-C', component: HelloCreativeCPage },
      { title: 'Über mich', component: AboutPage },
      { title: 'Kontakt', component: ContactPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // okay, so the platform is ready and our plugins are available.
      // here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
  	// close the menu when clicking a link from the menu.
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp)
