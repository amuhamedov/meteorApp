import { Template } from 'meteor/templating';
import './index.html';

Template.index.events({
  "click #menu-toggle": function(event, template){
      event.preventDefault();
      $("#wrapper").toggleClass("active");
  }
});

Template.signin.rendered = function () {
  // auto-trigger accounts-ui login form dropdown
  Accounts._loginButtonsSession.set('dropdownVisible', true);
};


Template.header.helpers({
  displayName: function () {
    return displayName();
  }
});


function displayName (user) {
  var name;
  if (!user) {
    user = Meteor.user();
  }

  if (!user) return "<missing user>";

  if (user.profile) {
    name = user.profile.name;
  }

  if ('string' === typeof name) {
    name = name.trim();
  } else {
    name = null;
  }

  if (!name && user.emails && user.emails.length > 0) {
    name = user.emails[0].address;
  }
  return name || "<missing name>";
}
