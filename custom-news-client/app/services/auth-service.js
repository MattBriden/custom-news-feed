import Ember from 'ember';
import {inject as service} from '@ember/service';

export default Ember.Service.extend({
  ajax: service(),
  authToken: null,
  setAuthToken(token){
    this.set('authToken', token);
  },
  authenticate(username, password) {
    return this.get('ajax').request('/login', {
        method: 'POST',
        data: {
          username: username,
          password: password
        }
      }).then((response) => {
        return response.token;
      }).catch((error) => {
        Ember.Logger.error(error);
        throw error;
      });
  },
});
