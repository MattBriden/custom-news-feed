import Ember from 'ember';

export default Ember.Component.extend({
  id: null,
  name: null,
  description: null,
  actions: {
    moveToArticles(){
      let id = this.get('id');
      this.viewSourceArticles(id);
    }
  }
});
