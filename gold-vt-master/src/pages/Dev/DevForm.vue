<template>
  <vt-dashboard-view>
    <v-layout
      align-start
      justify-center
    >
      <v-flex md8>
        <v-layout column>
          <v-flex>
            <h2>Элементы формы</h2>
          </v-flex>

          <v-card>
            <v-card-text>
              <vt-form-field label="Текстовое поле">
                <!-- Пример -->
                <v-layout
                  column
                  class="pl-sm-4"
                >
                  <v-flex mb-2>
                    Пример дополнительной области для поля
                  </v-flex>
                  <v-flex mb-2>
                    <v-btn
                      small
                      color="info"
                    >
                      Инфо <v-icon>info</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex mb-2>
                    Еще один текст для примера
                  </v-flex>
                </v-layout>
              </vt-form-field>

              <vt-form-field
                v-model="checkbox"
                component="v-checkbox"
                label="Чекбокс"
              >
                В данный момент нельзя использовать такой вариант для <code>vt-form-field</code>
              </vt-form-field>

              <!-- When use slot is important to bind model to form-field, this enable reactive -->
              <vt-form-field v-model="checkbox">
                <template #component-slot>
                  <v-checkbox
                    v-model="checkbox"
                    label="Чекбокс как слот"
                  />
                </template>
                <div>Состояние чекбокса - {{ checkbox }}</div>
              </vt-form-field>

              <vt-form-field :label="`Радио(${radio})`">
                <template #component-slot>
                  <v-radio-group
                    v-model="radio"
                    row
                  >
                    <v-radio
                      :value="1"
                      label="1"
                    />
                    <v-radio
                      :value="2"
                      label="2"
                    />
                  </v-radio-group>
                </template>
                <v-flex mb-2>
                  <info-btn
                    value="Пример компонента InfoBtn, если нажать на кнопку справа-сверху - в буфер обмена будет скопирован специальный текст"
                    copy-value="lol"
                  />
                </v-flex>
              </vt-form-field>

              <vt-form-field
                component="v-textarea"
                label="Текст"
              />

              <vt-form-field
                component="vt-status-select"
                label="Выбор статуса "
              />

              <vt-form-field
                component="vt-status-select"
                label="Компактный выбор статуса"
                compact
                row
              />

              <!-- Пример подзаголовка с разделителем -->
              <v-layout
                column
                class="mb-2"
              >
                <h3 class="mb-2">
                  Свойства товаров на списке
                </h3>
                <v-divider />
              </v-layout>

              <vt-form-field
                component="vt-entity-autocomplete"
                entity="user"
                label="Поиск сущности"
                item-text="login"
                prefetch
                async
              />

              <vt-form-field
                component="vt-tinymce-editor"
                label="Текстовый редактор"
                without-help
              />

              <vt-form-field
                v-model="file"
                component="vt-file-input"
                label="Загрузка одиночного файла"
              />

              <vt-form-field
                v-model="files"
                component="vt-file-input"
                label="Загрузка нескольких файлов"
                multiple
              />

              <vt-form-field
                v-model="image"
                component="vt-image-input"
                label="Загрузка картинок"
                :image-width="600"
              />
              <vt-form-field
                v-model="images"
                component="vt-image-input"
                label="Множественная загрузка картинок"
                :image-width="200"
                :image-height="150"
                crop
                multiple
              />

              <vt-form-field
                v-model="date"
                component="vt-date-picker"
                label="Дата"
                required
              >
                <v-layout
                  column
                  justify-center
                >
                  <v-flex
                    ml-2
                    mt-2
                  >
                    <div>Итоговое значение: </div>
                    {{ date }}
                  </v-flex>
                </v-layout>
              </vt-form-field>

              <vt-form-field
                v-model="datetime"
                component="vt-datetime-picker"
                time-placeholder="00:00:00"
                label="Дата и время"
                required
                iso
              >
                <v-layout
                  column
                  justify-center
                >
                  <v-flex
                    ml-2
                    mt-2
                  >
                    <div>Итоговое значение: </div>
                    {{ datetime }}
                  </v-flex>
                </v-layout>
              </vt-form-field>

              <vt-form-field
                v-model="rating"
                component="vt-rating-select"
                label="Рейтинг"
              />

              <vt-form-field
                v-model="rating"
                component="vt-rating-select"
                label="Рейтинг compact"
                :min="4"
                :max="5"
                compact
              />

              <p>Макеты с FormLayout</p>
              <form-layout>
                <template #leading>
                  <v-card color="red">
                    WTF
                  </v-card>
                </template>
                <template #label>
                  <v-card color="green">
                    WTF
                  </v-card>
                </template>
                <template #component>
                  <v-card color="blue">
                    WTF
                  </v-card>
                </template>
                <template #help>
                  <v-card color="grey">
                    WTF
                  </v-card>
                </template>
                <template #trailing>
                  <v-card color="yellow">
                    WTF
                  </v-card>
                </template>
              </form-layout>
              <form-layout>
                <template #label>
                  <v-card color="green">
                    WTF
                  </v-card>
                </template>
                <template #component>
                  <v-card color="blue">
                    WTF
                  </v-card>
                </template>
                <template #help>
                  <v-card color="grey">
                    WTF
                  </v-card>
                </template>
              </form-layout>

              <vt-form-field
                component="vt-geo-input"
                label="Точка на карте"
                :latitude="latitude"
                :longitude="longitude"
                :longitude-error-messages="longitudeErrorMessages"
                :latitude-error-messages="latitudeErrorMessages"
                required
                @input:latitude="v => latitude = v"
                @input:longitude="v => longitude = v"
              />
            </v-card-text>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>
  </vt-dashboard-view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import FormLayout from '@/ui/FormField/FormLayout.vue';
import InfoBtn from '@/common/InfoBtn/InfoBtn.vue';

@Component({
  name: 'DevForm',
  components: { FormLayout, InfoBtn },
  data: () => ({
    radio: 1,
    checkbox: true,
    file: null,
    image: null,
    files: [],
    images: [],
    date: '1986-09-20T10:14:00+03:00',
    datetime: '1986-09-20T10:14:00+03:00',
    rating: 3,
    latitude: undefined,
    longitude: undefined
  })
})
export default class DevForm extends Vue {
  longitudeErrorMessages: string = ''
  latitudeErrorMessages: string = ''

  @Watch('longitude')
  setLongitudeError (v: number) {
    this.longitudeErrorMessages = v === 88 ? 'Ошибка долготы' : '';
  }

  @Watch('latitude')
  setLatitudeError (v: number) {
    this.latitudeErrorMessages = v === 14 ? 'Ошибка широты' : '';
  }
}
</script>

<style scoped></style>
