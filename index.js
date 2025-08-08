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
    zoom: 12
})
let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})

let myMarker = {
    merapi:{
        coordinate:[-7.5407, 110.4457],
        tooltipMessage:"Mt. Merapi Peak",
        popupContent:`
            located at:<br>
            <b>(-7.5407° S, 110.4457° E)</b>
            `
    },
    ngandongPineForest:{
        coordinate:[-7.5852, 110.4128],
        tooltipMessage:"Ngandong Pine Forrest",
        popupContent:`
        located at:<br>
        <b>(-7.5852° S, 110.4128° E)</b>
        `
    },
    draggableMarker:{
        coordinate:[-7.5816, 110.4474],
        tooltipMessage:"YOU ARE HERE!",
        icon:L.icon({
            iconUrl: 'img/people.png',
            iconSize: [40, 40]
        }),
        onDragStart:function(e){
            document.getElementById("isDragged").innerText = "True"
        },
        onDragEnd:function(e){
            document.getElementById("isDragged").innerText = "False"
        },
        onMoveStart:function(e){
            document.getElementById("isMoved").innerText = "True"
        },
        onMoveEnd:function(e){
            document.getElementById("isMoved").innerText = "False"
        },
        onMove:function(e){
            let newLat = e.target.getLatLng().lat.toFixed(4)
            let newLong = e.target.getLatLng().lng.toFixed(4)
            let newTooltipContent = `
            You are now at:<br> 
            <b>(${newLat}°, ${newLong}°)</b>`

            e.target.setTooltipContent(newTooltipContent)
            document.getElementById("currentPos").innerText = `
            [${newLat}° ${newLat>0?" N":" S"}, ${newLong}° ${newLong>0?" E":" W"}]`
        }
    }
}
let merapiMarker = L.marker(myMarker.merapi.coordinate)
merapiMarker.bindTooltip(myMarker.merapi.tooltipMessage)
merapiMarker.bindPopup(myMarker.merapi.popupContent)

let ngandongMarker = L.marker(myMarker.ngandongPineForest.coordinate)
ngandongMarker.bindTooltip(myMarker.ngandongPineForest.tooltipMessage)
ngandongMarker.bindPopup(myMarker.ngandongPineForest.popupContent)

let draggableMarkerOrigin = document.getElementById("originPos").innerText = "[-7.5816° S, 110.4474° E]"
let draggableMarkerCurrent = document.getElementById("currentPos").innerText = "[-7.5816° S, 110.4474° E]"
let draggableMarker = L.marker(myMarker.draggableMarker.coordinate, {
    icon:myMarker.draggableMarker.icon,
    draggable:true
})
draggableMarker.bindTooltip(myMarker.draggableMarker.tooltipMessage)
draggableMarker.on("move", myMarker.draggableMarker.onMove)
draggableMarker.on("dragstart", myMarker.draggableMarker.onDragStart)
draggableMarker.on("dragend", myMarker.draggableMarker.onDragEnd)
draggableMarker.on("movestart", myMarker.draggableMarker.onMoveStart)
draggableMarker.on("moveend", myMarker.draggableMarker.onMoveEnd)

osm.addTo(myMap);
merapiMarker.addTo(myMap)
ngandongMarker.addTo(myMap)
draggableMarker.addTo(myMap)