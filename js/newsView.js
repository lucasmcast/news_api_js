import { NewsController } from "./newsController.js";
import { CardModel } from "./cardModel.js";
import { News } from "./newsModel.js";

/**Class responsible for renders data in the html page and call class NewsController
 * @author Lucas Martins de Castro <lucas.martins.c03@gmail.com>
 * @since 1.0.0
 * 
 */
export class NewsView{

    constructor(){
        this.controller = new NewsController();
    }

    /**Render the news call methodo createCards whith parameter data, nameButton and callback*/
    async renderNews(){
        const response = await this.controller.getTopNewsApi();
        let data = response.articles
        this.createCards(data, "Salvar", (noticia) => {
            this.clickBotao(noticia);
        })
    }

    /**Creates cards in the html page by length data from api
     * @param {Object} data - data returns from api 
     * @param {String} nameButton - name for to create button
     * @param {Function} callback - Function callback click button
     */
    createCards(data, nameButton, callback){
        let loader = document.getElementById("loader");
        loader.style.display = "none";
        //console.log(data)
        let news = [];
        let qtdData = data.length;
        //console.log(qtdData)
        for(let i=0; i < qtdData; i++){
            let card = new CardModel();
            let buttonSalvar = card.createButton(nameButton);
            card.createCard(buttonSalvar);
            let noticia = new News();
            noticia.setTitle(data[i].title)
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
    clickBotao(news){
        this.controller.save(news);
        //console.log(noticia.getContent())
    }
    /**
     * Fill cards with data from api after of criating cards
     * @param {News} news - Class News Object
     * @param {Function} callback - Function callback click button
     * @see NewsView.createCards()
     */
    setNewsCards(news, callback){
        const container = document.getElementsByClassName("container");
        
        for(let i=0; i < news.length; i++){
            var cards = container.cards.children;
            let card = cards[i]
            let contentCard = card.querySelectorAll("div");
            contentCard[0].children[0].children[0].href = news[i].getUrl();
            contentCard[0].children[0].children[0].innerHTML = news[i].getTitle();

            
            let content = contentCard[1].children
            content[0].innerHTML = news[i].getDescription();
            content[1].src = news[i].getUrlImage();

            let footer = contentCard[2].children;
            //console.log(footer);
            footer[0].innerHTML = news[i].getPublishedAt();
            footer[1].innerHTML = news[i].getAuthor();
            let noticia = news[i]
            footer[2].addEventListener('click', () => {
                callback(noticia);
            });
        }  
        
    }
}

