<template>
  <div class="m-map">
    <div id="map" ref="map">
      <!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <filter
          id="x-rays"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
            1 0 0 0 0
            1 0 0 0 0
            0 0 0 1 0"
            in="SourceGraphic"
            result="colormatrix"
          />
          <feComponentTransfer in="colormatrix" result="componentTransfer">
            <feFuncR type="table" tableValues="0 0.11 0.03" />
            <feFuncG type="table" tableValues="0.78 0.31 0.06" />
            <feFuncB type="table" tableValues="0.98 0.55 0.15" />
            <feFuncA type="table" tableValues="0 1" />
          </feComponentTransfer>
          <feBlend
            mode="normal"
            in="componentTransfer"
            in2="SourceGraphic"
            result="blend"
          />
        </filter>
      </svg> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import boyIcon from "@/assets/images/boy-icon.png";
import girlIcon from "@/assets/images/girl-icon.png";

interface Location {
  lat: number;
  lng: number;
}

interface FriendMarker {
  location: Location;
  sex: number;
  // ... 其他属性
}

const map = ref<L.Map | null>(null);
const tiandituKey: string = "702964bdb452160d2edb8f20fe944e6d";

const initMap = async (): Promise<void> => {
  map.value = L.map("map", {
    center: [23.12911, 113.26436],
    zoom: 14,
    minZoom: 3,
    maxZoom: 18,
    reuseTiles: true,
    crs: L.CRS.EPSG3857,
    attributionControl: false,
    zoomControl: false,
  });
  /**
   * 初始化chinaProvider插件
   * 参考https://blog.csdn.net/weixin_45031595/article/details/121751742
   */
  L.TileLayer.ChinaProvider = L.TileLayer.extend({
    initialize: function (type, options) {
      var providers = L.TileLayer.ChinaProvider.providers;
      console.log("type", type);
      var parts = type.split(".");

      var providerName = parts[0];
      var mapName = parts[1];
      var mapType = parts[2];

      var url = providers[providerName][mapName][mapType];
      options.subdomains = providers[providerName].Subdomains;
      options.key = options.key || providers[providerName].key;
      L.TileLayer.prototype.initialize.call(this, url, options);
    },
  });
  L.TileLayer.ChinaProvider.providers = {
    TianDiTu: {
      Normal: {
        Map: "https://t{s}.tianditu.gov.cn/DataServer/wmts?T=vec_w&X={x}&Y={y}&L={z}&tk={key}",
        Annotion:
          "https://t{s}.tianditu.gov.cn/DataServer/wmts?T=cva_w&X={x}&Y={y}&L={z}&tk={key}",
      },
      Satellite: {
        Map: "https://t{s}.tianditu.gov.cn/DataServer/wmts?T=img_w&X={x}&Y={y}&L={z}&tk={key}",
        Annotion:
          "https://t{s}.tianditu.gov.cn/DataServer/wmts?T=cia_w&X={x}&Y={y}&L={z}&tk={key}",
      },
      Terrain: {
        Map: "https://t{s}.tianditu.gov.cn/DataServer/wmts?T=ter_w&X={x}&Y={y}&L={z}&tk={key}",
        Annotion:
          "https://t{s}.tianditu.gov.cn/DataServer/wmts?T=cta_w&X={x}&Y={y}&L={z}&tk={key}",
      },
      Subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
      key: "",
    },

    GaoDe: {
      Normal: {
        Map: "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
      },
      Satellite: {
        Map: "http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        Annotion:
          "http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}",
      },
      Subdomains: ["1", "2", "3", "4"],
    },

    Google: {
      Normal: {
        Map: "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      },
      Satellite: {
        Map: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
      },
      Subdomains: ["mt0", "mt1", "mt2", "mt3"],
    },

    Geoq: {
      Normal: {
        Map: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
        PurplishBlue:
          "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        Gray: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
        Warm: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
      },
      Theme: {
        Hydro:
          "http://thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}",
      },
      Subdomains: [],
    },

    OSM: {
      Normal: {
        Map: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      },
      Subdomains: ["a", "b", "c"],
    },

    Baidu: {
      Normal: {
        Map: "http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1",
      },
      Satellite: {
        Map: "http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46",
        Annotion:
          "http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020",
      },
      Subdomains: "0123456789",
      tms: true,
    },
  };
  L.tileLayer.chinaProvider = function (type, options) {
    return new L.TileLayer.ChinaProvider(type, options);
  };

  //添加切片图层到地图中
  const tiandituLayer = L.tileLayer
    .chinaProvider("TianDiTu.Normal.Map", {
      maxZoom: 18,
      minZoom: 3,
      key: tiandituKey,
    })
    .addTo(map.value);
  L.tileLayer
    .chinaProvider("TianDiTu.Normal.Annotion", {
      maxZoom: 18,
      minZoom: 3,
      key: tiandituKey,
    })
    .addTo(map.value);
  map.value.on("zoomstart", () => {
    map.value.closePopup();
  });
};

const addCover = (list: FriendMarker[]): void => {
  const iconUrlMap: Record<number, string> = {
    0: boyIcon,
    1: girlIcon,
  };

  list.forEach((item: FriendMarker) => {
    if (!item.location || JSON.stringify(item.location) === "{}") {
      item.location = {
        lat: 23.12911,
        lng: 113.26436,
      };
    }

    const marker = L.marker([item.location.lat, item.location.lng], {
      icon: L.icon({
        iconUrl: iconUrlMap[item.sex],
        iconSize: [70, 58],
        iconAnchor: [280, 146],
        className: "custom-marker",
      }),
    });

    if (map.value) {
      marker.addTo(map.value);
    }
  });
};

const setPosition = (lat: number, lng: number): void => {
  if (map.value) {
    const center = L.latLng(lat, lng);
    map.value.setView(center);
  }
};

onMounted(async () => {
  await initMap();
});

defineExpose({
  addCover,
  setPosition,
});
</script>

<style lang="less" scoped>
.m-map {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  #map {
    width: 100%;
    height: 100%;

    :deep(.leaflet-tile-pane) {
      filter: url("#x-rays");
    }
  }
}

@media (max-width: 768px) {
  .m-map {
    :deep(.leaflet-marker-icon) {
      /* 移动端调整标记图标大小 */
      width: 50px !important;
      height: 41px !important; /* 保持原比例 */
    }

    :deep(.leaflet-control-zoom) {
      display: none; /* 可选：隐藏缩放控件 */
    }
  }
}
</style>
