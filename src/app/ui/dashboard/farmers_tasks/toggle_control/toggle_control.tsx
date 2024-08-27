import { IControl, Map } from 'mapbox-gl';
import styles from './toggle_control.module.css'
class ToggleControl implements IControl {
  private _map: Map | undefined;
  private _container: HTMLDivElement | undefined;

  onAdd(map: Map): HTMLDivElement {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = `mapboxgl-ctrl  ${styles['mapboxgl-ctrl-group']}`; // Apply Mapbox control styling

    // Create Map View Button
    const mapViewButton = document.createElement('button');
    mapViewButton.textContent = 'Map';
    mapViewButton.className = styles['button'];
    mapViewButton.onclick = () => {
      this._map?.setStyle('mapbox://styles/mapbox/streets-v11');
    };
    this._container.appendChild(mapViewButton);

    // Create Satellite View Button
    const satelliteViewButton = document.createElement('button');
    satelliteViewButton.textContent = 'Satellite';
    satelliteViewButton.className = styles['button'];
    satelliteViewButton.onclick = () => {
      this._map?.setStyle('mapbox://styles/mapbox/satellite-v9');
    };
    this._container.appendChild(satelliteViewButton);

    return this._container;
  }

  onRemove(): void {
    if (this._container?.parentNode) {
      this._container.parentNode.removeChild(this._container);
    }
    this._map = undefined;
  }
}

export default ToggleControl;
