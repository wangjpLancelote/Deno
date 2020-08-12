export interface Coordinate {
    lng: number, //经度
    lat: number //纬度
}

export type point = [number , number] | Coordinate; //坐标点

export interface Bounds {
    sw: Coordinate,
    ne: Coordinate
}