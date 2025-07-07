//=================================initialization=================================//

const initialZoom = 6;
const initialCoordinates = [-3.6, 40];
let map = new ol.Map({
    target: document.getElementById('map'),
    view: new ol.View({
        center: ol.proj.fromLonLat(initialCoordinates),
        zoom: initialZoom
    })
});


//=================================add controls=================================//

var layerSwitcher = new ol.control.LayerSwitcher({});
map.addControl(layerSwitcher);
map.addControl(new ol.control.ScaleLine());
map.addControl(new ol.control.FullScreen());
map.addControl(
  new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-control',
    placeholder: '0.0000, 0.0000'
  })
);


//=================================boundary maps=================================//

// Spain Administrative level 0
var boundary0 = new ol.layer.Image({
    title: "Administrative Level 0",
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_07/wms',
        params: { 'LAYERS': 'gisgeoserver_07:Spain_boundary' },
        serverType: 'geoserver'
    }),
    visible: true
});
// Colombia Administrative level 1
var boundary1 = new ol.layer.Image({
    title: "Administrative Level 1",
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_07/wms',
        params: { 'LAYERS': 'gisgeoserver_07:Spain_boundary_L2_final' },
        serverType: 'geoserver'
    }),
    visible: false
});


//=================================overlay layers=================================//

// Spain Land Cover
var SpainLC = new ol.layer.Image({
    title: "Land Cover",
    type: 'base',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_07/wms',
        params: { 'LAYERS': 'gisgeoserver_07:Spain_LC_reclassiffied_2022' },
        serverType: 'geoserver'
    }),
    visible: false
});
// Spain Population class
var SpainPPP = new ol.layer.Image({
    title: "Population Class",
    type: 'base',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_07/wms',
        params: { 'LAYERS': 'gisgeoserver_07:Spain_ppp_class' },
        serverType: 'geoserver'
    }),
    visible: false
});

// NO2: 2022-mean(2017-2021)
var NO2ADD = new ol.layer.Image({
    title: "NO2: 2022-mean(2017-2021)",
    type: 'base',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_07/wms',
        params: { 'LAYERS': 'gisgeoserver_07:Spain_no2_2017-2021_AAD_map_2022' },
        serverType: 'geoserver'
    }),
    visible: false
});
// NO2:Pollution-Population
var NO2PP = new ol.layer.Image({
    title: "NO2:Pollution-Population",
    type: 'base',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_07/wms',
        params: { 'LAYERS': 'gisgeoserver_07:Spain_no2_2020_bivariate' },
        serverType: 'geoserver'
    }),
    visible: false
});

// pm2p5: 2022-mean(2017-2021)
var pm2p5ADD = new ol.layer.Image({
    title: "pm2p5: 2022-mean(2017-2021)",
    type: 'base',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_07/wms',
        params: { 'LAYERS': 'gisgeoserver_07:Spain_pm2p5_2017-2021_AAD_map_2022' },
        serverType: 'geoserver'
    }),
    visible: false
});
// NO2:Pollution-Population
var pm2p5PP = new ol.layer.Image({
    title: "pm2p5:Pollution-Population",
    type: 'base',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_07/wms',
        params: { 'LAYERS': 'gisgeoserver_07:Spain_pm2p5_2020_bivariate' },
        serverType: 'geoserver'
    }),
    visible: false
});

// pm10: 2022-mean(2017-2021)
var pm10ADD = new ol.layer.Image({
    title: "pm10: 2022-mean(2017-2021)",
    type: 'base',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_07/wms',
        params: { 'LAYERS': 'gisgeoserver_07:Spain_pm10_2017-2021_AAD_map_2022' },
        serverType: 'geoserver'
    }),
    visible: false
});
// pm10:Pollution-Population
var pm10PP = new ol.layer.Image({
    title: "pm10:Pollution-Population",
    type: 'base',
    source: new ol.source.ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/gisgeoserver_07/wms',
        params: { 'LAYERS': 'gisgeoserver_07:Spain_pm10_2020_bivariate' },
        serverType: 'geoserver'
    }),
    visible: false
});

//=================================base maps=================================//
const osm = new ol.layer.Tile({
    title: 'Open Street Map',
    visible: true,
    source: new ol.source.OSM()
});
var esriTopoBasemap = new ol.layer.Tile({
    title: 'ESRI Topographic',
    visible: false,
    source: new ol.source.XYZ({
        attributions:
            'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
        url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    }),
});
var esriWorldImagery = new ol.layer.Tile({
    title: 'ESRI World Imagery',
    visible: false,
    source: new ol.source.XYZ({
        attributions:
            'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Imagery/MapServer">ArcGIS</a>',
        url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Imagery/MapServer/tile/{z}/{y}/{x}',
    }),
});


//=================================layers classify=================================//

let boundaryLayers = new ol.layer.Group({
    title: 'Boundary Maps',
    layers: [
      boundary1,
      boundary0
    ]
});
let overlayLayers = new ol.layer.Group({
    title: 'Overlay Layers',
    layers: [
        pm10PP,
        pm10ADD,
        pm2p5PP,
        pm2p5ADD,
        NO2PP,
        NO2ADD,
        SpainPPP,
        SpainLC
    ]
});
let basemapLayers = new ol.layer.Group({
    title: 'Base Maps',
    layers: [
      osm,
      esriTopoBasemap,
      esriWorldImagery
    ]
});


//=================================add layers=================================//

map.addLayer(basemapLayers);
map.addLayer(overlayLayers);
map.addLayer(boundaryLayers);


//=================================change legend=================================//

const legendImg = document.getElementById('layer-legend-img');

overlayLayers.getLayers().forEach(layer => {
  layer.on('change:visible', () => {
    if (layer.getVisible()) {
      let name = layer.get('title').replace(/[^A-Za-z0-9]/g, '');
      legendImg.src = `images/legend_${name}.png`;
      legendImg.style.display = 'block';
    }
  });
});
