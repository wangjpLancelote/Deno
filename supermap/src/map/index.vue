<template>
    <div class="mapContainer" style="width:100%;height:2000px;">
        <div>基础地图渲染模板</div>
        <div ref="map" class="map"></div>
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Provide } from "vue-property-decorator";
import MapFunction from './mapFunction'
@Component({
    name: 'lMap'
})
export default class leafletMap extends Vue {
    //地图示例
    Map?: any;

    //地图是否存在
    existence: boolean = false;

    //地图配置文件
    @Prop() config!: any;

    @Prop({type: [Array, Object], required: true}) center !: [number, number] | { lng: number, lat: number }; //经纬度坐标

    @Prop({required: true}) zoom!: number;

    @Prop() minZoom!: number;

    @Prop() maxZoom!: number;

    @Prop({default: true}) scrollWheelZoom!: boolean;

    @Prop({default: true}) draggable !: boolean;

    get mapSetting () {
        return {
            center: this.center,
            zoom: this.zoom,
            minZoom: this.minZoom,
            maxZoom: this.maxZoom,
            scrollWheelZoom: this.scrollWheelZoom,
            draggable: this.draggable
        }
    }

    async init () { //初始化地图
        try {
            if (this.Map) {
                return await this.Map.init(this.$refs.map as HTMLElement, this.mapSetting, this.$listeners);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async mounted () {
        console.log('===========>>>mounted');
        this.Map = await MapFunction.createMap(this.config);
        this.init().then(event => {
            this.existence = true;
        }); //挂载实例,调用初始化方法
        // this.existence = true;
    }

}
</script>
<style lang="less">
.mapContainer {
    width: 100%;
    height: 100%;
}
.map {
    width: 100%;
    height: 100%;
}
</style>