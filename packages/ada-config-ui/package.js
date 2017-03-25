Package.describe({
  summary: "Blaze configuration templates for Ada OAuth.",
  version: "1.0.1-beta1"
});

Package.onUse(function(api) {
  api.use('templating', 'client');

  api.addFiles('ada_login_button.css', 'client');
  api.addFiles(
    ['ada_configure.html', 'ada_configure.js'], 'client');
});
