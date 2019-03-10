import Ember from 'ember';

export default Ember.Controller.extend({
  username: null,
  password: null,

  actions: {
    createUser(){
      let username = this.get('username');
      let password = this.get('password');
      this.send('createNewUser', username, password);
    }
  }
});
