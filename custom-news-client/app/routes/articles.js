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
        this.transitionTo('login');
      })
    });
  }
});
