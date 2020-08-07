import { NewsView } from "./newsView.js";
import { FavoritesView } from "./favoritesView.js";
import { SubjectQueryView } from "./subjectQueryView.js";
import { UnitTest } from "./tests.js";
/**
 * Class responsible for initializing the application
 *
 * @since 1.0.0
 *
 * @author Lucas Martins de Castro <lucas.martins.c03@gmail.com>
 */
class App {
  constructor() {
    this.route(window.location.pathname);
    //console.log(window.location.pathname)
  }
  /**
   * Instantiate the class responsible for rendering the page,
   * through the path accessed.
   *
   * @param {String} pathname path of route
   */
  route(pathname) {
    switch (pathname) {
      case "/index.html":
        let view = new NewsView();
        view.renderNews();
        break;
      case "/favorites.html":
        let favorites = new FavoritesView();
        favorites.renderView();
        break;
      case "/subjectQueryResult.html":
        let queryResult = new SubjectQueryView();
        queryResult.renderQuery();
        break;
    }
  }
}

new App();
//new UnitTest();
window.onload = () => {
  "use strict";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js");
  }
};
