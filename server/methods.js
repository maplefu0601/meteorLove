
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Accounts } from 'meteor/accounts-base';
import { Utility } from './utility.js';


Meteor.methods({

    sendEmail(to, from, subject, text, attachment) {
        //check([to, from, subject, text], [String]);

        this.unblock();

        Email.send({ to, from, subject, text });
    },

    loginFromEmail(email, token) {

        var user = Accounts.user.find({'username':email});
        if(user) {
            return {
                active: user.profile.active,
                greeting: user.profile.greeting
            }
        }
    },

    generateToken() {
        
        return Accounts._generateStampedLoginToken();
    },

    createEmailUser(option, emailData) {

        var user = Meteor.users.findOne({username: option.username});
        if(!user) {
            user = {};
            user._id = Accounts.createUser(option);
        }
        var proc = new Utility();
        var token = proc.generateToken();
        console.log('---user:', user);
        if(user) {
            Accounts._insertLoginToken(user._id, token);

            var link = 'signin/' + token.token;
            emailData.text = 'Click below link to sign in ' + Meteor.absoluteUrl() + link;

            Meteor.call('sendEmail', emailData.to, emailData.from, emailData.subject, emailData.text);
            console.log('email sent:', emailData);

        }
        console.log('user created:', user);

        return token;

    },

    getGreeting() {

        if(Meteor.user()) {
            return Meteor.user().profile;
        }
    },

    setGreeting(value) {

        if(Meteor.user()) {
            var id = Meteor.user()._id;
            var profile = Meteor.user().profile;
            profile.greeting = value;
            Meteor.users.update({_id: id}, {$set: {profile: profile}});
        }
    },
});