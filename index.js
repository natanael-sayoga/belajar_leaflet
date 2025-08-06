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

let myMap = L.map('myMap', {
    center: [-7.5407, 110.4457],
    zoom: 14
});
let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})
osm.addTo(myMap);

