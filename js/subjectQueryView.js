import { CardModel } from "./cardModel.js";
import { NewsView } from "./newsView.js";
import { NewsController } from "./newsController.js";

export class SubjectQueryView {
  constructor() {
    this.controller = new NewsController();
    this.view = new NewsView();
    this.card = new CardModel();
  }
  async renderQuery() {
    let querySubject = document.getElementById("subject-input").value;
    const response = await this.controller.getSubjectQueryNewsApi(querySubject);
    let data = response.articles;
    this.createCards(data, "Salvar", (noticia) => {
      this.clickBotao(noticia);
    });
  }
}
