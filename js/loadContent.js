/*
 * File: loadcontent.js, created by Peter Welby 4 Oct. 2015
 * This script implements the jQuery-based AJAX loading of the
 * content stored separately in the file huffmancoding.json
 * Updated 7 Oct. 2015 to add structure highlighting visualization
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
function placeContent(objData) {
    var strSidebarContent = "", strPageContent = "";


    // place usage information before getting the rest from JSON
    strSidebarContent += "<p>Hover over an item below to highlight the corresponding content!</p>";
    // start the list structure
    strSidebarContent +="<ul><li class='data'>Content";
    strSidebarContent += "<ul>";
    // parse JSON into the sidebar content string
    strSidebarContent += parseSidebarContent(objData, "data");
    // close the list structure
    strSidebarContent += "</ul></li></ul>";

    // Add page title
    strPageContent += "<h1 class='data-title'>" + objData.title + "</h1>";

    // Construct description paragraph with article & license links
    strPageContent += "<p class='data-desc'>" + "<span class='data-desc-start'>" + objData.desc.start
        + "</span>" + " ";
    strPageContent += "<a href='" + objData.desc.articleURL + "' class='data-desc-articleURL'>"
        + "<span class='data-desc-articleLinkText'>" + objData.desc.articleLinkText
        + "</span>" + "</a>" + " ";
    strPageContent += "<span class='data-desc-finish'>" + objData.desc.finish + "</span>" +" ";
    strPageContent += "<a href='" + objData.desc.licenseURL + "' class='data-desc-licenseURL'>"
        + "<span class='data-desc-licenseText'>" + objData.desc.licenseText + "</span></a></p>";

    // start a div to hold the sections
    strPageContent += "<div class='data-sections'>";
    // parse JSON into the content placement string
    strPageContent += parsePageContent(objData.sections, "data-sections");
    strPageContent += "</div>";

    // place the content
    $("#sidebar").html(strSidebarContent);
    $("#content").html(strPageContent);

    // Add event listeners for mouse-over highlighting
    // Adding them separately for better flexibility, both in jQuery selectors
    // and in styling
    sidebarAddListeners();
    pageAddListeners();
}

//=============================================================================
// The content placement code has been divided into
// two functions, called separately to recurse through the input object
// and place property names into the sidebar and values (the content text)
// into the page. Each function sets the class attribute on each element
// so that each sidebar element will be able to highlight its corresponding
// portion of the content.
//
// objData is the input object, and strClass is the string prefix used to
// construct class names unique to each element in the JSON.
//=============================================================================


function parseSidebarContent(objData, strClass) {
    var strContent = "",
        propertyIndex;
    // Use a for-in loop to grab the property names from the JSON object
    // Got this idea from the following Stack Overflow thread:
    // http://stackoverflow.com/questions/4260308/getting-the-objects-property-name
    for (propertyIndex in objData) {
        // Make sure we're reading a property of the object itself and not
        // something it inherited
        if (objData.hasOwnProperty(propertyIndex)) {
            strContent += "<li class='" + strClass + "-" + propertyIndex + "'>";

            if (typeof(objData[propertyIndex]) === "object") {
                // put this property's name in the list item
                strContent += propertyIndex;
                // start a new list with this property's contents
                strContent += "<ul>" + parseSidebarContent(objData[propertyIndex],
                    strClass + "-" + propertyIndex);
                // close the list and list item we started
                strContent += "</ul></li>";
            } else {
                // this property is not an object, so just add its name in brackets
                // and close the list item
                strContent += "[" + propertyIndex + "]" + "</li>";
            }
        }
    }

    return strContent;
}

// this function has a structure similar to parseSidebarContent,
// but we want the property values instead of the property names this time.
function parsePageContent(objData, strClass) {
    var strContent = "",
        propertyIndex;

    for (propertyIndex in objData) {
        if (objData.hasOwnProperty(propertyIndex)) {
            // what we do here depends entirely on whether
            // objData[propertyIndex] is an object
            if (typeof(objData[propertyIndex]) === "object") {
                // we have an object, which has no real content but gets a div

                // start the div
                strContent += "<div class='" + strClass + "-" + propertyIndex + "'>";
                // put the object's content into the div
                strContent += parsePageContent(objData[propertyIndex], strClass + "-" + propertyIndex);
                // close the div
                strContent += "</div>";
            } else {
                // We're not looking at an object, which means it's content
                // that needs to go on the page. It is either a paragraph or a heading,
                // so check which it is and put it either in a <p></p> or <h2></h2>

                if (propertyIndex === "title") {
                    strContent += "<h2 class='" + strClass + "-" + propertyIndex + "'>";
                    strContent += objData[propertyIndex] + "</h2>";
                } else {
                    strContent += "<p class='" + strClass + "-" + propertyIndex + "'>";
                    strContent += objData[propertyIndex] + "</p>";
                }
            }
        }
    }

    return strContent;
}

// add event listeners to each of the list items in the sidebar
// pieced this methodology together from api.jquery.com
function sidebarAddListeners() {
    $("#sidebar li").each(function() {
        $(this).hover(function() {
                var strTargetClass = "."  + $(this).attr("class");
                $(strTargetClass).css("background-color", "rgba(0, 255, 64, 0.15)");
            },
            function() {
                var strTargetClass = "." + $(this).attr("class");
                $(strTargetClass).css("background-color", "transparent");
            });
    })
}

// add event listeners for items in the page, starting with the content div
// the idea of using the form $(selector, context) came from the following Stack Overflow thread:
// http://stackoverflow.com/questions/3024391/how-do-i-iterate-through-child-elements-of-a-div-using-jquery
function pageAddListeners() {
    // "*" is the "all" selector
    $("*", "#content").each(function() {
        $(this).hover(function() {
               var strTargetClass = "."  + $(this).attr("class");
               $(strTargetClass).css("background-color", "rgba(255, 108, 0, 0.15)");
        },
        function() {
            var strTargetClass = "."  + $(this).attr("class");
            $(strTargetClass).css("background-color", "transparent");
        });
    });
}
