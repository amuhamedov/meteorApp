import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './profile.html';

$.cloudinary.config({
  cloud_name:"dmrb3do3k"
});

Template.profile.created = function(){
	Meteor.call("cloudinary_list_all",function(e,list){
		Session.set("image_list",list);
	});
  this.uploadingStarted = new ReactiveVar(false);
}

Template.profile.helpers({
  isStartedUpload: function(){
      return Template.instance().uploadingStarted.get();
  },
  imgPublicId: function(){
    var user = Meteor.user();
    return user.profile.imgPublicId;
  },
  name: function(){
    var user = Meteor.user();
     return user.profile.name;
  },
  email: function(){
    var user = Meteor.user();
     return user.emails[0].address
  },
  role: function () {
    var user = Meteor.user();
    if (!user.roles) {
      return '<none>'
    }
    return user.roles.join(',')
  },
  "displayName":function(){
    return displayName();
  },
  "currentDate":function(){
     return new Date();
  },
	"stuff":function(){
		return {name:"something",_id:"12345"}
	},
	"image_list":function(){
		return Session.get("image_list");
	},
});

function switchOnUploadingImitation(){
  Template.instance().uploadingStarted.set(true);
}

function switchOffUploadingImitation(){
  Template.instance().uploadingStarted.set(false);
  console.log(Template.instance().uploadingStarted.get());
}

Template.profile.events({
  "click #clickChange": function(event, template){
     $("#inputFile").trigger('click');
  },
  "change #inputFile": function(e){
      var files = $("#inputFile")[0].files;
      C.upload_stream(files,function(err){
        if(err.reason){
          Bert.alert({
            title: 'Ошибка',
            message: err.reason,
            type: 'error',
            style: 'growl-top-right',
            icon: 'fa-times'
          });
        }
        else{
          var imgData = {};
          imgData.imgPublicId = err.public_id;
          imgData.userId = Meteor.user()._id;
          Meteor.call('save_image',imgData, function(res){

              if (res) {
              Bert.alert({
                title: 'Error',
                message: res.reason,
                type: 'error',
                style: 'growl-top-right',
                icon: 'fa-times'
              });
            } else {

              Bert.alert({
                title: 'Уведомление',
                message: 'Аватарка обновлена',
                type: 'info',
                style: 'growl-top-right',
                icon: 'fa-floppy-o'
              });

            }
          });
        }
      });
  }
});

_cloudinary.after.update(function(user,file){
	if(file.percent_uploaded === 100 && !file.uploading){
		console.log(file);
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
