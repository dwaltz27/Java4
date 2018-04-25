require(["esri/Map", "esri/views/MapView", "esri/layers/MapImageLayer", "esri/layers/FeatureLayer", "esri/widgets/Legend", "esri/widgets/LayerList", "esri/widgets/Search", "dojo/domReady!"], function (Map, MapView, MapImageLayer, FeatureLayer, Legend, LayerList, Search) {
    //basemap (Tiled Map Service)

    var mapConfig = {
        basemap: "topo"
    };

    var myMap = new Map(mapConfig);

    var mapView = new MapView({
        map: myMap,
        container: "viewDiv",
        center: [-112.0745, 33.4517],
        zoom: 11
    });
    //Map Image Layer (City Boundaries)
    var cities = new MapImageLayer({
        url: "https://masgis3.asu.edu/arcgis/rest/services/PhoenixCities/MapServer"
    });

    myMap.add(cities);

    //Renderers for the Bus feature layer
    var RAPID = {
        type: "simple-line",
        color: "#e60000",
        width: 2,
        style: "solid"
    };

    var Express = {
        type: "simple-line",
        color: "#000306",
        width: 4,
        style: "solid"
    };

    var LightRail = {
        type: "simple-line",
        color: "#3399ff",
        width: 6,
        style: "solid"
    };

    var busroutes = {
        type: "simple-line",
        color: "#FFBE33",
        width: 2,
        style: "short-dot"
    };

    var busRender = {
        type: "unique-value",
        defaultSymbol: busroutes,
        defaultLabel: "routes",
        field: "SERVICE",
        uniqueValueInfos: [
            { value: "Light Rail", symbol: LightRail, label: "Light Rail" },
            { value: "Express", symbol: Express, label: "Express" },
            { value: "RAPID", symbol: RAPID, label: "RAPID" },

        ]

    };


    //Adding the bus feature layer
    busRender.legendOptions = { title: "Route Type" };

    var Bus = new FeatureLayer({
        url: "https://services2.arcgis.com/2t1927381mhTgWNC/ArcGIS/rest/services/ValleyMetroBusRoutes/FeatureServer/0",
        renderer: busRender
    });
    myMap.add(Bus);

    //adding the legend
    var legend = new Legend({
        view: mapView,
        layerInfos: [{ layer: Bus, title: 'Bus Routes' }]
    });

    mapView.ui.add(legend, "bottom-left");

    //adding the layer list
    var layerList = new LayerList({
        view: mapView
    });

    mapView.ui.add(layerList, {
        position: "top-right"
    });
    //adding the search widget
    var searchWidget = new Search({
        view: mapView,
        sources: [{

            featureLayer: Bus,
            searchFields: ["ROUTE_NUMBER"],
            displayField: "ROUTE_NUMBER",
            exactMatch: false,
            outFields: ["*"],
            name: "Custom Search",
            placeholder: "Bus Route",
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0,
        }
        ]



    });
    mapView.ui.add(searchWidget, {
        position: "top-left",
        index: 2
    });

});
