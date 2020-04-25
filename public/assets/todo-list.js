$(document).ready(function() {

    // $('form').on('submit', function(event) {
    //     event.preventDefault();
    //     var item = $('form input');
    //     var todo = { item: item.val().trim() };

    //     $.ajax({
    //         type: 'POST',
    //         url: '/tolearn',
    //         data: tolearn,
    //         success: function(data) {
    //             //do something with the data via front-end framework
    //             location.reload();
    //         }
    //     });

    //     return false;

    // });

    $('li').on('click', function() {
        var item = $(this).text().trim().replace(/ /g, "-");
        $.ajax({
            type: 'DELETE',
            url: '/tolearn/' + item,
            success: function(data) {
                //do something with the data via front-end framework
                location.reload();
            }
        });
    });

});