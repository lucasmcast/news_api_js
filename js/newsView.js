import { NewsController } from "./newsController.js";
import { CardModel } from "./cardModel.js";
import { News } from "./newsModel.js";
import { data } from "./countries-pt.js";

/**Class responsible for renders data in the html page and call class NewsController
 * @author Lucas Martins de Castro <lucas.martins.c03@gmail.com>
 * @since 1.0.0
 */
export class NewsView {
  constructor() {
    this.controller = new NewsController();
    this.addPageFunctionalities();
  }
  addPageFunctionalities = () => {
    let subjectQueryButton = document.getElementById("subject-search-button");
    let countryQueryButton = document.getElementById("country-search-button");
    subjectQueryButton.addEventListener("click", () => {
      let subjectQueryInput = document.getElementById("subject-input").value;
      this.renderSubjectQuery(subjectQueryInput);
    });
    countryQueryButton.addEventListener("click", () => {
      let countryQueryInput = document.getElementById("country-input").value;
      let sigla = this.controller.getAbbreviation(countryQueryInput, data);
      this.renderNewsCountries(sigla);
    });
  };

  async renderSubjectQuery(subjectQueryInput) {
    let info = await this.controller.getSubjectQueryNewsApi(subjectQueryInput);
    let data = info.articles;
    this.createCards(data, "Salvar", (noticia) => {
      this.clickBotao(noticia);
    });
  }
  async renderNewsCountries(sigla) {
    let info = await this.controller.getCountryQueryNewsApi(sigla);
    let data = info.articles;
    this.createCards(data, "Salvar", (noticia) => {
      this.clickBotao(noticia);
    });
  }
  /**Render the news call methodo createCards whith parameter data, nameButton and callback*/
  async renderNews() {
    const response = await this.controller.getTopNewsApi();
    let data = response.articles;
    this.createCards(data, "Salvar", (noticia) => {
      this.clickBotao(noticia);
    });
  }

  hideCards(cardsList) {
    let i;
    for (i = 0; i < cardsList.length; i++) {
      this.hideCard(cardsList[i]);
    }
  }

  hideCard(card) {
    card.remove();
  }
  /**Creates cards in the html page by length data from api
   * @param {Object} data - data returns from api
   * @param {String} nameButton - name for to create button
   * @param {Function} callback - Function callback click button
   */
  createCards(data, nameButton, callback) {
    let loader = document.getElementById("loader");
    loader.style.display = "none";
    document.getElementById("cards").innerHTML = "";
    let news = [];
    let qtdData = data.length;
    for (let i = 0; i < qtdData; i++) {
      let card = new CardModel();
      let buttonSalvar = card.createButton(nameButton);
      card.createCard(buttonSalvar);
      let noticia = new News();
      noticia.setTitle(data[i].title);
      noticia.setAuthor(data[i].author);
      noticia.setContent(data[i].content);
      noticia.setDescription(data[i].description);
      noticia.setPublishedAt(data[i].publishedAt);
      noticia.setUrlImage(data[i].urlToImage);
      noticia.setUrl(data[i].url);

      news.push(noticia);
    }
    this.setNewsCards(news, callback);
  }

  /**Perform button action when clicking, in this case, saves data in the database.
   * @param {News} news - Class MOdel news
   */
  clickBotao(news) {
    this.controller.save(news);
  }
  /**
   * Fill cards with data from api after of criating cards
   * @param {News} news - Class News Object
   * @param {Function} callback - Function callback click button
   * @see NewsView.createCards()
   */
  setNewsCards(news, callback) {
    const container = document.getElementsByClassName("container");

    for (let i = 0; i < news.length; i++) {
      var cards = container.cards.children;
      let card = cards[i];
      let contentCard = card.querySelectorAll("div");
      contentCard[0].children[0].children[0].href = news[i].getUrl();
      contentCard[0].children[0].children[0].innerHTML = news[i].getTitle();
      let content = contentCard[1].children;
      content[0].innerHTML = news[i].getDescription();
      content[1].src = news[i].getUrlImage();

      let footer = contentCard[2].children;
      footer[0].innerHTML = news[i].getPublishedAt();
      footer[1].innerHTML = news[i].getAuthor();
      let noticia = news[i];
      footer[2].addEventListener("click", () => {
        callback(noticia);
      });
    }
  }
}
