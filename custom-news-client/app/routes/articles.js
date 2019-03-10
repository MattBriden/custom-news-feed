import Ember from 'ember';
import { hash } from 'rsvp';
import {inject as service} from '@ember/service';

export default Ember.Route.extend({
  queryParams: {
    sourceId: {
      refreshModel: true
    }
  },
  authService: service(),
  ajax: service(),

  model(params){
    let authToken = this.get('authService.authToken');
    return hash({articles : this.get('ajax').request('/articles/' + params.sourceId, {
        method: 'GET',
        namespace: '/news',
        headers: {
          'Authorization' : authToken
        }
      }).then((response) => {
        return response;
      }).catch((error) => {
        Ember.Logger.error(error);
        this.transitionTo('login');
      })
    });
  },

  actions: {
    saveUserArticle(article, url){
      let authToken = this.get('authService.authToken');
      this.get('ajax').request('/articles', {
          method: 'POST',
          namespace: '/news',
          data: {
            article: article,
            url: url
          },
          headers: {
            'Authorization' : authToken
          }
        }).then(() => {
          alert('Article successfully saved!')
        }).catch((error) => {
          Ember.Logger.error(error);
          alert('Error saving article.')
        });
    }
  }
});
