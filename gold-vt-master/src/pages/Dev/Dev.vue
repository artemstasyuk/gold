<template>
  <vt-dashboard-view>
    <v-layout
      align-start
      justify-center
    >
      <v-flex md8>
        <v-layout column>
          <v-flex>
            <h2>Проверка ошибок RPC</h2>
          </v-flex>

          <v-card>
            <v-card-text>
              <v-flex mb-2>
                <v-btn
                  color="warning"
                  @click.stop="sendError(400)"
                >
                  400
                </v-btn>
                - отлавливается в месте вызова, стандартное сообщение
              </v-flex>
              <v-flex mb-2>
                <v-btn
                  color="accent"
                  @click.stop="sendError(401)"
                >
                  401
                </v-btn>
                - отлавливается в api-клиенте,
                <strong>принудительная деавторизация</strong>
              </v-flex>
              <v-flex mb-2>
                <v-btn
                  color="accent"
                  @click.stop="sendError(403)"
                >
                  403
                </v-btn>
                - в примере не обрабатывается
              </v-flex>
              <v-flex mb-2>
                <v-btn
                  color="info"
                  @click.stop="sendError(404)"
                >
                  404
                </v-btn>
                - отлавливается в месте вызова, кастомный цвет
              </v-flex>
              <v-flex mb-2>
                <v-btn
                  color="error"
                  @click.stop="sendError(500)"
                >
                  500
                </v-btn>
                - отлавливается в api-клиенте
              </v-flex>
            </v-card-text>
          </v-card>

          <v-flex>
            <h2>Компоненты системы</h2>
          </v-flex>

          <block
            title="Компонент поля для формы"
            tag="vt-form-field"
          >
            <vt-form-field
              component="v-text-field"
              label="Имя"
            />
            <v-flex class="text--accent-1">
              Лейбл слева или внутри поля в зависимости от размера страницы
            </v-flex>
            <v-divider />
            <v-flex>
              Props:
              <ul>
                <li>
                  component - строка с тегом который будет создан внутри,
                  например component="vt-entity-autocomplete"; по умолчанию -
                  v-text-field
                </li>
              </ul>
            </v-flex>
          </block>

          <block
            title="Автокомплит и поиск"
            tag="vt-entity-autocomplete"
          >
            <vt-entity-autocomplete
              entity="articlerubric"
              label="Рубрика статей"
              chips
              async
            />
            <v-flex>
              Props:
              <ul>
                <li>async - поиск по строке ввода; false по умолчанию</li>
                <li>
                  prefetch - загрузка списка сущностей при создании компонета;
                  false по умолчанию
                </li>
                <li>limit - лимит для поиска; 500 по умолчанию</li>
                <li>
                  searchBy - имя поля сущности для поиска; titleLike по
                  умолчанию
                </li>
                <li>
                  searchByMultiple - при использовании multiple для получения
                  данных о выбранных сущностях используется один запрос который
                  передает массив id. Это свойство определяет имя поля для
                  такого запроса.
                </li>
              </ul>
            </v-flex>
          </block>

          <block
            title="Файл"
            tag="vt-file-input"
          >
            <vt-file-input
              placeholder="Select file or few"
              :multiple="fileMultiple"
              small-chips
            />
            <v-flex>
              <v-switch
                v-model="fileMultiple"
                color="primary"
                label="Мультивыбор"
              />
            </v-flex>
            <v-divider />
            <v-flex class="text--accent-1">
              Обертка над <strong>v-file-input</strong>. Добавляется dropzone,
              все свойства прокидываются в v-file-input
            </v-flex>
          </block>

          <block
            title="VFS файл"
            tag="vt-vfs-file-input"
          >
            <vt-vfs-file-input
              v-model="vfsFileId"
              :file="vfsFile"
              @input:file="file => vfsFile = file"
            />
          </block>

          <block
            title="VFS изображение"
            tag="vt-vfs-image"
          >
            <vt-vfs-image
              v-model="vfsImage"
              max-height="48"
              max-width="48"
            />
          </block>

          <block
            title="VFS файл-изображение"
            tag="vt-vfs-image-input"
          >
            <vt-vfs-image-input
              v-model="vfsFileId"
              :file="vfsFile"
              @input:file="file => vfsFile = file"
            />
          </block>

          <block
            title="Выбор статуса"
            tag="vt-status-select"
          >
            <vt-status-select
              :value="1"
              :compact="statusSelectCompact"
              :row="statusSelectCompact"
            />
            <v-flex>
              <v-switch
                v-model="statusSelectCompact"
                color="primary"
                label="compact"
              />
            </v-flex>
          </block>

          <block title="Дата и время">
            <code>&lt;vt-date-picker /&gt;</code>
            <vt-date-picker />

            <code>&lt;vt-time-picker /&gt;</code>
            <vt-time-picker />

            <code>&lt;vt-datetime-picker /&gt;</code>
            <vt-datetime-picker />
          </block>

          <block
            title="Поиск по набору значений"
            tag="vt-array-search"
          >
            <vt-array-search
              v-model="arraySearcValue"
              label="ID's"
            />
            <v-flex class="text--accent-1">
              Для ограничения ввода и вставки используются свойства
              <strong>matchPattern</strong> и <strong>pastePattern</strong>.
            </v-flex>
          </block>

          <block
            title="Текстовый редактор"
            tag="vt-tinymce-editor"
          >
            <vt-tinymce-editor :value="tinyMceValue" />
          </block>

          <block
            title="Транслитератор"
            tag="vt-transliterator"
          >
            <vt-form-field
              v-model="titleForTransliterator"
              component="v-text-field"
              label="Транслитирируемое значение"
              placeholder=""
            />

            <vt-form-field
              v-model="aliasForTransliterator"
              label="Готовое значение"
              component="vt-transliterator"
              :value-for-transliterating="titleForTransliterator"
              placeholder=""
            />

            <v-flex class="text--accent-1">
              Свойство для транслитерируемого значения
              <strong>:value-for-transliterating</strong>
            </v-flex>
          </block>

          <block
            title="Выбор true/false/null для фильтров"
            tag="vt-boolean-select"
          >
            <vt-form-field
              v-model="booleanSelectModel"
              component="vt-boolean-select"
              label="Что-то где был чекбокс"
              clearable
            />
          </block>
          <block
            title="Pluralize"
          >
            <span v-pre>
              {{ pluralizeValue | pluralize("человек", "человека", "человек") }}
            </span>
            <v-text-field v-model="pluralizeValue" />
            {{ pluralizeValue || 0 }} {{ pluralizeValue | pluralize("человек", "человека", "человек") }}
          </block>
        </v-layout>
      </v-flex>
    </v-layout>
  </vt-dashboard-view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Block from './components/Block.vue';
