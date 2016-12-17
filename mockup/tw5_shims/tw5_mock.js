/** A mockup of the relevant bits of the TiddlyWiki 5 tiddler store API so
 *  I can prototype and develop without hitting a brick wall due to the lack
 *  of documentation on TiddlyWiki's rendering architecture.
 */

// Use a closure to avoid polluting the outer namespace
(function(globals) {
    var tiddlers = [];

    $tw = {
        Tiddler: function(/* field, ... */) {
            this.fields = Object.create(null);
            // jQuery.extend([deep], target, ...)
            args = [true, this.fields];

            // Doesn't quite match TiddlyWiki's behaviour, but close enough
            // for this mockup.

            jQuery.each([].reverse.apply(arguments), function (idx, arg) {
                args.push((arg instanceof $tw.Tiddler) ? arg.fields : arg);
            });

            jQuery.extend.apply(null, args);
            return this;
        },
        wiki: {
            addTiddler: function(tiddler) {
                // Partially borrowed from TW5/boot/boot.js
                if(!(tiddler instanceof $tw.Tiddler)) {
                    tiddler = new $tw.Tiddler(tiddler);
                }
                tiddlers.push(tiddler);
            },
            generateNewTitle: function(baseTitle,options) {
                    // Borrowed from TW5/core/modules/wiki.js
                    options = options || {};
                    var c = 0,
                        title = baseTitle;
                    while($tw.wiki.tiddlerExists(title) ||
                          $tw.wiki.isShadowTiddler(title)) {
                            title = baseTitle +
                                    (options.prefix || " ") +
                                    (++c);
                    }
                    return title;
            },
            getTiddlersWithTag: function(title) {
                var out = [];
                for(var i=0, l=tiddlers.length; i<l; i++) {
                    var fields = tiddlers[i].fields;
                    if (fields.tags.indexOf(title) >= 0) {
                        out.push(fields.title);
                    }
                }
                return out;
            },
            getTiddler: function(title) {
                for(var i=0, l=tiddlers.length; i<l; i++) {
                    var tiddler = tiddlers[i];
                    if (tiddler.fields.title == title) {
                        return tiddler;
                    }
                }
            },
            isShadowTiddler: function(title) { return false; },
            makeTiddlerIterator: function(titles) {
                return function(callback) {
                    jQuery.each(titles, function(idx, val) {
                        callback($tw.wiki.getTiddler(val), val);
                    });
                };
            },
            tiddlerExists: function(title) {
                return typeof $tw.wiki.getTiddler(title) === "object";
            }
        }
    };
    globals.$tw = $tw;
})(window);
