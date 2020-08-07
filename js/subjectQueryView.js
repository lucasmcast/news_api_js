import { NewsController } from "./newsController.js";
import { NewsView } from "./newsView.js";

export class SubjectQueryView {
  constructor() {
    this.controller = new NewsController();
    this.view = new NewsView();
  }
  async renderQuery() {
    const data = await this.controller.getAllNewsDB();
    this.view.createCards(data, "Apagar", (news) => {
      this.clickBotao(news);
    });
  }
}
