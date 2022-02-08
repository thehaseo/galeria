$(document).ready(function() {
    let items = $('#gallery li');
    let itemsByTags = {};

    items.each(function(value){
        let elem = $(this);
        let tag = elem.data('tags');
        
        // adding data attribute for quicksand
        elem.attr('data-id', value);
        value = $.trim(tag);
        if (!(value in itemsByTags)){
            itemsByTags[value] = [];
        }
        // adding image to array 
        itemsByTags[value].push(elem);
    })
    // Create "all items" option
    createLists('Todas', items, false);

    $.each(itemsByTags, function(key, value){
        createLists(key, value);
    });
    // click nav items menu event handler
    $('#navbar a').click(function(){
        // adding active class to the element clicked
        $(this).addClass('active').siblings().removeClass('active');
        $('#gallery').quicksand($(this).data('list').find('li'));
    });

    $('#navbar a:first').click();

    // create the lists for quicksand animation
    function createLists(text, item, newList=true){
        // Create empty ul
        let ul = $('<ul>', {'class': 'hidden'});
        $.each(item, function(){
            if (newList){
                let liElement = $(this).clone();
                liElement.children('a').attr('data-fancybox', text);
                liElement.appendTo(ul);
            } else {
                $(this).clone().appendTo(ul);
            }
        });
        
        //Add to container div
        ul.appendTo('.gallery-container');

        // Create menu item
        let menu = $('<a>',{
            html: text,
            href: '#',
            data: {list:ul}
        }).appendTo('#navbar');
    }
})