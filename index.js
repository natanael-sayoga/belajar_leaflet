import { myMarker } from './myMarkers.js';
import { myTileLayers } from './myTileLayer.js';
import { points } from './geojson/points.js'
import { lines } from './geojson/lines.js'
import { polygons } from './geojson/polygons.js'
/*
first we need to initiate a map object that will take LATITUDE and LONGITUDE coordinate as a starting point on our map
this map object will also take initial ZOOM value and an id of a div that act as a container for our map!

however this map object itself cant provide us with a digital image map to be shown to the user as leaflet js itself
doesn't have a function to generate a map. that's where OpenStreetMap (osm) comes from. we will send a GET request to
osm with the value initiated from the process above (the, z -> zoom, while x and y are latitude and longitude coordinate)

in return we will get an image data to be shown as a map to the user!
*/

/*
    this is the coordinate for mount merapi:
    7.5407° S, 110.4457° E

    converting it to lat-long array -> [-7.5407, 110.4457]
    latitude (in globe / map, it is the horizontal line)
    => define location in term of NORTH (+) and SOUTH (-)
    
    longitude (the vertical line)
    => define location in term of EAST (+) and WEST (-)
*/

/* --- INITIATING MAP --- */
let myMap = L.map('myMap', {
    center: [-7.5407, 110.4457],
    zoom: 12
})

/* --- INITIATING TILE LAYER (MAP IMAGE) --- */
function createTilelayer(map, controlLayer){
    Object.entries(myTileLayers).forEach(([key, config]) => {
        let tileLayer = L.tileLayer(config.baseURL, config.option)
        if(config.name==="Default Map"){tileLayer.addTo(map)}
        controlLayer.addBaseLayer(tileLayer, config.name)
    })
}

/* --- INITIATING MAP MARKERS --- */
function createMarkers(map, controlLayer){
    Object.entries(myMarker).forEach(([key, config]) => {
        let marker = null
        if (key!=="draggableMarker"/*config.name !== 'You'*/) {
            marker = L.marker(config.coordinate)
                .bindTooltip(config.tooltipMessage)
                .bindPopup(config.popupContent)
                .addTo(map)     
        }else{
            // Draggable marker
            marker = L.marker(config.coordinate, {
                icon: config.icon,
                draggable: true
            }).bindTooltip(config.tooltipMessage)
            .addTo(map);

            // Bind events
            marker.on('dragstart', config.onDragStart)
                .on('dragend', config.onDragEnd)
                .on('movestart', config.onMoveStart)
                .on('moveend', config.onMoveEnd)
                .on('move', config.onMove);
        }
        controlLayer.addOverlay(marker, config.name)
    });
}

/* --- LOADING GEOJSON DATAS --- */
function load_recreation_spots(controlLayer){
    let recreationSpots = []
    let spot = null
    L.geoJSON(points, {
        onEachFeature:function(feature, layer){
            spot = layer.bindTooltip(feature["properties"]["name"])
                    .setIcon(L.icon({
                        iconUrl: "img/recreation_spot.png",
                        iconSize: [20, 20]
                    }))
            recreationSpots.push(spot)
        }
    })
    controlLayer.addOverlay(L.layerGroup(recreationSpots), "Recreation Spots")
}
function load_rivers(controlLayer){
    let rivers = []
    let river = null
    L.geoJSON(lines, {
        onEachFeature: function(feature, layer){
            river = layer.bindTooltip(feature["properties"]["name"])
            rivers.push(river)
        },
        style: {
            weight: 6,
            color: "#1E90FF"
        }
    })
    controlLayer.addOverlay(L.layerGroup(rivers), "Rivers")
}
function load_hills(controlLayer){
    let hills = []
    let hill = null
    L.geoJSON(polygons, {
        onEachFeature: function(feature, layer){
            hill = layer.bindTooltip(feature["properties"]["name"])
            hills.push(hill)
        },
        style: {
            color: "#778899",
            fillColor: "#B0C4DE",
            fillOpacity: 0.6
        }
    })
    controlLayer.addOverlay(L.layerGroup(hills), "Hills")
}

/* --- ADDING ELEMENTS TO MAP AS THE DEFAULT OPTION --- */
function map_start(){
    /* --- ADDING CONTROL LAYER --- */
    let myControlLayer = L.control.layers({}, {}) //L.control.layers(tile_options, marker_options)
    createMarkers(myMap, myControlLayer)
    createTilelayer(myMap, myControlLayer)

    load_recreation_spots(myControlLayer)
    load_rivers(myControlLayer)
    load_hills(myControlLayer)

    myControlLayer.addTo(myMap)

    /* --- INITIATING LEGENDS OR OTHER INFO */
    document.getElementById("originPos").innerText = "[-7.5816° S, 110.4474° E]"
    document.getElementById("currentPos").innerText = "[-7.5816° S, 110.4474° E]"
}
map_start()