import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import mapStyle from '../components/MapStyle'

const DEFAULT_PADDING = {top: 40, right: 40, bottom: 40, left: 40}

const fitAllMarkers = (coords) => {
  googlemap.fitToCoordinates(coords), {
    edgePadding: DEFAULT_PADDING,
    animated: true
  }
}

export default function MapScreen({ route }) {
  const { routeCoords } = route.params;
  const coords = [];
  routeCoords.map((e) => coords.push({latitude: e.coords.latitude, longitude: e.coords.longitude}))
  
  return (
    <View style={styles.container}>
      customMapStyle={mapStyle}      
      <MapView
        style={customMapStyle.map}
        provider={PROVIDER_GOOGLE}
        ref={(ref) => {googlemap = ref;}}
        onMapReady={(e) => fitAllMarkers(coords)}>
        <Polyline
            coordinates={coords}
            strokeColor="#FFF000"
            strokeWidth={4}
            geodesic={true}
            showsMyLocationButton={false} />
      </MapView>
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }

});