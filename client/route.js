Router.route('/', function() {
    this.render('Home');
});

Router.route('/about', function() {
    this.render('aboutPage');
});

Router.route('/login', function() {
    this.render('login');
    
});

Router.route('/signin/:loginToken', function() {

    var token = this.params.loginToken;
    console.log('return token:', token);

    Meteor.loginWithToken(token);

    Router.go('/');


});

