import { Meteor } from 'meteor/meteor';

import {Buildings} from '../imports/api/Buildings.js';



  "use strict";


Meteor.startup(function () {


  if (Meteor.users.find().fetch().length === 0) {

    console.log('Creating users: ');

    var users = [
        {name:"test",email:"test@example.com",roles:[]},
        {name:"specialist",email:"specialist@example.com",roles:['specialist-role']},
        {name:"manager",email:"manager@example.com",roles:['manager-role']},
        {name:"Admin",email:"admin@example.com",roles:['admin']}
      ];

    _.each(users, function (userData) {
      var id,
          user;

      console.log(userData);

      id = Accounts.createUser({
        email: userData.email,
        password: "apple1",
        profile: { name: userData.name }
      });

      // email verification
      Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

      Roles.addUsersToRoles(id, userData.roles);

    });
  }




  Meteor.methods({
    'addNewUser': function(userData) {
      var id = Accounts.createUser({
          email: userData.email,
          password: userData.pwd,
          profile: { name: userData.name }
        });
      Roles.addUsersToRoles(id, userData.role);
    },
    'save_image':function(imgData){
      var userId = imgData.userId;
      var imgPublicId = imgData.imgPublicId;
      var result = Meteor.users.update({_id:userId},
        {$set:{'profile.imgPublicId':imgPublicId}}

      );
      return "success";
  	}
  });


});


     // Authorized users can manage user accounts
     Meteor.publish("users", function () {
       var user = Meteor.users.findOne({_id:this.userId});

       if (Roles.userIsInRole(user, ["admin","manager-role"])) {
         return Meteor.users.find();
       }
       else{
         return user;
       }

       this.stop();
       return;
     });

     Meteor.publish("allUsers", function(){
       if (Roles.userIsInRole(user, ["admin"])) {
           return Meteor.users.find();
       }
       this.stop();
       return;
     });
