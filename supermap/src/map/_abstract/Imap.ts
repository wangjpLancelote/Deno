import { ContentType, MapSetting, LeafletMapConfig } from '../types'
abstract class Map {
    map: any = null; //地图
    config: ContentType; //配置
    setting!: MapSetting; //地图配置
}

export default Map;