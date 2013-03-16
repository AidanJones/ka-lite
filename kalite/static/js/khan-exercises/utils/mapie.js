(function() {
    var createMap = function(el) {

		
	
		
    };

    
$.fn.mapie = function(problem) {
        return this.find(".mapie, script[type='text/mapie']").andSelf().filter(".mapie, script[type='text/mapie']").each(function() {
            // Grab code for later execution
            var code = $(this).text(), mapie;

            // Ignore code that isn't really code ;)
            if (code.match(/Created with Rapha\xebl/)) {
                return;
            }

            // Remove any of the code that's in there
            $(this).empty();

            // Initialize the graph
            if ($(this).data("update")) {
                var id = $(this).data("update");
                $(this).remove();

                // Graph could be in either of these
                var area = $("#problemarea").add(problem);
                mapie = area.find("#" + id + ".mapie").data("mapie");
            } else {
                var el = this;
                if ($(this).filter("script")[0] != null) {
                    el = $("<div>").addClass("mapie")
                        .attr("id", $(this).attr("id")).insertAfter(this)[0];
                    $(this).remove();
                }
                mapie = new OpenLayers.Map({
					div: "mapie",
					allOverlays: true
					});

					var osm = new OpenLayers.Layer.OSM();
					var gmap = new OpenLayers.Layer.Google("Google Streets", {visibility: false});

					// note that first layer must be visible
					mapie.addLayers([osm, gmap]);

					mapie.addControl(new OpenLayers.Control.LayerSwitcher());
					mapie.zoomToMaxExtent();

					
                $(el).data("mapie", mapie);
            }

            code = "(function() {" + code + "})()";

            // Execute the graph-specific code
            KhanUtil.currentMap = mapie;
            $.tmpl.getVAR(code, mapie);
            // delete KhanUtil.currentGraph;
        }).end();
    };
})();