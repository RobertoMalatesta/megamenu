/* TODO Theme colors, by requesting from a php file that kicks back different css
 * TODO optional non-responsive menu, working same way as above
 */

/* Takes care of making sure JQuery is only loaded once per page */
var jQueryScriptOutputted = false;
function initJQuery() {
    if (typeof(jQuery) == 'undefined') {
        if (! jQueryScriptOutputted) {
            //only output the script once..
            jQueryScriptOutputted = true;
            document.write("<script type='text/javascript' src='//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js'></script>");
        }
        setTimeout("initJQuery()", 50);
    } 
    else {            
        jQuery(function() {  
            loaded();
        });
    } 
}
initJQuery();

/* Class for writing each of our pages */
function Page(title){
    this.title=title;

    this.__str__ = function (){
        return this.title + "<div class='lmm_pane_container'><div class='lmm_pane'>"+this.contents+"</div></div>";
    }
}

/* The actual tabs */
pages = {}
pages['app'] = new Page('Apply & Enroll');
pages['app'].contents = "\
<div class='lmm_col'>\
    <ul>\
        <li class='lmm_space'><a href='http://www.lanecc.edu/counseling/steps-enroll'>Steps to Enroll</a></li>\
\
        <li><a href='http://www.lanecc.edu/esfs/admissions'>Admissions</a></li>\
        <li><a href='http://www.lanecc.edu/counseling'>Counseling & Advising</a></li>\
        <li><a href='http://www.lanecc.edu/testing'>Testing & Placement</a></li>\
        <li><a href='http://www.lanecc.edu/esfs/registration'>Registration</a></li>\
    </ul>\
</div>\
\
<div class='lmm_col'>\
    <ul>\
        <li><a href='http://www.lanecc.edu/esfs/tuition-fees-and-payments'>Costs & Payments</a></li>\
        <li><a href='http://www.lanecc.edu/finaid'>Financial Aid</a></li>\
        <li class='lmm_space'><a href='http://www.lanecc.edu/ces/scholarships'>Scholarships</a></li>\
\
        <li>Non-Credit Courses</li>\
        <li><a href='http://www.lanecc.edu/wdd'>Workforce Development</a></li>\
    </ul>\
</div>\
\
<div class='lmm_col'>\
    <ul>\
        <li><a href='http://www.lanecc.edu/catalog'>Catalog</a></li>\
        <li><a href='http://www.lanecc.edu/collegecatalog/degrees-and-certificates'>Degrees & Certificates</a></li>\
        <li><a href='http://www.lanecc.edu/pathways'>Career Pathways</a></li>\
        <li><a href='http://www.lanecc.edu/schedule'>Schedule</a></li>\
        <li>Grades & Transcripts</li>\
    </ul>\
</div>\
";

pages['programs'] = new Page("Programs");
pages['programs'].contents = "\
<div class='lmm_col'>\
    <ul>\
        <li><a href='http://www.lanecc.edu/advtech'>Advanced Technology</a></li>\
        <li><a href='http://www.lanecc.edu/finarts'>Arts</a></li>\
        <li><a href='http://www.lanecc.edu/business'>Business</a></li>\
        <li><a href='http://www.lanecc.edu/cfe'>Child & Family Education</a></li>\
        <li><a href='http://www.lanecc.edu/cit'>Computer Information Technology</a></li>\
        <li><a href='http://www.lanecc.edu/culinary'>Culinary Arts & Hospitality</a></li>\
        <li><a href='http://www.lanecc.edu/hp'>Health Professions</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <ul>\
        <li><a href='http://www.lanecc.edu/healthpe'>Health, Physical Education & Athletics</a></li>\
        <li><a href='http://www.lanecc.edu/llc'>Language, Literature & Communication</a></li>\
        <li><a href='http://www.lanecc.edu/math'>Math</a></li>\
        <li><a href='http://www.lanecc.edu/mediaarts'>Media Arts</a></li>\
        <li><a href='http://www.lanecc.edu/perarts'>Music, Dance & Theatre</a></li>\
        <li><a href='http://www.lanecc.edu/science'>Science</a></li>\
        <li><a href='http://www.lanecc.edu/socialscience'>Social Science</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <ul>\
        <li><a href='http://www.lanecc.edu/cooped'>Cooperative Education</a></li>\
        <li><a href='http://www.lanecc.edu/hsconnections'>High School Connections</a></li>\
        <li><a href='http://www.lanecc.edu/abse'>GED & ABSE</a></li>\
        <li><a href='http://www.lanecc.edu/esl'>ESL</a></li>\
        <li><a href='http://www.lanecc.edu/honors'>Honors Program</a></li>\
        <li><a href='http://www.lanecc.edu/international'>International Students</a></li>\
        <li><a href='http://www.lanecc.edu/laneonline'>Online/Hybrid Courses</a></li>\
    </ul>\
</div>\
";

