import { NewsController } from "./newsController.js";

export class SubjectQueryView {
  constructor() {
    this.controller = new NewsController();
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
