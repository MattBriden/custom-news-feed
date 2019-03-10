import Ember from 'ember';
import { hash } from 'rsvp';
import {inject as service} from '@ember/service';

export default Ember.Route.extend({
  authService: service(),
  ajax: service(),

  model(){
    let authToken = this.get('authService.authToken');
    return hash({sources: this.get('ajax').request('/sources', {
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