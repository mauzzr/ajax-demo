/*
 * File: loadcontent.js, created by Peter Welby 4 Oct. 2015
 * This script implements the jQuery-based AJAX loading of the
 * content stored separately in the file huffmancoding.json
 */

// -- Code below provided by instructor Jesse Heines in Assignment 5 specification --
// this function will run after the body has been loaded
jQuery(document).ready( function() {
    jQuery.get( "huffmancoding.json", function( data ) {
        placeContent( data ) ;  // construct output from the data read
    }, "json" );  // be sure to include this third parameter for weblab.cs.uml.edu
});
// -- End of instructor code --

// We receive the content as JSON data.
// Note that this is guaranteed on all systems by passing the "json"
// parameter in the get() call above.
function placeContent(data) {
    var strContent = "",
        i, j;

    // Add title
    strContent += "<h1 class='title'>" + data.title + "</h1>";

    // Construct description paragraph with article & license links
    strContent += "<p id='desc'>" + data.desc.start + " ";
    strContent += "<a href='" + data.desc.articleURL + "'>" + data.desc.articleLinkText
                    + "</a>" + " ";
    strContent += data.desc.finish + " ";
    strContent += "<a href='" + data.desc.licenseURL + "'>" + data.desc.licenseText + "</a></p>";

    // for each section, and each paragraph in each section
    for (i = 0; i < data.sections.length; i++) {
        // Start a div container for the section before adding content
        // Each container's id attribute is set uniquely,
        // i.e. "section1", "section2", and so on.
        strContent += "<div id='section" + (i + 1) + "'>";

        // first section is an introduction with no title
        if (i > 0) {
            strContent += "<h2 class='sectionTitle'>" + data.sections[i].title + "</h2>";
        }

        // iterate through the section's paragraphs to add them
        for (j = 0; j < data.sections[i].paragraphs.length; j++) {
            strContent += "<p>" + data.sections[i].paragraphs[j] + "</p>";
        }

        // close the section div
        strContent += "</div>"
    }

    $("#content").html(strContent);
}