import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Template.body.helpers({

    noGreeting: function() {

        if(Meteor.user()) {

            return !Meteor.user().profile.greeting;
        }
        
    },

    notLogin: function() {

        return !Meteor.user();
    },

    getGreeting: function() {

        if(Meteor.user()) {
            return Meteor.user().profile.greeting;
        }
    },


});

