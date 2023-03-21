<template>
  <v-layout class="geo-input">
    <v-flex>
      <v-layout>
        <v-flex>
          <yandex-geo-code v-model="yandexGeoCodeModel" />
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex mr-2>
          <v-text-field
            v-model="latitudeModel"
            :placeholder="$t('vtGeoInput.latitudeLabel')"
            :error-messages="latitudeErrorMessages"
            type="number"
            @focus="onInputFocus"
            @blur="onInputBlur"
          />
        </v-flex>
        <v-flex>
          <v-text-field
            v-model="longitudeModel"
            :placeholder="$t('vtGeoInput.longitudeLabel')"
            :error-messages="longitudeErrorMessages"
            type="number"
            @focus="onInputFocus"
            @blur="onInputBlur"
          />
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex :class="['geo-input-map-wrapper', { withErrors: longitudeErrorMessages || latitudeErrorMessages}]">
          <yandex-map
            :settings="mapSettings"
            :coords="[latitude, longitude]"
            :controls="['zoomControl']"
            :options="{ suppressMapOpenBlock: true }"
            :zoom="zoom"
            @click="onMapClick"
          >
            <ymap-marker
              :coords="[latitude, longitude]"
              marker-id="center"
            />
          </yandex-map>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import { YMAP_API_KEY } from '@/consts/yandex';

type MapEvent = {
  get: (key: string) => any
}

const COORDS_PRECISION = 6;

@Component({
  name: 'GeoInput',
  components: { yandexMap, ymapMarker },
  props: {
    latitude: {
      type: Number,
      default: 59.939095
    },
    longitude: {
      type: Number,
      default: 30.315868
    },
    zoom: {
      type: Number,
      default: 14
    },
    latitudeErrorMessages: String,
    longitudeErrorMessages: String
  }
})
export default class GeoInput extends Vue {
  longitude!: number
  latitude!: number
  latitudeInput!: number
  mapUpdatesDisabled: boolean = false
  inputsUpdateDisabled: boolean = false
  yandexGeoCodeModel: string | null = null;

  mapSettings = {
    apiKey: YMAP_API_KEY,
    lang: 'ru_RU',
    coordorder: 'latlong',
    version: '2.1'
  };

  get longitudeModel () {
    return this.longitude;
  }

  set longitudeModel (v: number) {
    let newValue = 0;
    if (v) {
      const fixed = Number(Number(v).toFixed(COORDS_PRECISION));
      newValue = Math.max(-180, Math.min(180, Number(fixed)));
    }
    this.$emit('input:longitude', newValue);
  }

  get latitudeModel () {
    return this.latitude;
  }

  set latitudeModel (v: number) {
    let newValue = 0;
    if (v) {
      const fixed = Number(Number(v).toFixed(COORDS_PRECISION));
      newValue = Math.max(-90, Math.min(90, Number(fixed)));
    }
    this.$emit('input:latitude', newValue);
  }

  @Watch('yandexGeoCodeModel')
  onYandexGeoCodeModelChange (v: string) {
    if (!v) return;
    const [longitude, latitude] = v.split(' ');
    if (latitude && longitude) {
      this.latitudeModel = Number(latitude);
      this.longitudeModel = Number(longitude);
    }
  }

  onInputFocus () {
    this.mapUpdatesDisabled = true;
  }

  onInputBlur () {
    this.mapUpdatesDisabled = false;
  }

  onBoundsChange (e: MapEvent) {
    if (this.mapUpdatesDisabled) return;
    const [latitude, longitude] = e.get('newCenter');
    this.latitudeModel = latitude;
    this.longitudeModel = longitude;
  }

  onMapClick (e: MapEvent) {
    if (this.mapUpdatesDisabled) return;
    const [latitude, longitude] = e.get('coords');
    this.latitudeModel = latitude;
    this.longitudeModel = longitude;
  }
}
</script>
<style lang="scss">
.geo-input {
  &-map {
    &-wrapper {
      min-height: 300px;

      .ymap-container {
        width: 100%;
        height: 100%;
      }

      &.withErrors {
        margin-top: 14px;
      }
    }
  }
}
</style>
