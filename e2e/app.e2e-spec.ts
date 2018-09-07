import { GraphVisualizationPage } from './app.po';

describe('graph-visualization App', () => {
  let page: GraphVisualizationPage;

  beforeEach(() => {
    page = new GraphVisualizationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
