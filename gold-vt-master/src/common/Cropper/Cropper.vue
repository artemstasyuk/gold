<template>
  <div :style="containerStyle">
    <img
      ref="img"
      :src="src"
      :alt="alt || 'image'"
      :style="imgStyle"
      crossorigin
      v-on="$listeners"
    >
    <v-layout
      justify-between
      mt-2
    >
      <v-flex>
        <v-btn-toggle dark>
          <v-btn
            icon
            @click="resetEditor"
          >
            <v-icon>mdi-reload</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-flex>
      <v-flex>
        <v-btn-toggle
          dense
          dark
        >
          <v-btn
            icon
            @click="rotate(-90)"
          >
            <v-icon>mdi-rotate-left</v-icon>
          </v-btn>
          <v-btn
            icon
            @click="rotate(90)"
          >
            <v-icon>mdi-rotate-right</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-flex>
      <v-flex shrink>
        <v-btn-toggle>
          <v-btn
            color="green"
            @click="save"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn
            icon
            @click="$emit('close')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Cropper from 'cropperjs';

const previewPropType = typeof window === 'undefined'
  ? [String, Array]
  : [String, Array, Element, NodeList];

@Component({
  props: {
    // Library props
    containerStyle: Object,
    src: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'image/png'
    },
    alt: String,
    imgStyle: Object,

    // CropperJS props
    viewMode: Number,
    dragMode: String,
    initialAspectRatio: Number,
    aspectRatio: Number,
    data: Object,
    preview: previewPropType,
    responsive: {
      type: Boolean,
      default: true
    },
    restore: {
      type: Boolean,
      default: true
    },
    checkCrossOrigin: {
      type: Boolean,
      default: true
    },
    checkOrientation: {
      type: Boolean,
      default: true
    },
    crossorigin: {
      type: String
    },
    modal: {
      type: Boolean,
      default: true
    },
    guides: {
      type: Boolean,
      default: true
    },
    center: {
      type: Boolean,
      default: true
    },
    highlight: {
      type: Boolean,
      default: true
    },
    background: {
      type: Boolean,
      default: true
    },
    autoCrop: {
      type: Boolean,
      default: true
    },
    autoCropArea: Number,
    movable: {
      type: Boolean,
      default: true
    },
    rotatable: {
      type: Boolean,
      default: true
    },
    scalable: {
      type: Boolean,
      default: true
    },
    zoomable: {
      type: Boolean,
      default: true
    },
    zoomOnTouch: {
      type: Boolean,
      default: true
    },
    zoomOnWheel: {
      type: Boolean,
      default: true
    },
    wheelZoomRatio: Number,
    cropBoxMovable: {
      type: Boolean,
      default: true
    },
    cropBoxResizable: {
      type: Boolean,
      default: true
    },
    toggleDragModeOnDblclick: {
      type: Boolean,
      default: true
    },

    // Size limitation
    minCanvasWidth: Number,
    minCanvasHeight: Number,
    minCropBoxWidth: Number,
    minCropBoxHeight: Number,
    minContainerWidth: Number,
    minContainerHeight: Number,

    // callbacks
    ready: Function,
    cropstart: Function,
    cropmove: Function,
    cropend: Function,
    crop: Function,
    zoom: Function
  }
})
export default class VueCropper extends Vue {
  cropper!: Cropper;
  src!: string
  type!: string

  $refs!: {
    img: HTMLCanvasElement | HTMLImageElement
  }

  mounted () {
    const { containerStyle, src, alt, imgStyle, ...data } = this.$options.props as Record<string, any>;
    const props: any = {};

    for (const key in data) {
      if ((this as any)[key] !== undefined) {
        props[key] = (this as any)[key];
      }
    }

    this.cropper = new Cropper(this.$refs.img, props);
  }

  @Watch('src')
  reInit () {
    if (this.src) {
      this.replace(this.src);
    }
  }

  async blob () {
    return new Promise(resolve => this.getCroppedCanvas().toBlob((blob) => resolve(blob), this.type));
  }

  reset () {
    return this.cropper.reset();
  }

  clear () {
    return this.cropper.clear();
  }

  initCrop () {
    return this.cropper.crop();
  }

  resetEditor () {
    this.reset();
    this.clear();
  }

  replace (url: string, onlyColorChanged: boolean = false): object {
    return this.cropper.replace(url, onlyColorChanged);
  }

  enable () {
    return this.cropper.enable();
  }

  disable () {
    return this.cropper.disable();
  }

  destroy () {
    return this.cropper.destroy();
  }

  move (offsetX: number, offsetY: number): object {
    return this.cropper.move(offsetX, offsetY);
  }

  moveTo (x: number, y: number = x): object {
    return this.cropper.moveTo(x, y);
  }

  relativeZoom (ratio: number): object {
    return this.cropper.zoom(ratio);
  }

  zoomTo (ratio: number, _originalEvent: any): object {
    return this.cropper.zoomTo(ratio, _originalEvent);
  }

  rotate (degree: number): object {
    return this.cropper.rotate(degree);
  }

  rotateTo (degree: number): object {
    return this.cropper.rotateTo(degree);
  }

  scaleX (scaleX: number): object {
    return this.cropper.scaleX(scaleX);
  }

  scaleY (scaleY: number): object {
    return this.cropper.scaleY(scaleY);
  }

  scale (scaleX: number, scaleY: number = scaleX): object {
    return this.cropper.scale(scaleX, scaleY);
  }

  getData (rounded: boolean = false): object {
    return this.cropper.getData(rounded);
  }

  setData (data: object): object {
    return this.cropper.setData(data);
  }

  getContainerData () {
    return this.cropper.getContainerData();
  }

  getImageData () {
    return this.cropper.getImageData();
  }

  getCanvasData () {
    return this.cropper.getCanvasData();
  }

  setCanvasData (data: object) {
    return this.cropper.setCanvasData(data);
  }

  getCropBoxData () {
    return this.cropper.getCropBoxData();
  }

  setCropBoxData (data: object) {
    return this.cropper.setCropBoxData(data);
  }

  getCroppedCanvas (options = {}): HTMLCanvasElement {
    return this.cropper.getCroppedCanvas(options);
  }

  setAspectRatio (aspectRatio: number): object {
    return this.cropper.setAspectRatio(aspectRatio);
  }

  setDragMode (mode: string | any) {
    return this.cropper.setDragMode(mode);
  }

  async save () {
    const blob = await this.blob();
    this.$emit('change', blob);
  }
}
</script>

<style src="cropperjs/dist/cropper.css" />
