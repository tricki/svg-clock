export function isIE() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    return msie !== -1;

    // if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    // {
    //     alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
    // }
    // else  // If another browser, return 0
    // {
    //     alert('otherbrowser');
    // }

    // return false;
}
