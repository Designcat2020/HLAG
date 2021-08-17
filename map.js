mapboxgl.accessToken = 'pk.eyJ1IjoiamZzMjExOCIsImEiOiJjazJvdXZ2MnkxN2owM2Rwbm1wNWVpYXptIn0.pT-GXNoNxB7l1SMBh2Yjxg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jfs2118/ckrc7wznz0mf818qwou9f42gy',
    center: [-74.018, 40.754],
    zoom: 13.8,
    pitch: 0,
    bearing: 29.5,
});



map.on('load', function () {



    map.addLayer({
        'id': 'buildingData',
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': 'data/buildingData.geojson'
        },
        'paint': {
            'circle-color': ['match',['get', 'Code'],
                'B','#447de9',
                'E', '#984ea3',
                'R', '#ff7f00',
                'S', '#4daf4a',
                'H', '#ffff33',
                'Ed', '#e41a1c',
                 /* other */ '#ffffff'
            ],
            'circle-stroke-color': '#4d4d4d',
            'circle-stroke-width': 0.2,
            'circle-radius': ['interpolate', ['exponential', 2], ['zoom'],
                10, 4,
                16, 15
            ],
           'circle-opacity': 0.85,

        }
    });

   /* map.addLayer({
        'id': 'buildingID',
        'type': 'symbol',
        'source': {
            'type': 'geojson',
            'data': 'data/buildingData.geojson'
        },

        'layout': {
            'text-field': [
                'format',
                ['get', 'Code'],
                { 'font-scale': 0.8 }],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],

        },
        'paint': {
            'text-color': '#ffffff'
        }
    });*/


    map.addLayer({
        'id': 'highline',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/highline.geojson'
        },
        'paint': {
            'fill-color': '#74c476',
        }
    }, 'bridge-case-simple');

    map.addLayer({
        'id': 'Data',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/background.geojson'
        },
        'paint': {
            'fill-color': '#bae4b3',
            'fill-opacity': 0.75,
        }
    }, "waterway-shadow");
});




map.on('click', 'buildingData', function (e) {
    var name = e.features[0].properties.nameweb;
    var bin = e.features[0].properties.bin;
    var year = e.features[0].properties.year;
    var type = e.features[0].properties.type;
    var Address = e.features[0].properties.Address;
    var architects = e.features[0].properties.architects;
    var location = e.features[0].properties.location;
    var infor = e.features[0].properties.infor;
    var Image = e.features[0].properties.img;



    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4><b>' + name + '</b></h4>'
            + '<b>Address:</b> ' + location + '<br>'
            + '<b>Function:</b> ' + type + '<br>'
            + '<b>Build Year:</b> ' + year + '<br>'
            + '<b>Architect:</b> ' + architects + '<br>'
            + '<b>More information:</b> ' + infor + '<br>'
            + '<b>Image:</b> ' + Image + '<br>')
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the turnstileData layer.
map.on('mouseenter', 'buildingData', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'buildingData', function () {
    map.getCanvas().style.cursor = '';
});

var toggleableLayerIds = ['Produce in NYC By SunYanarch'];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}
