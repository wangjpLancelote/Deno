import {point} from './point';

export interface MapSetting {
    center: point,
    zoom: number,
    minZoom?: number,
    maxZoom?: number,
    scrollWheelZoo?: boolean
}