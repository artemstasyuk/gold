<template>
  <vt-entity-view>
    <v-layout
      align-start
      justify-center
    >
      <v-flex
        xs12
        md8
        mb-2
      >
        <v-layout
          mb-2
          wrap
        >
          <v-flex>
            <h2 class="ellipsed">
              {{ store.model.login || "..." }}
            </h2>
          </v-flex>
          <v-spacer />
          <v-flex shrink>
            <v-btn
              text
              color="primary"
              :disabled="store.isLoading"
              @click.stop="navigateBack"
            >
              <v-icon
                :left="!$vuetify.breakpoint.xsOnly"
              >
                arrow_back
              </v-icon>
              <template v-if="!$vuetify.breakpoint.xsOnly">
                {{ $t("common.form.cancelButtonLabel") }}
              </template>
            </v-btn>
            <v-hover
              v-if="$route.params.id"
              v-slot="{ hover }"
            >
              <v-btn
                :color="hover ? 'error' : ''"
                icon
                @click.stop="onDelete('login')"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-hover>
          </v-flex>
        </v-layout>
        <v-card v-if="store.model">
          <v-tabs
            v-model="tab"
            mobile-break-point="0"
          >
            <v-tab
              :class="{
                'error--text': tabsHasError.includes(0)
              }"
            >
              Основные
            </v-tab>
          </v-tabs>

          <v-form
            ref="form"
            @submit.prevent="onSaveAndBack"
          >
            <v-card-text>
              <v-tabs-items v-model="tab">
                <v-tab-item eager>
                  <!--  generated part -->
                  <vt-form-field
                    v-model="store.model.login"
                    :label="$t('user.form.loginLabel')"
                    :error-messages="$t(i18nFieldError(store.errors.login))"
                    :disabled="store.isLoading"
                    required
                  />
                  <vt-form-field
                    v-model="store.model.password"
                    :label="$t('user.form.passwordLabel')"
                    :error-messages="$t(i18nFieldError(store.errors.password))"
                    :disabled="store.isLoading"
                    required
                  />
                  <vt-form-field
                    v-model="store.model.statusId"
                    component="vt-status-select"
                    :label="$t('user.form.statusLabel')"
                    :error-messages="$t(i18nFieldError(store.errors.statusId))"
                    :disabled="store.isLoading"
                    compact
                    :row="$vuetify.breakpoint.smAndUp"
                    required
                  />
                  <!-- end of generated part -->
                </v-tab-item>
              </v-tabs-items>
            </v-card-text>
            <v-card-actions>
              <v-layout wrap>
                <v-flex
                  v-if="$vuetify.breakpoint.smAndUp"
                  xs3
                />
                <v-flex>
                  <v-layout wrap>
                    <v-btn
                      type="submit"
                      color="success"
                      :disabled="!store.isChanged || store.isLoading"
                      :loading="store.isLoading"
                      :block="$vuetify.breakpoint.xsOnly"
                    >
                      <v-icon>done</v-icon>
                      {{ $t("common.form.saveAndCloseButtonLabel") }}
                    </v-btn>

                    <v-btn
                      v-if="$route.params.id"
                      :disabled="!store.isChanged || store.isLoading"
                      :loading="store.isLoading"
                      :block="$vuetify.breakpoint.xsOnly"
                      :class="[
                        $vuetify.breakpoint.xsOnly && 'ml-0 mt-2',
                        $vuetify.breakpoint.smAndUp && 'ml-2'
                      ]"
                      @click.stop="onSave"
                    >
                      {{ $t("common.form.saveButtonLabel") }}
                    </v-btn>
                    <v-spacer />
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </vt-entity-view>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import { User as Model } from '@/services/api/factory';
import EntityStore from '@/common/Entity/EntityModelStore';
import EntityForm from '@/common/Entity/EntityForm';
import { collectTypesFromObject } from '@/helpers/typeCast';

/* Extend EntityStore example */
class Store<T> extends EntityStore<T> {
  protected create (Model: any) {
    this.model = new Model();
    this._meta.types = collectTypesFromObject(this.model);
    this.defaultModel = new Model();
    /* Here we not cleaning model with null */
  }
}

@Observer
@Component
export default class Form extends EntityForm {
  store: Store<Model> = new Store<Model>(Model);
}
</script>

<style scoped></style>
