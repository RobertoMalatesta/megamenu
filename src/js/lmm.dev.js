"use strict";

window.onload = function() {
    /* If someone includes the script twice (which has happened), the mega menu throws
     * open and close events simultaneously, meaning it doesn't work at all. So here
     * we'll make sure we don't accidentally draw it twice. */
    if(typeof mm !== 'undefined'){
        console.log("megamenu script already present");
        return;
    }
    else {
        var mm = "loaded";
    }

    if(!('classList' in document.body))
        return

    document.head.insertAdjacentHTML('beforeend', '<style media="all">{$cssmin}</style>');
    document.body.insertAdjacentHTML('beforeend', '{$lmm}');
    // add to the existing margin
    document.body.style.marginTop = (parseInt(window.getComputedStyle(document.body).marginTop) + 28) + 'px';

    let $lmm = document.getElementsByClassName('lmm')[0];
    let $pane_underlay = document.getElementsByClassName('lmm-pane-underlay')[0];
    let $underlay = document.getElementsByClassName('lmm-underlay')[0];
    let $cats = $lmm.getElementsByClassName('lmm-cats')[0]
    let $homesPane = $lmm.getElementsByClassName('lmm-homes-pane')[0];
    let $searchBox = $lmm.getElementsByClassName('lmm-q')[0];

    // convenience function to loop over a set of elements
    let foreach = function (array, callback, scope) {
      for (let i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
      }
    };

    // make a couple site specific adjustments
    // Authenticated Drupal's file browser
    if(window.location.pathname.indexOf('/imce') === 0){
        $lmm.style.display = 'none';
    }
    // Authenticated Drupal, 7 then 8
    else if(document.body.classList.contains('admin-menu') || document.getElementById('toolbar-administration')){ 
        $lmm.style.display = 'none';
    }
    // Moodle
    else if(window.location.hostname.indexOf('mrooms') >= 0 ||
            window.location.hostname.indexOf('classes.lanecc') >= 0){
        // some classes have an extra top menubar
        if(!! document.getElementById('yui_3_17_2_1_1469040182301_520')){
            document.getElementById('yui_3_17_2_1_1469040182301_520').style.marginTop = '28px';
        }
        
        // administering classes under some themes shows this
        if(!! document.querySelector('#page-content .block_settings')){
            document.querySelector('#page-content .block_settings').style.paddingTop = '3em';
        }

        //boost theme - push big page elements down some
        let cssFiles = document.getElementsByTagName('link');
        let boost=false;
        for(var i=0;i<cssFiles.length;i++){
            if(cssFiles[i].href.indexOf('boost')>0){
               boost=true;
            }
        }
        if(boost){
          document.querySelector('header').style.top = '28px';
          document.getElementById('page').style.marginTop = '78px';
          document.getElementById('nav-drawer').style.top = '78px';
        }
    }
    // Wordpress
    else if(document.body.classList.contains('admin-bar')){ 
        let adminBar = document.getElementById('wpadminbar');
        let cHeight = parseInt(window.getComputedStyle(adminBar, null).height);
        $lmm.style.top = cHeight + "px";
        $lmm.style.zIndex = 800;
        let underlayMargin = parseInt(window.getComputedStyle($pane_underlay, null).height);
        $pane_underlay.style.marginTop = (underlayMargin + cHeight) + "px";
    }
    /* If we're ever relative positioned, we need to change where the top sits, otherwise we'll sit 28px
       below where we want to be */
    if(window.getComputedStyle(document.body).position == 'relative'){
        $lmm.style.top = '-29px';
        $pane_underlay.style.top = 0;
    }

    // add GA tracking to each link
    let links = $lmm.querySelectorAll('a:not(.skip)');
    foreach(links, function(index, value){
        links[index].setAttribute('href', links[index].getAttribute('href') + "?utm_source=megamenu&utm_medium=web&utm_campaign=megamenu");
    });

    //Stop random pane clicks from closing us, except on the closer
    let topLevelKids = $lmm.getElementsByClassName('lmm-toplevel');
    let combined = [];
    for(let i=0; i<topLevelKids.length; i++){
        combined = combined.concat(Array.prototype.slice.call(topLevelKids.item(i).children));
    }
    combined = combined.concat(Array.prototype.slice.call($lmm.getElementsByClassName('lmm-logo')[0].children));
    foreach(combined, function(index, value){
        if(!combined[index].classList.contains('lmm-closer')){
            combined[index].addEventListener('click', function(e){
                e.stopPropagation();
            });
        }
    });

    function fadeOut(element) {
        if(window.getComputedStyle(element, null).opacity == 0 || window.getComputedStyle(element, null).display == 'none')
            return

        element.classList.add('fadeOut');
        if(!element.classList.contains('lmm-side-pane'))
            element.style.height = 0;
        element.style.display = "none";
        if(element.classList.contains('fadeIn')){
            element.classList.remove('fadeIn');
        }
    }

    function fadeIn(element) {
        if(window.getComputedStyle(element, null).opacity > 0 && window.getComputedStyle(element, null).display != 'none')
            return

        element.classList.add('fadeIn');
        if(!element.classList.contains('lmm-side-pane'))
            element.style.removeProperty('height');
        element.style.removeProperty('display');
        if(element.classList.contains('fadeOut')){
            element.classList.remove('fadeOut');
        }
    }

    function visible(element){
        return !(window.getComputedStyle(element, null).opacity == 0 || window.getComputedStyle(element, null).display == 'none');
    }

    function resizeSearch(){
        let searchContainer = $lmm.getElementsByClassName('lmm-search')[0];
        let rightEdge = window.innerWidth - ($cats.offsetWidth + $cats.offsetLeft);
        if(!visible($cats)){
            let logo = $lmm.getElementsByClassName('lmm-logo')[0];
            rightEdge = window.innerWidth - (logo.offsetWidth + logo.offsetLeft);
        }
        let maxSize = rightEdge - 3;
        searchContainer.style.width = maxSize + "px";
        searchContainer.classList.add("active-search");
        //55 to accomidate the extra buffer around the icons
        $searchBox.style.width = (maxSize - 55) + "px";
    }

    /* Pop open a search options box 
       This has been deliberately not put on a visibility toggle, because
       people tend to click on the search box after setting search options */
    $searchBox.addEventListener('click', function(e){
        $underlay.style.display = 'block';
        fadeOut($homesPane);

        resizeSearch();

        let active = $lmm.getElementsByClassName('lmm-active');
        if(active.length){
            fadeOut($pane_underlay);
            fadeOut($lmm.querySelector('.lmm-active .lmm-pane-container'));
            active[0].classList.remove('lmm-active');
        }

        fadeIn($lmm.getElementsByClassName('lmm-searchops')[0]);
    }, false);

    /* Similarly, pop open the homes button box */
    $lmm.getElementsByClassName('lmm-logo')[0].addEventListener('click', function(e){
        let active = $lmm.getElementsByClassName('lmm-active');
        if(active.length){
            fadeOut($pane_underlay);
            fadeOut($lmm.querySelector('.lmm-active .lmm-pane-container'));
            active[0].classList.remove('lmm-active');
        }
        fadeOut($lmm.getElementsByClassName('lmm-searchops')[0]);
        if($lmm.getElementsByClassName('lmm-search')[0].classList.contains('active-search')){
            $lmm.getElementsByClassName('lmm-search')[0].style.removeProperty('width');
            $searchBox.style.removeProperty('width');
        }

        if($homesPane.classList.contains('fadeIn')){
            fadeOut($homesPane);
            $underlay.style.display = 'none';
        }
        else{
            $underlay.style.display = 'block';
            fadeIn($homesPane);
        }
    }, false);

    // closes everything
    function closeAll(e){
        var panes = $lmm.getElementsByClassName('lmm-side-pane');
        for(let i=0; i<panes.length; i++){
          fadeOut(panes[i]);
        }
        if($lmm.getElementsByClassName('lmm-search')[0].classList.contains('active-search')){
            $lmm.getElementsByClassName('lmm-search')[0].style.removeProperty('width');
            $searchBox.style.removeProperty('width');
        }
        let active = $lmm.getElementsByClassName('lmm-active');
        if (active.length){
            fadeOut($pane_underlay);
            fadeOut($lmm.querySelector('.lmm-active .lmm-pane-container'));
            active[0].classList.remove('lmm-active');
        }
        $underlay.style.display = 'none';
    }
    $underlay.addEventListener('click', closeAll);
    let closers = $lmm.getElementsByClassName('lmm-closer');
    for(let i=0; i<closers.length; i++){
      closers[i].addEventListener('click', closeAll);
    }
        
    /* Handle the radio buttons for the search box */
    function handleRadioClick(e){
        let dest = 'lmm-search-web';
        let opts = $lmm.querySelectorAll('.lmm-searchops input');
        for(let i=0;i<opts.length; i++){
          if(opts[i].checked)
              dest = opts[i].getAttribute('id');
        }
        
        // AskLane adds these, but no one else needs them.
        let reqType = document.getElementsByName('requestType');
        if(reqType.length > 0 )
            reqType[0].parentNode.removeChild(reqType[0]);

        if(dest == "lmm-search-asklane"){
            $lmm.getElementsByClassName('lmm-search-form')[0].insertAdjacentHTML('beforeend', '<input type="hidden" name="requestType">');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('method', 'post');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('action', 'https://lanecc.intelliresponse.com/');
            $searchBox.setAttribute('name','question');
            $lmm.getElementsByClassName('lmm-search-label')[0].textContent = 'Ask a question, like "When are finals?"';
            $searchBox.setAttribute('placeholder', 'ask a question, like "When are finals?"');
        }
        else if(dest == "lmm-search-web"){
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('method', 'get');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('action', 'https://www.lanecc.edu/custom/search'); 
            $searchBox.setAttribute('name','q');
            $lmm.getElementsByClassName('lmm-search-label')[0].textContent = 'Search the Lane website';
            $searchBox.setAttribute('placeholder', 'search the Lane website');
        }
        else if(dest == "lmm-search-ce"){
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('method', 'post');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('action', 'https://lanecc.augusoft.net/index.cfm?method=ClassListing.ClassListingDisplay');
            $searchBox.setAttribute('name','Keywords');
            $lmm.getElementsByClassName('lmm-search-label')[0].textContent = 'Search Continuing Education classes';
            $searchBox.setAttribute('placeholder', 'search Continuing Education classes');
        }
        else if(dest == "lmm-search-people"){
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('method', 'get');
            $lmm.getElementsByClassName('lmm-search-form')[0].setAttribute('action', 'https://directory.lanecc.edu/search');
            $searchBox.setAttribute('name','search');
            $lmm.getElementsByClassName('lmm-search-label')[0].textContent = 'Search people at Lane';
            $searchBox.setAttribute('placeholder', 'search the Employee Directory');
        }
        $searchBox.focus();
        e.stopPropagation();
    }

    let radios = $lmm.querySelectorAll('.lmm-searchops input');
    for(let i=0;i<radios.length; i++){
        radios[i].addEventListener('click', handleRadioClick);
    }

    // Handle opening and closing panes
    function paneClick(e){
        
        // close up the sides
        let panes = $lmm.getElementsByClassName('lmm-side-pane');
        for(let i =0; i<panes.length; i++){
            fadeOut(panes[i]);
        }
        if($lmm.getElementsByClassName('lmm-search')[0].classList.contains('active-search')){
            $lmm.getElementsByClassName('lmm-search')[0].style.removeProperty('width');
            $searchBox.style.removeProperty('width');
        }
        
        let openPane = null;
        let containers = $lmm.getElementsByClassName('lmm-pane-container');
        for(let i=0;i<containers.length;i++){
            if(visible(containers[i])){
                openPane = containers[i];
            }
        }
        let clickedPane = this.getElementsByClassName('lmm-pane-container')[0];
        if (openPane != null){
            // if we're open, close us
            if(openPane == clickedPane){
                fadeOut($pane_underlay);
                fadeOut(clickedPane);
                this.classList.remove('lmm-active');
            }
            // swap us with this other one
            else {
                fadeOut(openPane);
                fadeIn(clickedPane);
                $lmm.getElementsByClassName('lmm-active')[0].classList.remove('lmm-active');
                this.classList.add('lmm-active');
            }
        }
        // open this pane
        else{
            this.classList.add('lmm-active');
            fadeIn(clickedPane);
            fadeIn($pane_underlay);
            $underlay.style.display = 'block';
        }
        e.stopPropagation();
    }
    
    let top = $lmm.getElementsByClassName('lmm-toplevel')
    for(let i=0;i<top.length;i++){
        top[i].addEventListener('click', paneClick);
    }

    // Figure out the left margin for lmm-cats.
    function onResize(){
        let width = 720;
        if(window.innerWidth < 720){
            let activeTab = $lmm.getElementsByClassName('lmm-active')[0];
            if (activeTab != null){
                activeTab.classList.remove('lmm-active');
                activeTab.getElementsByClassName('lmm-pane-container')[0].style.height = 0;
                activeTab.getElementsByClassName('lmm-pane-container')[0].style.display = 'none';
                fadeOut($pane_underlay);
                $underlay.style.display = 'none';
            }
        }
        if(window.innerWidth >= 940){
            width = 940;
        }
        if(window.innerWidth >= 1440){
            width = 1180;
        }
        let leftmargin = Math.floor(window.innerWidth - width) / 2 - 14;
        //keeps us from sliding under the logo
        if(leftmargin < 0){
            leftmargin = 0;
        }
        $cats.style.marginLeft = leftmargin + "px";

        if(visible($lmm.getElementsByClassName('lmm-searchops')[0])){
            resizeSearch();
        }

        /* On sites with a fixed width, if the document is wider than the viewport, it's possible for the MegaMenu to
        to be sized incorrectly. Make that adjustment here. Need to fire this on resize, since some sites render
        wider than they actually are, then shrink, so we may need to recalculate later. */
        if(window.innerWidth < document.width){
            $lmm.style.width = document.width;
            $pane_underlay.style.width = document.width;
            $underlay.style.width = document.width;
        }
        else {
            $lmm.style.width = "100%";
            $pane_underlay.style.width = "100%";
            $underlay.style.width = "100%";
        }
    }
    onResize();
    window.addEventListener('resize', onResize);
};