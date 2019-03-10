import Ember from 'ember';
import { hash } from 'rsvp';
import {inject as service} from '@ember/service';

export default Ember.Route.extend({
  authService: service(),
  ajax: service(),

  model(){
    let authToken = this.get('authService.authToken');
    return hash({userArticles: this.get('ajax').request('/articles', {
        method: 'GET',
        namespace: '/news',
        headers: {
          'Authorization' : authToken
        }
      }).then((response) => {
        return response;
      }).catch((error) => {
        this.transitionTo('login');
      })
    });
  },

  actions :{
    removeUserArticle(article){
      let authToken = this.get('authService.authToken');
      this.get('ajax').request('/articles', {
          method: 'DELETE',
          namespace: '/news',
          data: {
            article: article
          },
          headers: {
            'Authorization' : authToken
          }
        }).then(() => {
          this.refresh();
        }).catch((error) => {
          Ember.Logger.error(error);
          alert('Error removing article.')
        });
    }
  }
});
