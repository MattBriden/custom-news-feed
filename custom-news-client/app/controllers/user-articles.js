import Ember from 'ember';
import { alias } from '@ember/object/computed';

export default Ember.Controller.extend({
  userArticles: Ember.A(alias('model.userArticles')),
  actions: {
    removeArticle(article) {
      this.send('removeUserArticle', article);
    }
  }
});
