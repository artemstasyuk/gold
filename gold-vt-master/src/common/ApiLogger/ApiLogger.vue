<template>
  <div
    v-if="store.enabled"
    class="api-logger"
  >
    <div
      v-if="!opened"
      class="api-logger__toggle"
      @click="opened = true"
    >
      API Logger
    </div>

    <div
      v-if="opened"
      class="api-logger__body"
    >
      <div
        v-if="!currentDiff"
        class="api-logger__view"
      >
        <div
          class="api-logger__close"
          @click="opened = false"
        >
          Закрыть
        </div>

        <div
          v-for="(request, index) in store.history"
          :key="index"
          class="api-logger__item"
        >
          <div class="api-logger__info">
            <div class="api-logger__method">
              {{ request.method }}
            </div>

            <div class="api-logger__params">
              {{ request.params }}
            </div>

            <div
              class="api-logger__action"
              :class="{ _disabled: !request.extensions.Diff }"
              @click="diff(request)"
            >
              Diff
            </div>

            <div
              class="api-logger__action"
              @click="copy(request)"
            >
              cURL
            </div>
          </div>

          <div class="api-logger__date">
            {{ request.startTime | formatDate("HH:mm:ss:SSS") }}
          </div>

          <div class="api-logger__duration">
            Node <strong>{{ request.duration }}ms</strong>
          </div>

          <div class="api-logger__duration">
            <template v-if="request.extensions.DurationLocal">
              Local <strong>{{ request.extensions.DurationLocal }}ms</strong>
            </template>
          </div>

          <div class="api-logger__duration">
            <template v-if="request.extensions.DurationRemote">
              Remote <strong>{{ request.extensions.DurationRemote }}ms</strong>
            </template>
          </div>
        </div>
      </div>

      <div
        v-if="currentDiff"
        class="api-logger__view"
      >
        <div
          class="api-logger__close"
          @click="currentDiff = null"
        >
          Назад
        </div>

        <div
          class="api-logger__diff"
          v-html="currentDiff"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ApiLoggerStore from './ApiLoggerStore';
import { Observer } from 'mobx-vue';

function getUserArg () {
  if (!import.meta.env.VITE_RPC_USER) return '';
  return (
    '--user ' +
    [import.meta.env.VITE_RPC_USER, import.meta.env.VITE_RPC_PASSWORD].join(':') +
    ' '
  );
}

function getAuthArg (token: string) {
  if (!token) return '';
  return `--header Authorization2: ${token} `;
}

/* eslint-disable no-useless-escape */
function buildCurl ({
  method,
  params,
  token
}: {
  method: string;
  params: any;
  token: string;
}) {
  return `curl -X POST ${getUserArg()}--header "Content-Type: application/json" --header "Accept: application/json" ${getAuthArg(
    token
  )}-d '{
    \"jsonrpc\": \"2.0\",
    \"method\": \"${method}\",
    \"params\": ${JSON.stringify(params)},
    \"id\": 1
  }' "${import.meta.env.VITE_RPC_URL}"`;
}

/* eslint-disable-next-line */
function copyToClipboard(text: string){
  const id = 'mycustom-clipboard-textarea-hidden-id';
  let existsTextarea = document.querySelector(`#${id}`);

  if (!existsTextarea) {
    const textarea = document.createElement('textarea');
    textarea.id = id;
    textarea.style.position = 'fixed';
    textarea.style.top = '0px';
    textarea.style.left = '0px';

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textarea.style.width = '1px';
    textarea.style.height = '1px';

    // We don't need padding, reducing the size if it does flash render.
    textarea.style.padding = '0px';

    // Clean up any borders.
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textarea.style.background = 'transparent';
    const body = document.querySelector('body');
    if (body) {
      body.append(textarea);
      existsTextarea = document.querySelector(`#${id}`);
    }
  }

  if (existsTextarea) {
    // @ts-ignore
    existsTextarea.value = text;
    // @ts-ignore
    existsTextarea.select();
  }

  try {
    return Boolean(document.execCommand('copy'));
  } catch {
    return false;
  }
}

@Observer
@Component
export default class ApiLogger extends Vue {
  store = ApiLoggerStore;
  currentDiff!: any;

  data () {
    return {
      opened: false,
      currentDiff: null
    };
  }

  copy (request: any) {
    copyToClipboard(buildCurl(request));
  }

  diff (request: any) {
    if (!request.extensions.Diff) return;

    this.currentDiff = request.extensions.Diff;
  }
}
</script>

<style lang="scss">
.api-logger {
  &__toggle {
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 120px;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
    background: #ffda34;
    border-radius: 4px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  &__body {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    max-width: 100%;
    overflow: auto;
    font-size: 14px;
    background: #fff;
    box-shadow: 0 2px 3px rgba(#000, 0.3);
    overscroll-behavior: contain;
  }

  &__view {
    min-width: 70vw;
    padding: 16px;
    overflow: auto;
    background: #fff;
    overscroll-behavior: contain;
  }

  &__diff {
    padding-bottom: 20px;
    overflow: auto;
    font-family: monospace;
    line-height: 22px;
  }

  &__info {
    display: flex;
    flex-grow: 1;
    align-items: center;
    padding-right: 8px;
  }

  &__method {
    flex-basis: 200px;
    min-width: 200px;
    padding-right: 8px;
  }

  &__params {
    flex: 1;
    max-width: 400px;
    min-width: 300px;
    color: #999;
    font-size: 14px;
  }

  &__action {
    display: inline-block;
    margin-left: 16px;
    padding: 2px 8px;
    background-color: #ffda34;
    border-radius: 4px;
    cursor: pointer;

    &._disabled {
      color: #a7a7a7;
      background-color: #f6f6f6;
      pointer-events: none;
    }
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 -16px;
    padding: 8px 16px;
    border-bottom: 1px solid #eee;

    &:hover {
      background: #f2f2f2;
    }
  }

  &__date {
    width: 110px;
    padding: 0 8px;
    color: #999;
  }

  &__duration {
    width: 70px;
    padding: 0 8px;
    color: #999;

    strong {
      display: block;
      color: #000;
      font-weight: bold;
    }
  }

  &__close {
    margin-bottom: 16px;
    font-size: 16px;
    text-align: right;
    cursor: pointer;
  }
}
</style>
