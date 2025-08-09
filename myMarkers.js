export const myMarker = {
    merapi: {
        coordinate: [-7.5407, 110.4457],
        tooltipMessage: "Mt. Merapi Peak",
        popupContent: `located at:<br><b>(-7.5407° S, 110.4457° E)</b>`,
        name:"Mount Merapi Peak"
    },
    ngandongPineForest: {
        coordinate: [-7.5852, 110.4128],
        tooltipMessage: "Ngandong Pine Forest",
        popupContent: `located at:<br><b>(-7.5852° S, 110.4128° E)</b>`,
        name:"Ngandong Pine Forrest"
    },
    draggableMarker: {
        coordinate: [-7.5816, 110.4474],
        tooltipMessage: "YOU ARE HERE!",
        name: "You",
        icon: L.icon({
            iconUrl: 'img/people.png',
            iconSize: [40, 40]
        }),
        onDragStart: function(e) {
            document.getElementById("isDragged").innerText = "True"
        },
        onDragEnd: function(e) {
            document.getElementById("isDragged").innerText = "False"
        },
        onMoveStart: function(e) {
            document.getElementById("isMoved").innerText = "True"
        },
        onMoveEnd: function(e) {
            document.getElementById("isMoved").innerText = "False"
        },
        onMove: function(e) {
            let newLat = e.target.getLatLng().lat.toFixed(4)
            let newLong = e.target.getLatLng().lng.toFixed(4)
            let newTooltipContent = `You are now at:<br><b>(${newLat}°, ${newLong}°)</b>`
            
            e.target.setTooltipContent(newTooltipContent)
            document.getElementById("currentPos").innerText = 
                `[${newLat}° ${newLat>0?"N":"S"}, ${newLong}° ${newLong>0?"E":"W"}]`
        }
    }
}