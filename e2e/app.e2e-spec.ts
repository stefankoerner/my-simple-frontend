import { MySimpleFrontendPage } from './app.po';

describe('my-simple-frontend App', () => {
  let page: MySimpleFrontendPage;

  beforeEach(() => {
    page = new MySimpleFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
