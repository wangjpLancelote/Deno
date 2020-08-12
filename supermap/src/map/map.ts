import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import "@supermap/iclient-leaflet";

import Map from './_abstract/Imap';
import { LeafletMapConfig } from './types';

class LeafletMap extends Map {
    leafletMap: string | any = {};

    // setting: any;

    constructor (config: LeafletMapConfig) {
        super();
        this.leafletMap = config;
    }

    async init (elm: HTMLElement, setting: any = this.setting, listener?: any ): Promise<any> { //初始化地图
        const config = this.leafletMap;
        try {
            if (!(window as any).supermap) {
                this.map = L.map(elm, {
                    //坐标系
                    crs: (L as any).CRS[config.crs],
                    //初始化地图的地理中心
                    center: [setting.center[0], setting.center[1]],
                    //最大放大倍数
                    maxZoom: setting.maxZoom,
                    //最小放大倍数
                    minZoom: setting.minZoom,
                    //初始化地图的缩放
                    zoom: setting.zoom,

                    //默认添加放大控件
                    zoomControl: false,

                    //多边形缩放，地图可被缩放到鼠标画出的矩形内
                    boxZoom: false,

                    //地图是否自适应浏览器窗口
                    trackResize: false,

                    //会允许通过键盘的方向键和加减键来漫游地图
                    keyboard: false,

                    //淡出动画
                    fadeAnimation: true,

                    //缩放动画
                    zoomAnimation: true,

                    //标记缩放动画
                    markerZoomAnimation: true,

                    //属性控制，显示水印
                    attributionControl: false,

                    //通过滚轮缩放
                    scrollWheelZoom: true,

                    //是否拖拽
                    dragging: true,

                    //双击放大缩小
                    doubleClickZoom: false,

                });
                (L as any)[config['type']][config['mapType']](config['url']).addTo(this.map);
            }
            return this.map;
        } catch (e) {
            console.error(e, "map.ts")
        }
    }
}

export default LeafletMap;