pages['services'] = new Page("Student Services");
pages['services'].contents = "\
<div class='lmm_col'>\
    <ul>\
        <li><a href='http://classes.lanecc.edu'><img src='http://www.lanecc.edu/sites/all/themes/custom/lane_default/custom_includes/moodle_icon.png' alt='follow to visit Moodle'></a> <a href='http://mylane.lanecc.edu'><img src='http://www.lanecc.edu/sites/all/themes/custom/lane_default/custom_includes/mylane_icon.png' alt='follow to visit myLane'></a></li>\
        <li class='lmm_space'><a href='http://www.lanecc.edu/it/helpdesk'>HelpDesk</a></li>\
        <li><a href='http://titanstore.lanecc.edu'>Titan Store</a></li>\
        <li><a href='http://www.lanecc.edu/it/computerlabs'>Computer Labs</a></li>\
        <li><a href='http://www.lanecc.edu/library'>Library</a></li>\
        <li><a href='http://www.lanecc.edu/tutor'>Tutoring</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <ul>\
        <li><a href='http://www.lanecc.edu/healthclinic'>Health Clinic</a></li>\
        <li><a href='http://www.lanecc.edu/studentlife/housing-information'>Housing</a></li>\
        <li><a href='http://www.lanecc.edu/ces/employment-services'>Student Employment</a></li>\
        <li class='lmm_space'><a href='http://www.lanecc.edu/facilities/transportation'>Transportation</a></li>\
        <li><a href='http://www.lanecc.edu/cfe/lcfc'>Childcare</a></li>\
        <li><a href='http://www.lanecc.edu/counseling'>Counseling</a></li>\
        <li><a href='http://www.lanecc.edu/disability'>Disability Resources</a></li>\
        <li><a href='http://www.lanecc.edu/veteranservices'>Veterans Services</a></li>\
        <li><a href='http://www.lanecc.edu/psd'>Public Safety</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <h3>Student Support Centers</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/atc'>Academic Technology Center</a></li>\
        <li><a href='http://www.lanecc.edu/math/math-resource-center'>Math Resource Center</a></li>\
        <li><a href='http://www.lanecc.edu/mcc'>Multi-Cultural Center</a></li>\
        <li><a href='http://www.lanecc.edu/trio'>TRiO</a></li>\
    </ul>\
</div>\
";


