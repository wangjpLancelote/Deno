<template>
  <div class="about">
    <h1>This is an about pageMap</h1>
    <lMap id="lmap" ref="map" :center="center" :zoom="zoom" :minZoom="minZoom" :maxZoom="maxZoom" :config="mapConfig" />
  </div>
</template>
<script>
import lMap from '../map/index'
export default {
  components : {
    lMap
  },
  data () {
    return {
      mapConfig : {
        content: {
          crs: "EPSG3857",
          type: "supermap",
          mapType: "tiledMapLayer",
          url: "https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China"
        }
      },
      // 地图中心点
      center : [39.90586280822754, 116.38834476470947], //中心点坐标
      // 地图初始缩放等级
      zoom : 10,
      // 地图最小缩放等级
      minZoom : 1,
      // 地图最大缩放等级
      maxZoom : 30
    }
  },
  mounted () {
  }
}
</script>
<style lang="less">
.about {
  width: 100%;
  height: 100%;
}
#lmap {
  width: 100%;
  height: 100%;
  background: red;
}

</style>