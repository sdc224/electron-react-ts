/* eslint jest/expect-expect: off, jest/no-test-callback: off */
import { ClientFunction, Selector } from 'testcafe';
import { getPageUrl } from './helpers';

const getPageTitle = ClientFunction(() => document.title);
const counterSelector = Selector('[data-tid="counter"]');
const buttonsSelector = Selector('[data-tclass="btn"]');
const clickToCounterLink = t =>
  t.click(Selector('a').withExactText('to Counter'));
const incrementButton = buttonsSelector.nth(0);
const decrementButton = buttonsSelector.nth(1);
const getCounterText = () => counterSelector().innerText;
const assertNoConsoleErrors = async t => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`Home Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors);

test('e2e', async t => {
  await t.expect(getPageTitle()).eql('Gittian');
});

test('should open window and contain expected page title', async t => {
  await t.expect(getPageTitle()).eql('Gittian');
});

test(
  'should not have any logs in console of main window',
  assertNoConsoleErrors
);

test('should navigate to Counter with click on the "to Counter" link', async t => {
  await t
    .click('[data-tid=container] > a')
    .expect(getCounterText())
    .eql('0');
});

test('should navigate to /counter', async t => {
  await t
    .click('a')
    .expect(getPageUrl())
    .contains('/counter');
});

fixture`Counter Tests`
  .page('../../app/app.html')
  .beforeEach(clickToCounterLink)
  .afterEach(assertNoConsoleErrors);

test('should display updated count after the increment button click', async t => {
  await t
    .click(incrementButton)
    .expect(getCounterText())
    .eql('1');
});

test('should display updated count after the decrement button click', async t => {
  await t
    .click(decrementButton)
    .expect(getCounterText())
    .eql('-1');
});

test('should back to home if back button clicked', async t => {
  await t
    .click('[data-tid="backButton"] > a')
    .expect(Selector('[data-tid="container"]').visible)
    .ok();
});
