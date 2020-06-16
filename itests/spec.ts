import {HomePage} from '../ipages/homepage';
import { browser } from 'protractor';

let homePage = new HomePage();
describe('Protractor Demo App', function() {

  beforeEach(function() {
    homePage.get('http://juliemr.github.io/protractor-demo/');
  });

  it('should have a title', function() {
    expect(homePage.browserTitle()).toEqual('Super Calculator');
  });

  it('should add one and two', function() {
    homePage.add(1,2);

    expect(homePage.latestResult.getText()).toEqual('3');
  });
  
  it('should add four and six', function() {
    homePage.add(4,6);

    expect(homePage.latestResult.getText()).toEqual('10');
  });

  it('should read the value from an input', () => {
    homePage.firstNumber.sendKeys(1);
    expect(homePage.firstNumber.getAttribute('value')).toEqual('1');
  });

  it('should have a history', () => {
    homePage.add(1,2);
    homePage.add(3,4);
    
    expect(homePage.history.count()).toEqual(2);

    homePage.add(5,6);

    expect(homePage.history.count()).toEqual(3);
  });

  it('should have a history containing...', () => {
    homePage.add(1,2);
    homePage.add(3,4);

    expect(homePage.history.last().getText()).toContain('1 + 2');
    expect(homePage.history.first().getText()).toContain('3 + 4');
  });
});