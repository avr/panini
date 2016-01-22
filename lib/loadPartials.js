var fs    = require('fs');
var path  = require('path');
var utils = require('./utils');

/**
 * Looks for files with .html, .hbs, or .handlebars extensions within the given directory, and adds them as Handlebars partials matching the name of the file.
 * @param {string} dir - Folder to check for partials.
 */
module.exports = function(dir) {
  var partials = utils.loadFiles(dir, '**/*.{html,hbs,handlebars}');

  for (var i in partials) {
    var fp = partials[i];
    var ext = path.extname(fp);
    var file = fs.readFileSync(fp);
    var name = path.basename(fp, ext);

    if (fp.indexOf('html-includes') !== -1) {
        var basename = path.basename(fp, path.extname(fp));
        fp = fp.split('html-includes/').pop(1);
        name = path.join(path.dirname(fp), basename);
    }

    this.Handlebars.registerPartial(name, file.toString() + '\n');
  }
}
