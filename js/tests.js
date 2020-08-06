import {NewsView} from './newsView.js'
import { News } from './newsModel.js'
import { NewsController } from './newsController.js';
export class UnitTest{

    constructor(){
        this.testSaveNewsDAO();
    }
    //### Tests Class NewsDAO ###
    testSaveNewsDAO(){
        try{
            let news = new News()
            news.setAuthor("AuthorTest");
            news.setContent("ContentTest");
            news.setDescription("DescriptionTest");
            news.setPublishedAt("PublishedAtTest");
            news.setTitle("TitleTest");
            news.setUrl("URLTest");
            news.setUrlImage("URLImageTest");
            let controller = new NewsController();
            controller.save(news);

            let responseDBByTitle = controller.getByTitle(news.getTitle());
            console.log(responseDBByTitle);

            controller.delete(news.getTitle());

            if (news.getTitle() === responseDBByTitle.title){
                console.log("testSaveNewsDAO() - Success")
            }else{
                console.log("testSaveNewsDAO() - Fail")
            }
        }catch(e){
            console.log("testSaveNewsDAO() - Fail");
        }
    }

    testDeleteNewsDAO(){

    }

    testGetTopNewsApiNewsDAO(){

    }

    testGetAllNewsDBNewsDAO(){

    }

    //### Tests Class NewsView ##
    testRenderNewsNewsView(){

    }

    testCreateCardsNewsView(){

    }

    testSetNewsCardsNewsView(){

    }

    //### Tests Class NewsController ###
    testGetTopNewsApiNewsController(){

    }

    testGetAllNewsDBNewsController(){

    }
    
}