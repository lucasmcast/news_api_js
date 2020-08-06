import { NewsDAO } from "./newsDAO.js";

/**
 * Class makes the control between the views and DAO class 
 * @author Lucas Martins de Castro <lucas.martins.c03@gmail.com>
 * @since 1.0.0
 */
export class NewsController{

    constructor(){
        this.newsDao = new NewsDAO()
    }
    
    /**
     * Get data from API
     * @link <https://newsapi.org>
     * @returns JSON
     */
    async getTopNewsApi(){
        var response = await this.newsDao.getTopNewsApi();
        const data = await response.json();
        return data;
    }

    /**
     * 
     * @param {News} news - Class Model News
     */
    save(news){
        this.newsDao.save(news);
    }

    /**
     * Get Data by title of news
     * @param {String} title 
     */
    async getByTitle(title){
        let response = await this.newsDao.getByTitle(title);
        return response;
    }

    /**
     * Get Data from database
     * @returns Promise
     */
    getAllNewsDB(){
        var response = this.newsDao.getAllNewsDB();
        return response;
    }

    /**
     * Delete data of database
     * @param {News} news - Class Model News
     */
    delete(news){
        let title = news.getTitle()
        this.newsDao.delete(title);
    }
}