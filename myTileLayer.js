export const myTileLayers = {
    defaultMap: {
        name: "Default Map",
        baseURL: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        option:{
            minZoom: 0,
            maxZoom: 19,
            attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
    },
    darkMode:{
        name: "Dark Mode",
        baseURL: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}',
        option:{
            minZoom: 0,
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
        }
    },
    googleMap:{
        name:"Google Map",
        baseURL: 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        option: {
            minZoom: 0,
            maxZoom: 19,
            subdomains:['mt0','mt1','mt2','mt3'],
            attribution: '&copy; <a href="https://www.google.com/maps" target="_blank">Google Maps</a>'
        }
    }
}