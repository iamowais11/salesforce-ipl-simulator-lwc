import { LightningElement } from 'lwc';
import getNews from '@salesforce/apex/IplController.getNews';
export default class NewsComp extends LightningElement {

allnews=[];
connectedCallback(){
    this.retrieveNews();
}

retrieveNews(){
    getNews()
        .then(result => {
            
            this.parseNewsJson(result);
        })
        .catch(error => {
            alert('error from news') ;
        });
}


parseNewsJson(newsJson){
    
    let newsObj=JSON.parse(newsJson);
    let newsArticles=newsObj.articles;
    let _news=[];
    newsArticles.forEach(newselem =>{
        _news.push({
            title:newselem.title,
            image:newselem.urlToImage
        });
    });
    this.allnews=_news;

    
}
}
