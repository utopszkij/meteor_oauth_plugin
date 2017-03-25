Package.describe({
  summary: "Ada OAuth flow",
  version: "1.0.1-beta1"
});

Package.onUse(function(api) {
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('underscore', 'server');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.addFiles('ada_client.js', 'client');
  api.addFiles('ada_server.js', 'server');

  api.export('Ada');
});
