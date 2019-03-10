import Ember from 'ember';

export default Ember.Component.extend({
  author: null,
  title: null,
  url: null,
  saved: false,
  actions: {
    save(){
      let article = this.get('title');
      let url = this.get('url');
      this.saveArticle(article, url);
    },
    remove() {
      let article = this.get('title');
      this.removeArticle(article);
    }
  }
});
