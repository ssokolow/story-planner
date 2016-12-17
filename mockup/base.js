// Use a closure to avoid polluting the outer namespace
(function($) {
    var applyToggle = function(targetState, scopeSelector, myself) {
        var scope;
        var closure = function() {
            var scope;
            if (myself) {
                scope = $(this).parents(scopeSelector);
            } else {
                scope = $(scopeSelector);
            }

            // Prevent animations from backlogging via stop(true, false)
            scope.find('.body').stop(true, false
                )[ targetState ? 'slideDown' : 'slideUp' ]();
            scope.find('.tw-collapse')[ targetState ? 'show' : 'hide' ]();
            scope.find('.tw-expand')[ targetState ? 'hide' : 'show' ]();
        };
        return closure;
    };

    // NOTE: In TiddlyWiki, this would probably handle all collapsers and
    //       listen on tiddler open events to add the widgets to new ones.
    var GlobalCollapserWidget = function() {
        self = this;

        // Global Expand/Collapse Toggle
        // XXX: Do we want an "invert collapsed" button like we used to
        // have via this? --> $('.tw-tiddler-frame > .body').slideToggle();
        $("#global-collapse").click(applyToggle(false, 'body'));
        $("#global-expand").click(applyToggle(true, 'body'));
    };


    var TimelineColumnsWidget = function() {
        var self = this;
        var $columns = $('#columns');
        var $selector = $('#column-axis');
        var column_states;

        this.getActiveCategory = function() {
            return $selector.find('option:selected').text();
        };

        this.getColumns = function() {
            return $tw.wiki.getTiddlersWithTag(self.getActiveCategory());
        };

        // Refresh callbacks
        this.renderColumns = function() {
            var $container = $columns.empty();
            var parentTag = self.getActiveCategory();
            column_states = {};
            // XXX: Is there a compromise between confusing and useful which
            //      would allow changing column sets to not reset visibility?

            $tw.wiki.makeTiddlerIterator(self.getColumns())(function(tiddler, title) {
                column_states[title] = true;
                $(header_tmpl(tiddler)).attr('data-id', title).appendTo($container);
            });
            $container.find('.column').each(function() {
                var $this = $(this);
                $this.find('.header, .timeline')
                    .css('background-color', $this.attr('data-color'));
            });
            $('#columns button.header').css('cursor', 'pointer');

            self.updateColumnVisibility();
            self.renderColumnGems();
        };
        this.renderColumnGems = function() {
            var visibleColumns = {};
            $('#columns .column').each(function() {
                var $this = $(this);
                visibleColumns[$this.attr('data-id')] =
                    $this.find('.header').css('background-color');
            });

            $('.tw-tiddler-frame').each(function() {
                var $this = $(this);
                var tags = $tw.wiki.getTiddler($this.attr('data-id')).fields.tags;

                var $gems = $this.find('.column-gems').empty();
                jQuery.each(visibleColumns, function(idx, val) {
                    if (tags.indexOf(idx) >= 0) {
                        $(gem_tmpl({ title: idx, color: val })).appendTo($gems);
                    }
                });
            });

        };
        this.renderColumnSets = function() {
            $('#column-axis').empty().append(
                    axes_tmpl({ axes: $tw.wiki.getTiddlersWithTag('Axes') }));
        };
        this.render = function() {
            self.renderColumnSets();
            self.renderColumns();
        };

        this.updateColumnVisibility = function() {
            $(".tw-tiddler-frame").each(function() {
                var $this = $(this);
                var tags = $tw.wiki.getTiddler($this.attr('data-id')).fields.tags;

                var possible = [];
                var shown = [];
                jQuery.each(column_states, function(idx, val) {
                    if (tags.indexOf(idx) == -1) { return; }

                    possible.push(idx);
                    if (val) { shown.push(idx); }
                });

                $this.next().addBack().stop(true, false)[
                    possible.length && !shown.length ? 'slideUp' : 'slideDown' ]();
            });
        };

        // Create column headers
        $(new_btn_tmpl({ type: "column set" }))
            .click(function() {
                var tag = 'Axes';
                $tw.wiki.addTiddler({
                    tags: [tag],
                    title: $tw.wiki.generateNewTitle(tag)
                });
                self.render();
            })
        .insertAfter($("#column-axis").change(this.renderColumns));

        $(new_btn_tmpl({ type: "column" })).click(function() {
            var tag = self.getActiveCategory();
            $tw.wiki.addTiddler({
                tags: [tag],
                title: $tw.wiki.generateNewTitle(tag)
            });
            self.renderColumns();
        }).insertAfter($columns);

        // Column visibility toggle
        $('#columns').on('click', 'button.header', function() {
            var id = $(this).parents('.column').attr('data-id');

            column_states[id] = !column_states[id];
            $(this).siblings('.timeline').stop(true, true)
                [column_states[id] ? 'fadeIn' : 'fadeOut']();

            self.updateColumnVisibility();
        });
        this.render();
    };


    var TimelineContentsWidget = function() {
        var self = this;

        this.insertCard = function(tiddler, after) {
            var $tiddler;

            if (tiddler.fields.card_type === 'break') {
                $tiddler = $(break_tmpl(tiddler));
            } else {
                $tiddler = $(card_tmpl(tiddler));
            }
            return after ? $tiddler.insertAfter(after) :
                           $tiddler.appendTo('section.story-river');
        };

        this.render = function() {
            // Render "recipe cards"
            $tw.wiki.makeTiddlerIterator($tw.wiki.getTiddlersWithTag('timeline')
                                         )(function(tiddler, title) {
                // Skip templates
                if (tiddler.fields.tags.indexOf('templates') >= 0) { return; }
                var $card = self.insertCard(tiddler);

                var wc = $card.find('.body').text().match(/\w+/g);
                wc = wc ? wc.length : 0;
                $card.find('.word_count').html(wc);

            });

            var twc = 0;
            $('.break').each(function() {
                var swc = 0;
                var $this = $(this);
                $this.nextUntil('.break', '.tw-tiddler-frame').find('.body')
                    .each(function() {
                        var wcre = $(this).text().match(/\w+/g);
                        swc += wcre ? wcre.length : 0;
                    });
                $this.find('.word_count').html(swc);
                twc += swc;
            });
            $('.tw-topbar .word_count').html(twc);


            // "New Entry Here" buttons and card collapse toggle
            $('section.story-river').on('click', '.inserter', function() {
                var templates = $tw.wiki.getTiddlersWithTag('templates');
                // TODO: Display a popup menu to select one.
                // PLAN: Shadow tiddler to ensure there will always be at least
                //       the basic types. (But still, add error check on [0])
                var new_entry = JSON.parse(JSON.stringify($tw.wiki.getTiddler(templates[0])));
                new_entry.fields.title = $tw.wiki.generateNewTitle(new_entry.fields.title);

                var tag_idx = new_entry.fields.tags.indexOf('templates');
                if (tag_idx >= 0) { new_entry.fields.tags.splice(tag_idx, 1); }

                // TODO: Do this properly (right API call and right sort position)
                $tw.wiki.addTiddler(new $tw.Tiddler(new_entry.fields));
                self.insertCard(new_entry, this).hide().slideDown();

            }).on('click', ".tw-collapse", applyToggle(false, '.tw-tiddler-frame', true)
            ).on('click', ".tw-expand", applyToggle(true, '.tw-tiddler-frame', true));
        };
        this.render();
    };

    $(document).ready(function() {
        var cards = new TimelineContentsWidget();
        var collapser = new GlobalCollapserWidget();
        var columns = new TimelineColumnsWidget();
    });
})(jQuery);

