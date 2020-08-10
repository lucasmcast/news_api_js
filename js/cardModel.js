/**
 * Class responsible for creating cards in the html page
 * 
 * @since 1.0.0
 * 
 * @author Lucas Martins de Castro <lucas.martins.c03@gmail.com>
 * 
 */
export class CardModel{

    constructor(){
        this.cards = document.getElementById("cards")
    }

    /**
     * Creates card for render in the page
     * 
     * @param {DOMElement} button button of card
     */
    createCard(news, button){
        const link = React.createElement('a', {href: news.getUrl()}, news.getTitle());
        const title = React.createElement('span', null, link);
        const cardHeader = React.createElement(
            'div', 
            {
                className: "card-header"
            }, 
            [title]
        );
        
        const description = React.createElement('p', null, news.getDescription());
        const img = React.createElement('img', {src: news.getUrlImage()});
        
        const cardContent = React.createElement(
            'div', 
            {
                className: "card-content"
            }, 
            [description, img]
        );
        
        const published = React.createElement('span', {className : 'card-published'}, news.getPublishedAt());
        const author = React.createElement('span', {className: 'card-author'}, news.getAuthor());
        
        /* button.addEventListener("click", function() {
            callback(news);
        }); */
        
        const cardFooter = React.createElement(
            'div',
            {
                className : "card-footer"
            },
            [published, author, button]
        );
        const card = React.createElement(
            'div', 
            {
                className: "card"
            }, 
            [cardHeader, cardContent, cardFooter]
        );


        return card;
    } 
    
    setCards(cards){
        ReactDOM.render(cards, this.cards)
    }
    /**
     * Creates button and put button value and creates class css
     * 
     * @param {String} nameButton name of button for creates class css and button value
     * 
     * @returns DOMElement  
     */
    createButton(nameButton, callback, news){
        let button = React.createElement(
            'button', 
            {
                className: 'btn-'+nameButton.toLocaleLowerCase(),
                onClick: () => {callback(news)}
            }, 
            nameButton);
        return button;
    }

}