import { MapSetting } from './setting';
export type MapType = 'leaflet';

export interface LeafletMapConfig {
    url: string,
    mapType: string, //地图类型
    crs: string,
    type: string, //地图类型supermap
    token?: any
}

export type ContentType = any;

export interface MapConfig {
    content: LeafletMapConfig,
    setting?: MapSetting
}