pages['connections'] = new Page("Connections");
pages['connections'].contents = "\
<div class='lmm_col'>\
    <ul>\
        <li><a href='http://www.lanecc.edu/calendars/academic-calendar'>Academic Calendar</a></li>\
        <li><a href='http://www.lanecc.edu/laneevents'>Events Calendar</a></li>\
        <li class='lmm_space'>News Room</li>\
        <li>Arts & Cultural Events</li>\
        <li><a href='http://lanesbdc.com/'>Lane SBDC</a></li>\
        <li><a href='http://klcc.org/'>KLCC</a></li>\
        <li><a href='http://www.lanetitans.net'>Athletics</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <h3>Community</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/foundation'>Foundation & Alumni Relations</a></li>\
        <li><a href='http://www.lanecc.edu/hsconnections'>High School Connections</a></li>\
        <li><a href='http://www.lanecc.edu/center'>Center for Meeting & Learning</a></li>\
        <li><a href='http://www.lanecc.edu/ce'>Community Education</a></li>\
        <li><a href='http://www.lanecc.edu/sustainability'>Institute for Sustainable Practices</a></li>\
        <li><a href='http://www.lanecc.edu/longhouse'>Longhouse</a></li>\
        <li><a href='http://www.lanecc.edu/peacecenter'>Peace Center</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <h3>Student Life</h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/aslcc'>Student Government</a></li>\
        <li><a href='http://www.lanecc.edu/mediaarts/torch'>The Torch</a></li>\
        <li><a href='http://www.lanecc.edu/aslcc/student-clubs'>Student Clubs</a></li>\
        <li class='lmm_space'><a href='http://www.lanecc.edu/honors'>Honors Program</a></li>\
        <li><a href='https://www.facebook.com/LaneCommunityCollege'><img src='http://www.lanecc.edu/sites/all/themes/custom/lane_default/custom_includes/icons/facebook.png' alt='Follow to our Facebook Page'></a> <a href='http://twitter.com/#!/LaneTitans'><img src='http://www.lanecc.edu/sites/all/themes/custom/lane_default/custom_includes/icons/twitter.png' alt='Follow to our Twitter Page'></a> <a href='http://www.youtube.com/lanetuberscafe'><img src='http://www.lanecc.edu/sites/all/themes/custom/lane_default/custom_includes/icons/youtube.png' alt='Follow to our Youtube Page'></a></li>\
    </ul>\
</div>\
";

pages['about'] = new Page("About");
pages['about'].contents = "\
<div class='lmm_col'>\
    <ul>\
        <li>Overview</li>\
        <li><a href='http://www.lanecc.edu/research/planning/strategic-plan'>Vision, Values & Mission</a></li>\
        <li><a href='http://www.lanecc.edu/accreditation'>Accreditation & Planning</a></li>\
        <li class='lmm_space'><a href='https://apps.lanecc.edu/scorecard'>Institutional Scorecard</a></li>\
        <li><a href='http://www.lanecc.edu/copps'>Policies & Procedures</a></li>\
        <li><a href='http://www.lanecc.edu/board'>Board of Education</a></li>\
        <li><a href='http://www.lanecc.edu/president'>Office of the President</a></li>\
        <li><a href='http://www.lanecc.edu/governance'>College Governance</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <ul>\
        <li>College Operations</li>\
        <li><a href='http://www.lanecc.edu/accreditation'>Accreditation & Planning</a></li>\
        <li><a href='http://www.lanecc.edu/research/ir/lcc-organizational-charts'>Organizational Chart</a></li>\
        <li><a href='http://jobs.lanecc.edu'>Employment</a></li>\
        <li><a href='http://www.lanecc.edu/mpr'>Public Relations</a></li>\
        <li><a href='http://www.lanecc.edu/contact'>Contact Us</a></li>\
    </ul>\
</div>\
<div class='lmm_col'>\
    <h3><a href='http://www.lanecc.edu/locations'>Maps & Locations</a></h3>\
    <ul>\
        <li><a href='http://www.lanecc.edu/locations/main-campus'>Main Campus</a></li>\
        <li><a href='http://www.lanecc.edu/locations/downtown-campus'>Downtown Campus</a></li>\
        <li><a href='http://www.lanecc.edu/locations/lane-aviation-academy'>Aviation Academy</a></li>\
        <li><a href='http://www.lanecc.edu/locations/lcc-cottage-grove'>Cottage Grove</a></li>\
        <li><a href='http://www.lanecc.edu/locations/lcc-florence'>Contact Us</a></li>\
    </ul>\
</div>\
";

/* These are variables that might need to change at some point */
var server = "//www2dev.lanecc.edu/custom";
var resources = server+"/mm/images/";

