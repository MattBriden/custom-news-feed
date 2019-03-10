import Ember from 'ember';
import {inject as service} from '@ember/service';

export default Ember.Route.extend({
  ajax: service(),

  actions: {
    createNewUser(username, password) {
      this.get('ajax').request('/users', {
          method: 'POST',
          data: {
            username: username,
            password: password
          }
        }).then(() => {
          alert('User successfully created!')
        }).catch((error) => {
          Ember.Logger.error(error);
          alert('Error creating user.')
        }).finally(() =>{
          this.transitionTo('login');
        });
    }
  }
});
