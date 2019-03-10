import Ember from 'ember';
import { alias } from '@ember/object/computed';

export default Ember.Controller.extend({
  sources: Ember.A(alias('model.sources')),
  actions: {
    viewSourceArticles(id) {
      this.transitionToRoute('articles', {queryParams: {sourceId: id}});
    }
  }
});
