import Ember from 'ember';
import { alias } from '@ember/object/computed';

export default Ember.Controller.extend({
  articles: Ember.A(alias('model.articles')),
  actions: {
    saveArticle(article, url){
      this.send('saveUserArticle', article, url);
    }
  }
});
