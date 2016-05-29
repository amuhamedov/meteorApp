"use strict"
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';



var userSection = FlowRouter.group({
     name: 'client',
});


userSection.route('/', {
  action: function() {
    BlazeLayout.render("index", { content: "welcomePage"});
  }
});

userSection.route('/programs', {
  action: function() {
    BlazeLayout.render("index", { content: "programs"});
  }
});

userSection.route('/programs/edit/:itemId', {
  action: function() {
    BlazeLayout.render("index", { content: "editProgram"});
  }
});

userSection.route('/programs/create', {
  action: function() {
    BlazeLayout.render("index", { content: "createProgram"});
  }
});

userSection.route('/profile', {
  action: function() {
    BlazeLayout.render("index", { content: "profile"});
  }
});

userSection.route('/programs/delete/:itemId', {
  action: function() {
    var _id = this.getParam("itemId");
    Meteor.call('removeBuilding', _id, function(err){
      if (err) {
        console.log(err.reason);
        FlowRouter.go('/programs');
      } else {
        Bert.alert({
          title: 'Уведомление',
          message: 'Запись удалена',
          type: 'info',
          style: 'growl-top-right',
          icon: 'fa-floppy-o'
        });
        FlowRouter.go('/programs');
      }
    });
  }
});


var signout = function () {
  console.log('logging out...');
  Meteor.logout(function () {
    console.log('...done');
    Meteor.navigateTo('/');
  });
};

Meteor.navigateTo = function (path) {
  FlowRouter.go(path)
}

FlowRouter.route('/signout', {
    action: signout
});




var adminSection = FlowRouter.group({
    name: 'admin',
});

adminSection.route('/manageUsers', {
  action: function() {
    BlazeLayout.render("index", { content: "users"});
  }
});


var isLoggedIn = function(context, redirect){
    if(!Meteor.userId()){
        FlowRouter.go('auth');
    }
};
