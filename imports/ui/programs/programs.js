import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './programs.html';
import {Buildings} from '../../api/Buildings.js';

Template.programs.onCreated(function programsOnCreated() {
    Meteor.subscribe("buildings");
});

Template.programs.onRendered(function(){
  this.autorun(function () {
    console.log(Buildings.find().fetch());
  });

});

Template.programs.helpers({
     buildingsData: function(){
        return Buildings.find().fetch();
     }
});