// This is kinda like Document.ready()
function loaded(){
    jQuery('head').append('<link rel="stylesheet" type="text/css" href="'+server+'/mm/mm.css">');
    var current_url = window.location.pathname;
    var cHeight = 0;
    jQuery('body').prepend('<div id="lmm"></div>');
    var menu = 
        '<div id="lmm_logo" class="lmm_other">'+
            '<div id="lmm_homes_page" class="lmm_other_pane">'+
                '<ul>'+
                    '<li><a href="http://www.lanecc.edu">Home</a></li>'+
                    '<li><a href="http://www.lanecc.edu/students">Current Students</a></li>'+
                    '<li><a href="http://www.lanecc.edu/future">Future Students</a></li>'+
                    '<li><a href="http://www.lanecc.edu/community">Community</a></li>'+
                    '<li><a href="http://www.lanecc.edu/employees">Employees</a></li>'+
                '</ul>'+
            '</div>'+
        '</div><ul id="lmm_cats">';
    for(var key in pages){
        menu += "<li id='lmm_" + key + "' class='lmm_toplevel'>"+ pages[key].__str__() + "</li>";
    }
    menu += '</ul>';
    menu +=
            '<div id="lmm_search" class="lmm_other">' +
                '<form id="lmm_search_form" name="search_lane_new_home_page" method="get" action="http://search.lanecc.edu/search">'+
                    '<label for="q" style="position:absolute;display:block;top:-9000px;left:-9000px;width:1px;height:1px;">Search Lane\'s Website</label>'+
                    '<input type="text" name="q" id="lmm_q" placeholder="Search or AskLane">'+
                    '<input type="submit" value="" id="lmm_search_submit">'+
                '</form>'+
                '<div id="lmm_searchops" class="lmm_min lmm_other_pane">'+
                    '<label for="lmm_search_web"><input name="dest" class="lmm_so" type="radio" id="lmm_search_web" checked="checked">Lane Website</label>'+
                    '<label for="lmm_search_asklane"><input name="dest" class="lmm_so" type="radio" id="lmm_search_asklane">AskLane</label>'+
                '</div>'+
            '</div>';
    jQuery('#lmm').append(menu);
    jQuery('#lmm').after('<div id="lmm_pane_underlay"></div>');
    jQuery('#lmm').after('<div id="lmm_underlay"></div>');

    // Figure out the left margin for lmm_cats. unfortunatley, this needs to be hardcoded, as it isn't possible to get an auto margin from Jquery
    //TODO mobile
    function updateCats(){
        var wwidth = jQuery(window).width();
        if(wwidth <=740){
            jQuery('#lmm').add(jQuery('#lmm_pane_underlay')).addClass('hideMobile');
            jQuery('body').css('margin-top','0px');
        }
        else{
            jQuery('#lmm').add(jQuery('#lmm_pane_underlay')).removeClass('hideMobile');
            jQuery('body').css('margin-top','28px');
        }
        if(wwidth > 740){
            var width = 740;
        }
        if(wwidth > 990){
            var width = 980;
        }
        if(wwidth > 1220){
            var width = 1220;
        }
        leftmargin = (wwidth - width)/2 - 14;
        //keeps us from sliding under the logo
        if(leftmargin < 0){
            leftmargin = 0;
        }
        jQuery('#lmm_cats').css('margin-left', leftmargin);
        jQuery('.lmm_col').css('width', (width / 3) - 15);
    }
    updateCats();
    jQuery(window).resize(function(){updateCats();});
    var lastaction = "";
    // Handle opening and closing panes
    jQuery('body').delegate('#lmm li.lmm_toplevel', 'click', function(e){
        jQuery(this).addClass('lmm_active');
        jQuery('.lmm_other_pane').hide();
        var clickedPane = jQuery('.lmm_pane_container', this);
        //if its a differnet panel that's open, fade out that panel and fade this one in
        if(clickedPane.is(":visible") && jQuery('.lmm_pane_container:visible').length == 1){
            lastaction = "close";
            clickedPane.add(jQuery('#lmm_pane_underlay')).stop().animate({
                height: 0
            }, function(){ jQuery(this).hide(); });
            clickedPane.parent('.lmm_toplevel').removeClass('lmm_active');
        }
        //swap us with someone else
        else if(jQuery('.lmm_pane_container:visible').length > 0 && lastaction != 'close'){
            lastaction = 'swap'
            var oldPane = jQuery('.lmm_pane_container:visible').not(clickedPane);
            clickedPane.height(209);
            oldPane.stop().fadeOut(200)
            clickedPane.fadeIn(200);
            oldPane.height(0);
            oldPane.parent('.lmm_toplevel').removeClass('lmm_active');
        }
        //must just want to open us
        else{
            lastaction = 'open'
            jQuery('#lmm_underlay').height(window.innerHeight);
            clickedPane.add(jQuery('#lmm_pane_underlay')).show().stop().animate({
                height: 210
            });
        }
        e.stopPropagation();
        return false;
    });
    jQuery('#lmm li.lmm_toplevel').children().click(function(e){ e.stopPropagation();});

    //allow us to click the background to close whatever's open
    jQuery('body').delegate('#lmm_underlay', 'click', function(){
        jQuery('#lmm .lmm_other .lmm_other_pane').each(function(){
            jQuery(this).hide();
        })
        jQuery('.lmm_active').removeClass('lmm_active');
        jQuery('#lmm .lmm_pane_container:visible').add(jQuery('#lmm_pane_underlay')).animate({
            height:0
        }, function(){jQuery(this).hide();});        
        jQuery('#lmm_underlay').height(0);
    });

    /* Pop open a search options box */
    jQuery('body').delegate('#lmm_q', 'click', function(e){
        //shrink any existing panes
        jQuery('#lmm_pane_underlay').height(0);
        jQuery('#lmm_homes_page').stop().fadeOut(200);
        jQuery('.lmm_pane_container:visible').stop().fadeOut(200).height(0);
        jQuery('#lmm_underlay').height(window.innerHeight);
        jQuery('.lmm_active').removeClass('lmm_active');
        jQuery('#lmm_searchops').fadeIn(200);
    });
    /* Similarly, pop open the homes button box */
    jQuery('body').delegate('#lmm_logo', 'click', function(e){
        jQuery('#lmm_pane_underlay').height(0);
        jQuery('.lmm_active').removeClass('lmm_active');
        jQuery('.lmm_pane_container:visible').stop().fadeOut(200).height(0);
        if(jQuery('#lmm_homes_page').is(':visible')){
            jQuery('#lmm_homes_page').stop().fadeOut(200);
            jQuery('#lmm_underlay').height(0);
        }
        else{
            jQuery('#lmm_underlay').height(window.innerHeight);
            jQuery('#lmm_searchops').stop().fadeOut(200);
            jQuery('#lmm_homes_page').fadeIn(200);
        }
    })
    jQuery('#lmm_logo').children().click(function(e){ e.stopPropagation();});
    
    /* Handle the radio buttons for the search box 
     * NOT using .attr on the form due to a but in jQuery 1.4.2 where attr isnt' able to correctly set
     * form actions
     */
    jQuery('body').delegate('.lmm_so', 'click',function(e){
        var dest = jQuery('.lmm_so:checked').attr('id');
        if(dest == "lmm_search_web"){
        //remove existing temp form fields that may or may not be needed
        jQuery('.lmm_temp').remove();
        jQuery('#lmm_search_form').get(0).setAttribute('action', 'http://search.lanecc.edu/search');
            jQuery('#lmm_search_form').get(0).setAttribute('method', 'get');
            jQuery('#lmm_q').attr('name','q');
        }
        else if(dest == "lmm_search_asklane"){
            jQuery('#lmm_search_form').append('<input type="hidden" name="requestType">');            
            jQuery('#lmm_search_form').get(0).setAttribute('action', 'http://lanecc.intelliresponse.com/');
            jQuery('#lmm_search_form').get(0).setAttribute('method', 'post');
            jQuery('#lmm_q').attr('name','question');
        }
        jQuery('#lmm_q').focus();
        e.stopPropagation();
    });

    /* Site specific adjustments
     */
    if(jQuery('body').hasClass('admin-bar')){ //Wordpress
        cHeight = parseInt(jQuery('#wpadminbar').css('height'));
        jQuery('#lmm').css('top',cHeight);
    }
    else if(jQuery('body').hasClass('admin-menu')){ //Authenticated Drupal
        jQuery('#lmm').css('display','none')
    }
}
