let weather_card = null;
let switcher = null;
let timeline = null;

let header_removed = false;
let weather_card_moved = false;
let content_margin_shifted = false;
let sidebar_handle_removed = false;
let sidebar_container_removed = false;

let timeline_right = null;
let switcher_top = null;

let observer = null;

function mutation_handler() {
    if (weather_card !== null && switcher !== null && timeline !== null && sidebar_handle_removed && header_removed && content_margin_shifted && weather_card_moved && sidebar_container_removed) {
        // Disconnect the observer once we're done with everything
        observer.disconnect();
        return;
    }

    if (weather_card === null) {
        let elements = document.getElementsByClassName('m_card_root-DS-EntryPoint1-1');

        if (elements.length) {
            // Grab the weather card
            weather_card = elements[0];
        }
    } 
    
    if (weather_card !== null && !weather_card_moved) {
        let elements = document.getElementsByClassName('weatherMapSidebarSection-DS-EntryPoint1-1');

        if (elements.length) {
            // Move the weather card
            elements[0].appendChild(weather_card);
            weather_card_moved = true;
        }
    }

    if (switcher === null) {
        switcher = document.getElementById('m-switcher');

        if (switcher !== null) {
            // Move the weather card out from the corner to the same height as the switcher
            switcher_top = getComputedStyle(switcher).top;
            document.styleSheets[0].insertRule(".m_card_root-DS-EntryPoint1-1 { margin-left: " + switcher_top + "; margin-top: " + switcher_top + "; }");
        }
    }

    if (timeline === null) {
        timeline = document.getElementById('m-timeline');

        if (timeline !== null) {
            // Extend the timeline to fill the space left by the sidebar
            timeline_right = getComputedStyle(timeline).right;
            document.styleSheets[0].insertRule("#m-timeline { left: " + timeline_right + "; }", 0);
        }
    }

    if (!header_removed) {
        let header = document.getElementById('header');

        if (header !== null) {
            // Remove the big header
            header.remove();
            header_removed = true;
        }
    }
    
    if (header_removed && !content_margin_shifted) {
        let elements = document.getElementsByClassName('content-DS-EntryPoint1-1');

        if (elements.length) {
            // Shift the page content up to fill the space left by the header
            elements[0].style.marginTop = '0';
            content_margin_shifted = true;
        }
    }

    if (!sidebar_handle_removed) {
        let sidebar_handle = document.getElementById('WeatherMapSideBarToggler');

        if (sidebar_handle !== null) {
            // Remove the sidebar handle
            sidebar_handle.remove();
            sidebar_handle_removed = true;
        }
    }

    if (weather_card_moved && !sidebar_container_removed) {
        let elements = document.getElementsByClassName('sideBarContainer-DS-EntryPoint1-1');

        if (elements.length) {
            // Remove the sidebar container once the weather card has been moved
            elements[0].remove();
            sidebar_container_removed = true;
        }
    }
}

observer = new MutationObserver(mutation_handler);

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
});
