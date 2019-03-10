import Ember from 'ember';
import {inject as service} from '@ember/service';

export default Ember.Route.extend({
  authService: service(),
  login: true,

  beforeModel(){
    this.get('authService').setAuthToken(null);
  },

  actions: {
    authenticate(username, password) {
      this.get('authService').authenticate(username, password).then((token) => {
        this.get('authService').setAuthToken(token);
        this.transitionTo('/');
      }, (err) => {
        Ember.Logger.error(err);
        alert("Login Failed");
      });
    }
  }
});
