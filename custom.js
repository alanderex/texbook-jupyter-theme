/*
Author: Valerio Maggio (@leriomaggio)
http://github.com/leriomaggio

 ==================================================
 Custom JQuery function that handles the scrolling
 to anchor links positioning the landing of the top
 pixel to the correct offset, considering that the
 header toolbar is FIXED by default.
 ==================================================

*/

$.fn.exists = function () {
    return this.length !== 0;
}

function customise_anchor_links_click(){
    $("a[href*='#']").click(function(e) {
        let $header = $("#header");
        // Check if header toolbar is visible in the first place
        if ($header.is(":visible")){
            let anchor = $(this).attr('href');
            let $target = $(anchor);
            if (!$target.exists()){
                anchor = anchor.substr(1);
                $target = $("a[name='"+anchor+"'");
            }
            //  Check if a match has been found, in the first place.
            if ($target.exists()){
                e.preventDefault();  // Inhibit default behaviour
                let header_height = $header.height();
                let offset = $target.offset().top - header_height;
                $('html,body').animate({scrollTop: offset},'slow');
            }
        }
    });
}

// Trigger the selection when the page is ready
$(document).ready(function(){
    customise_anchor_links_click();
});

/*
 Trigger a new selection scan every time a
 Markdown cell is rendered -
 so that (possible) newly defined links can be captured.
 */
$([IPython.events]).on("rendered.MarkdownCell", function(){
    customise_anchor_links_click();
});
