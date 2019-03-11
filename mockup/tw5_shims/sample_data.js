var sample_data = {
    /* TODO: Refactor this to be as close to TiddlyWiki internals as possible
     *       to minimize rewriting when I actually transfer the mockup over:
     *       - Ordering will probably wind up being done by a "sorting_key"
     *         field on each tiddler which employs key generation similar to
     *         fractional values in Dewey Decimal so moving a "recipe card"
     *         is always an O(1) operation.
     *
     * NOTE: Breaks of type "comment" are ignored by the exporter.
     */
    tiddlers: [
        {
            title: "'Index Card' description of a scene or event here.",
            text: "Scene content goes here.",
            tags: ['timeline', 'templates'],
        },
        {  title: "Axes", tags: [] },
        {  title: "Subplots", tags: ['Axes'] },
        {  title: "Characters", tags: ['Axes'] },
        {  title: "Mystery Corpse", color: "#e22", tags: ['Subplots'] },
        {  title: "Stolen Thing", color: "green", tags: ['Subplots'] },
        {  title: "Missing Person", color: "blue", tags: ['Subplots'] },
        {  title: "The Salesman", color: "#B893C3", tags: ['Characters'] },
        {  title: "The Architect", color: "#FF8C00", tags: ['Characters'] },
        {  title: "The Travel Agent", color: "#8BBEC7", tags: ['Characters'] },
        {  title: "The Gardener", color: "#D5AD34", tags: ['Characters'] },
        {
            title: "Chapter 1",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel lectus egestas eros bibendum ultrices. Sed non nulla ac magna mollis tincidunt et tincidunt orci. Ut ut turpis quis lacus tincidunt vulputate. Duis tincidunt tortor at dolor fermentum pulvinar. In nisl justo, semper sed sollicitudin sed, convallis ut tortor. In viverra nunc dapibus neque condimentum ac laoreet quam suscipit. Nullam imperdiet dignissim arcu, eget viverra eros lobortis sed. In tincidunt, elit eu gravida condimentum, felis magna faucibus mauris, sed faucibus lectus est quis lacus. Nunc orci dui, congue fringilla iaculis vitae, convallis et mi. Integer auctor lectus ut felis ornare tincidunt.",
            tags: ['timeline'],
            card_type: 'break',
            break_type: 'comment',
        },{
            title: "'Index Card' description of a scene or event here. 1",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel lectus egestas eros bibendum ultrices. Sed non nulla ac magna mollis tincidunt et tincidunt orci. Ut ut turpis quis lacus tincidunt vulputate. Duis tincidunt tortor at dolor fermentum pulvinar. In nisl justo, semper sed sollicitudin sed, convallis ut tortor. In viverra nunc dapibus neque condimentum ac laoreet quam suscipit. Nullam imperdiet dignissim arcu, eget viverra eros lobortis sed. In tincidunt, elit eu gravida condimentum, felis magna faucibus mauris, sed faucibus lectus est quis lacus. Nunc orci dui, congue fringilla iaculis vitae, convallis et mi. Integer auctor lectus ut felis ornare tincidunt.",
            tags: ['timeline', 'Mystery Corpse', 'The Gardener'],
        },{
            title: "'Index Card' description of a scene or event here. 2",
            text: "Maecenas vehicula suscipit nisi faucibus imperdiet. Praesent leo quam, elementum a commodo quis, dignissim in elit. Suspendisse feugiat, orci et tempus hendrerit, libero leo laoreet arcu, id auctor eros dolor in nulla. Aenean vitae lacus non nulla pellentesque facilisis. Cras scelerisque facilisis leo. Sed sed mauris nibh, nec congue massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut dignissim velit id magna hendrerit aliquam. Nullam scelerisque faucibus pretium. Pellentesque rutrum ante at urna malesuada fermentum. Maecenas velit sem, semper eu dignissim id, placerat sed lorem. Phasellus porttitor feugiat massa a interdum. Proin varius consectetur nibh sed feugiat. Aliquam orci orci, viverra sed scelerisque porta, viverra sed arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            tags: ['timeline', 'Stolen Thing', 'The Architect'],
        },{
            title: "'Index Card' description of a scene or event here. 3",
            text: "Maecenas vehicula suscipit nisi faucibus imperdiet. Praesent leo quam, elementum a commodo quis, dignissim in elit. Suspendisse feugiat, orci et tempus hendrerit, libero leo laoreet arcu, id auctor eros dolor in nulla. Aenean vitae lacus non nulla pellentesque facilisis. Cras scelerisque facilisis leo. Sed sed mauris nibh, nec congue massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut dignissim velit id magna hendrerit aliquam. Nullam scelerisque faucibus pretium. Pellentesque rutrum ante at urna malesuada fermentum. Maecenas velit sem, semper eu dignissim id, placerat sed lorem. Phasellus porttitor feugiat massa a interdum. Proin varius consectetur nibh sed feugiat. Aliquam orci orci, viverra sed scelerisque porta, viverra sed arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            tags: ['timeline',
                'Mystery Corpse', 'Stolen Thing', 'Missing Person',
                'The Travel Agent', 'The Gardener', 'The Architect'],
        },{
            title: "'Index Card' description of a scene or event here. 4",
            text: "Suspendisse massa ante, tristique sit amet dapibus eu, laoreet eu lacus. Maecenas ornare facilisis velit eu elementum. Curabitur euismod nisl nec urna rutrum pretium mattis dui ultricies. Morbi scelerisque lacinia magna, bibendum pellentesque sapien viverra nec. Nullam mollis vestibulum luctus. Suspendisse faucibus condimentum iaculis. Nunc malesuada consectetur consequat. Maecenas aliquet tortor a libero tincidunt rhoncus. Duis ut nisl sem. Nam cursus faucibus ante, vel tincidunt odio cursus nec. Donec faucibus, neque non fermentum vehicula, nisl lectus fermentum purus, eu ultrices eros elit ac odio. Quisque at lorem at justo mollis congue. Duis dolor urna, tempor vitae cursus nec, scelerisque a velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            tags: ['timeline', 'Mystery Corpse'],
        },{
            title: "Chapter 2",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel lectus egestas eros bibendum ultrices. Sed non nulla ac magna mollis tincidunt et tincidunt orci. Ut ut turpis quis lacus tincidunt vulputate. Duis tincidunt tortor at dolor fermentum pulvinar. In nisl justo, semper sed sollicitudin sed, convallis ut tortor. In viverra nunc dapibus neque condimentum ac laoreet quam suscipit. Nullam imperdiet dignissim arcu, eget viverra eros lobortis sed. In tincidunt, elit eu gravida condimentum, felis magna faucibus mauris, sed faucibus lectus est quis lacus. Nunc orci dui, congue fringilla iaculis vitae, convallis et mi. Integer auctor lectus ut felis ornare tincidunt.",
            tags: ['timeline'],
            card_type: 'break',
            break_type: 'comment',
        },{
            title: "'Index Card' description of a scene or event here. 5",
            text: "Maecenas dapibus consequat dolor, vitae ornare felis accumsan ut. Curabitur ullamcorper commodo vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus sed mi aliquet ipsum tempus blandit quis vitae justo. Vestibulum aliquam orci eu lectus congue dignissim. Fusce enim lectus, aliquet in hendrerit ac, semper vel erat. Donec vitae nulla nisl, non pretium ipsum. Vestibulum elementum nisl non ipsum dignissim sodales. Suspendisse potenti. Vestibulum mi nulla, gravida eleifend accumsan eu, imperdiet a nulla. Fusce purus eros, placerat id vehicula non, blandit nec dui. Quisque metus enim, iaculis ac viverra vel, volutpat viverra odio. Etiam ligula turpis, lobortis nec lobortis eu, imperdiet eu leo. Integer in semper nisl.",
            tags: ['timeline', 'Missing Person', 'The Salesman'],
        },{
            title: "'Index Card' description of a scene or event here. 6",
            text: "Nullam accumsan, magna ac feugiat sollicitudin, risus diam suscipit tortor, at tempor erat turpis ac mi. Aliquam non gravida risus. Sed iaculis erat sit amet elit blandit iaculis. Fusce faucibus nulla enim, sed molestie magna. Duis tincidunt, libero nec pharetra molestie, arcu arcu porta felis, nec interdum lorem odio tincidunt erat. In malesuada cursus condimentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi gravida condimentum magna, ut ornare sapien viverra at. Proin interdum, nibh non faucibus interdum, elit enim placerat mi, nec viverra sem augue sed diam.",
            tags: ['timeline', 'Mystery Corpse'],
        },{
            title: "'Index Card' description of a scene or event here. 7",
            text: "Duis iaculis volutpat dui, ac fermentum nibh eleifend sit amet. Suspendisse id tellus lorem, at egestas enim. Nunc pretium suscipit tellus, a interdum nibh consectetur in. Curabitur vulputate, augue a rhoncus pretium, ante augue imperdiet ipsum, nec egestas neque augue id dolor. Integer eleifend consectetur leo sit amet tempus. Suspendisse sodales, tellus at condimentum mollis, enim augue lobortis urna, a dignissim justo mauris ut dui. Nam porttitor, nulla vel pharetra consectetur, ante arcu hendrerit quam, cursus interdum velit lectus ut metus. Aliquam adipiscing imperdiet vestibulum.",
            tags: ['timeline',
                'Mystery Corpse', 'Missing Person',
                'The Salesman', 'The Travel Agent'],
        }
    ],
};
