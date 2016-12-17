/** Stuff which doesn't follow TiddlyWiki APIs but will have analogues
 *  provided once I move to a TW5 backend.
 */

$(document).ready(function() {
    axes_tmpl = Handlebars.compile($("#axes-template").html());
    header_tmpl = Handlebars.compile($("#header-template").html());
    new_btn_tmpl = Handlebars.compile($("#new-button-template").html());
    break_tmpl = Handlebars.compile($('#break-template').html());
    card_tmpl = Handlebars.compile($('#card-template').html());
    gem_tmpl = Handlebars.compile($('#gem-template').html());
});