import NotificationService from '@/services/NotificationService';

@Component({
  name: 'Dev',
  components: { Block }
})
export default class Dev extends Vue {
  data () {
    return {
      fileMultiple: false,
      arraySearcValue: [1, 2, 3],
      tinyMceValue: `Является оболочкой для TinyMCE Editor. Сам редактор загружается
      на этапе подключения плагинов.
      <br />
      Настройка, на данный момент, производится внутри компонента
      <i>ui/inputs/TinyMceEditor.vue</i>
      `,
      statusSelectCompact: false,
      vfsFile: { id: 1025, path: '/media/202001/50_1025.jpg', name: 'Astral-Chain-Standaard1', extension: 'jpg' },
      vfsFileId: 1025,
      vfsImage: { webPath: '/256/1/70/17019552ef9d39bc48e2260afeb98dec.jpg' },
      titleForTransliterator: '',
      aliasForTransliterator: '',
      booleanSelectModel: null,
      pluralizeValue: 2
    };
  }

  async sendError (code: number) {
    try {
      // @ts-ignore
      await this.$api.auth.rpcError({
        code
      });
    } catch (err) {
      if (err.code === 400) {
        NotificationService.add({
          message: 'errors.rpc400',
          color: 'warning'
        });
      }

      if (err.code === 404) {
        NotificationService.add({
          raw: true,
          message: 'Пойманная на странице ошибка 404',
          color: 'deep-purple darken-1'
        });
      }
    }
  }
}
</script>

<style scoped></style>
