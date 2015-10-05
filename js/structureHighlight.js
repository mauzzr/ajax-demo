/*
 * File: structureHighlight.js, created by Peter Welby 4 Oct. 2015
 * This script implements a structure highlighting mechanism to
 * visualize the relationship between the JSON data and the formatted
 * page content.
 */

// NOTE: Below is an anonymous function invoked immediately
// this pattern avoids making any unnecessary global variables
(function(){
    // NOTE: Using the same jQuery code to fetch the JSON, this time so we can get property names
    // -- Code below provided by instructor Jesse Heines in Assignment 5 specification --
    // this function will run after the body has been loaded
    jQuery(document).ready( function() {
        jQuery.get( "huffmancoding.json", function( data ) {
            placeContent( data ) ;  // construct output from the data read
        }, "json" );  // be sure to include this third parameter for weblab.cs.uml.edu
    });
    // -- End of instructor code --


})();