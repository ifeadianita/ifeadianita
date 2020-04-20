mapboxgl.accessToken = 
'pk.eyJ1IjoiYW5pdGEtMWZlYWQxIiwiYSI6ImNrOTd2c3U5ZzFhd2czZXBnNHh3MTd5NnUifQ.bhuZvdNG_V4Dh08rZ8cNAg';
var map = new mapboxgl.Map({
  container: 'map', //container id in HTML
  style: 'mapbox://styles/anita-1fead1/ck629xqhp0f6g1imvdtoyp9ml', //stylesheet location
  center: [-79.39, 43.72], // starting point, longitude/latitude
  zoom: 10 // starting zoom level
});

//Add source code for: Toronto's Median Income and DBF File
map.on('style.load', function() {
  map.addSource('medianincome', {
    "type": 'vector',
    "url": 'mapbox://anita-1fead1.1i1hbdau'
  });

  map.addLayer({
    "id": 'medianincomeLayer',
    "type": 'fill',
    "source": 'medianincome',
    "source-layer": 'median_income_final_zip_2-7354y6',
    "paint": {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['to-number', ['get', 'COL2'], 0],
        0, "#ede5cf",
        56640, "#e0c2a2",
        79616, "#d39c83",
        115456, "#c1766f",
        184661, "#813753",
      ],
      'fill-opacity': 0.8,
      'fill-outline-color': 'black'
    }
  });

//Add source code for: Toronto's Housing Eviction Help (point) and DBF File
  map.addSource('housingevictionhelp',{
    type: 'vector',
    url: 'mapbox://anita-1fead1.c0vm10x3'
  });

map.addLayer({
    'id': 'housingevictionLayer',
    'type': 'circle',
    'source': 'housingevictionhelp',
    'layout': {},
    'paint': {
      'circle-color': '#5c53a5',
      'circle-radius': 4
    },
    "source-layer": "Housing_Eviction_Help-1o2yrb"
    });

//Add source code for: Toronto's Legal Justice Help (point) and DBF File
map.addSource('legaljustice',{
    type: 'vector',
    url: 'mapbox://anita-1fead1.1lopgsyq'
  });

map.addLayer({
    'id': 'legaljusticeLayer',
    'type': 'circle',
    'source': 'legaljustice',
    'layout': {},
    'paint': {
      'circle-color': '#68abb8',
      'circle-radius': 4
    },
    "source-layer": "Legal_Justice_Support-3latrw"
    });
  });

  // Pulsing Dot for Toronto's Legal Justice Help (point)

  //map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 3});

  //map.addSource('legaljustice', {
    //type: 'vector',
    //url: 'mapbox://anita-1fead1.1lopgsyq'
  //});

  //map.addLayer({
    //id: 'legaljusticeLayer',
    //type: 'symbol',
    //source: 'legaljustice',
    //'source-layer': 'Legal_Justice_Support-3latrw',
    //layout: {
    	//'icon-image': 'pulsing-dot'
   // }
  //}, 'housingevictionLayer');

 //Mouse/Pointer Visualization For 'housingevictionLayer' 
 map.on('mouseenter','housingevictionLayer',function(e){
       map.getCanvas().style.cursor = 'pointer';
       });
// if the mouse leaves the province fill layer then do the following:
map.on('mouseleave','housingevictionLayer',function(e){
    map.getCanvas().style.cursor = '';
});

//(Mouse-Click) Pop Up Effects For 'housingevictionLayer' 
var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
});

//Defining When The Pop-Up Will Happen For 'housingevictionLayer'
map.on('click', 'housingevictionLayer', function(e) {
  popup.remove(); // Deleting default behavior + deleting initial popups

  var features = map.queryRenderedFeatures(e.point, {
    layers: ['housingevictionLayer']
  });

  if (features.length > 0) {
    console.log(features[0]);

    var feature = features[0];
    popup.setLngLat(e.lngLat);

    popup.setHTML(
      '<b>The Following Eviction Center is: </b>' + feature.properties.AGENCY_NAME + '<br>' + '<a href="https://open.toronto.ca/dataset/wellbeing-youth-housing-eviction-help/" target="_blank">Data Source</a>'
    );
    popup.addTo(map);
  }
});

//Mouse/Pointer Visualization For 'legaljusticeLayer' 
 map.on('mouseenter','legaljusticeLayer',function(e){
       map.getCanvas().style.cursor = 'pointer'; //make the mouse cursor pointy
       });
// if the mouse leaves the province fill layer then do the following:
map.on('mouseleave','legaljusticeLayer',function(e){
    map.getCanvas().style.cursor = ''; 
});

//(Mouse-Click) Pop Up Effects For 'legaljusticeLayer' 
var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
});

//Defining When The Pop-Up Will Happen For 'legaljusticeLayer'
map.on('click', 'legaljusticeLayer', function(e) {
  popup.remove();

  var features = map.queryRenderedFeatures(e.point, {
    layers: ['legaljusticeLayer']
  });

  if (features.length > 0) {
    console.log(features[0]);

    var feature = features[0];
    popup.setLngLat(e.lngLat);

    popup.setHTML(
      '<b>The Following Legal Justice Center is: </b>' + feature.properties.AGENCY_NAME + '<br>' + '<a href="https://open.toronto.ca/dataset/wellbeing-youth-legal-justice-support/[" target="_blank">Data Source</a>'
    );
    popup.addTo(map);
  }
});

  
 
  

  
