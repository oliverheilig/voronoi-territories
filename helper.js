// returns a layer group for xmap back- and foreground layers
function getXMapBaseLayers(url, style, token, attribution) {
    var background = new L.TileLayer.WMS(url, {
        maxZoom: 19, minZoom: 0, opacity: 1.0,
        noWrap: true,
        layers: style ? 'xmap-' + style + '-bg' : 'xmap-ajaxbg',
        format: 'image/png', transparent: false,
        attribution: attribution
    });

    var foreground = new L.NonTiledLayer.WMS(url + (token? "?xtok=" + token : ''), {
        minZoom: 0, opacity: 1.0,
        layers: style ? 'xmap-' + style + '-fg' : 'xmap-ajaxfg',
        format: 'image/png', transparent: true,
        attribution: attribution,
        pointerEvents: 'none'
    });

    return L.layerGroup([background, foreground]);
}

function fixClickPropagationSoItWorksForF___ingIE11(container) {
    container.onclick = L.DomEvent.stopPropagation;
    var inputTags = container.getElementsByTagName("input");
    for (var i = 0; i < inputTags.length; i++) {
        if (inputTags[i].type == "text")
            inputTags[i].onclick = L.DomEvent.stopPropagation;
        inputTags[i].onmousedown = inputTags[i].ondblclick = inputTags[i].onpointerdown = L.DomEvent.stopPropagation;
    }
}

