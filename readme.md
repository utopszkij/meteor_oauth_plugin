# accounts-ada

A login service for http://adatom.hu. 

You can install tree packages:
accounts-ada
ada-oauth
ada-config-ui

Process:

1. if run meteor service then stop meteor service

2. copy tree subfolder into yourAppPath/packages folder

3. add tree package your site/.meteor/packages file

6. in command line: meteor run

7. Install applycation into ADA server

   callback url: https://yourdomain:yourport/_oauth/ada

           vagy: https://yourdomain/_oauth/ada
   remember: appy Key and appy secret code!

8. navigate your meteor site into browser

8. click "sign in"

9. click "configure ada login"


Teszt site: http://valasztoimozgalom.hu:3000

# Make ADA login button:

define button in in template html:
```html  
  <button id="adaLoginBtn">ADA login</button>
```

define event handler in template js:

```javascript
"click #adaLoginBtn": function(event) {
	var config = ServiceConfiguration.configurations.findOne({service: 'ada'});
	var loginUrl =
		    'https://adatom.hu/ada/v1/oauth2/auth?client_id=' + config.appId +
		    '&redirect_uri=' + OAuth._redirectUri('ada', config) +
		    '&display=' + display + '&scope=' + scope +
		    '&state=' + OAuth._stateParam(loginStyle, credentialToken, options && options.redirectUrl);
	window.open(loginRl,'ADA login','width=500,height=500,left=100,top=100');
}
```

