import { Template } from 'meteor/templating';
import './users.html';


Template.users.onCreated(function BodyOnCreated(){
  Meteor.subscribe("users");
});


Template.users.helpers({
   usersData: function(){
     console.log(Meteor.users.find().fetch());
     return Meteor.users.find().fetch();
   },
   lName: function(){
      return this.profile.name;
   },
   id: function(){
     return  this._id;
   },
   email: function(){
      return this.emails[0].address
   },
   role: function () {
     if (!this.roles) {
       return '<none>'
     }
     return this.roles.join(',')
   },
   fullName: function(){
     return "FIO"
   }
});

function clearForm(){
  $('#userLogin').val('');
  $('#userEmail').val('');
  $('#userPwd').val('');
  $('#userRole').val('');
}

Template.users.events({
  'click #addUser': function(e,t) {
    e.preventDefault();
    var userData = {};
    userData.name = t.find('#userLogin').value;
    userData.email = t.find('#userEmail').value;
    userData.pwd = t.find('#userPwd').value;
    userData.role = t.find('#userRole').value;

    Meteor.call('addNewUser', userData, function(err){
      if (err) {
        Bert.alert({
          title: 'Ошибка',
          message: err.reason,
          type: 'warning',
          style: 'growl-top-right',
          icon: 'fa-times'
        });
        console.log(err.reason);

      } else {
        Bert.alert({
          title: 'Создание пользователя',
          message: 'Сохранено успешно',
          type: 'info',
          style: 'growl-top-right',
          icon: 'fa-floppy-o'
        });
        clearForm();
      }
    });
  },
});
