import Ember from 'ember';

export default Ember.Controller.extend({
  username: null,
  password: null,

  actions: {
    submit(){
      let username = this.get('username');
      let password = this.get('password');
      this.send('authenticate', username, password);
    }
  }
});
