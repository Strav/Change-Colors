var style_element;

function injectCss(cssToInject){
    style_element = document.createElement("style");
    style_element.innerText = cssToInject;
    document.documentElement.insertBefore(style_element, null);
}

function removeCss(){
    style_element.parentNode.removeChild(style_element);
    history.go(0);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action == "injectCss") {
	injectCss(request.css);
    } else if (request.action == "removeCss") {
	removeCss();
    }
});
