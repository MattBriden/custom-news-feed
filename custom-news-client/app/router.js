import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('sources', {path: '/'});
  this.route('articles');
  this.route('new-user');
  this.route('user-articles');
});

export default Router;
