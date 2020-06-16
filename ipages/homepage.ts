import { browser, by, element } from 'protractor';

export class HomePage {
    firstNumber = element(by.model('first'));
    secondNumber = element(by.model('second'));
    goButton = element(by.id('gobutton'));
    latestResult = element(by.binding('latest'));
    history = element.all(by.repeater('result in memory'));
    
    get(url){
        browser.get(url);
    };

    browserTitle(){
        return browser.getTitle();
    };

    add(a,b) {
        this.firstNumber.sendKeys(a);
        this.secondNumber.sendKeys(b);
        this.goButton.click();
    };

}