<template>
  <vt-entity-view>
    <v-layout
      align-start
      justify-center
    >
      <v-flex column>
        <v-layout justify-center>
          <v-flex
            xs12
            md8
          >
            <v-layout
              align-center
              mb-2
              wrap
            >
              <v-flex>
                <v-layout align-center>
                  <h2 class="ellipsed mr-1">
                    {{ $t("user.list.title") }}
                  </h2>
                  <span
                    v-if="store.pagination.totalItems"
                    class="text--secondary subtitle-2"
                  >
                    {{ store.pagination.totalItems }}
                  </span>
                </v-layout>
              </v-flex>
              <v-spacer />
              <v-flex shrink>
                <v-btn
                  small
                  dark
                  color="success"
                  :to="{ name: 'userAdd' }"
                >
                  <v-icon>add</v-icon>
                  {{ $t("common.list.addNewLabel") }}
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

        <!-- Complex Table -->
        <v-layout justify-center>
          <v-flex shrink>
            <v-card>
              <!-- Quick filter, chips -->
              <v-card-title class="pt-0">
                <v-layout
                  justify-space-between
                  align-end
                  wrap
                  class="flex-sm-nowrap"
                >
                  <v-flex
                    xs12
                    sm4
                    md3
                    mr-sm-2
                  >
                    <v-text-field
                      v-model="store.filters.login"
                      :placeholder="
                        $t('user.list.filter.quickFilterPlaceholder')
                      "
                      hide-details
                      @keyup.enter.native="submitFilters()"
                    />
                  </v-flex>
                  <v-flex
                    xs12
                    ml-sm-10
                    mr-sm-10
                  >
                    <multi-filters
                      :filters="store.filters"
                      :active-filters="store.activeFilters"
                      @submitFilters="submitFilters"
                    />
                  </v-flex>
                  <v-flex
                    v-if="$vuetify.breakpoint.smAndUp"
                    mt-sm-4
                  >
                    <vt-compact-pagination
                      :value="store.pagination.page"
                      :total-pages="store.pagination.totalPages"
                      @input="setCompactPagination"
                    />
                  </v-flex>
                </v-layout>
              </v-card-title>

              <!-- Table -->
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="store.list"
                :options="store.vuetifyTableOptions"
                :server-items-length="store.pagination.totalItems"
                item-key="id"
                :footer-props="{
                  itemsPerPageOptions: [10, 25, 50, 100, 500]
                }"
                :class="[
                  'data-table-wrapper-sticky-fix',
                  {
                    'min-width-table': $vuetify.breakpoint.mdAndUp,
                    'min-width-table-full': $vuetify.breakpoint.smAndDown,
                    smAndDown: $vuetify.breakpoint.smAndDown
                  }
                ]"
                :show-select="false"
                :loading="store.isLoading"
                fixed-header
                @update:options="setPagination"
              >
                <template #item.login="{ item }">
                  <router-link
                    :to="{ name: 'userEdit', params: { id: item.id } }"
                    class="font-weight-medium"
                  >
                    {{ item.login }}
                  </router-link>
                </template>
                <template #item.createdAt="{ item }">
                  {{ item.createdAt | tableDate }}
                </template>
                <template #item.lastActivityAt="{ item }">
                  {{ item.lastActivityAt | tableDate }}
                </template>
                <template #item.status="{ item }">
                  <span class="text-no-wrap">
                    <vt-status-badge
                      v-model="item.status"
                      small
                    />
                  </span>
                </template>
                <template #item.id="{ item }">
                  <span class="text-no-wrap">
                    <v-hover v-slot="{ hover }">
                      <v-btn
                        text
                        dark
                        icon
                        :color="hover ? 'red' : 'grey'"
                        @click="deleteItem(item, 'login')"
                      >
                        <v-icon small>delete</v-icon>
                      </v-btn>
                    </v-hover>
                  </span>
                </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </vt-entity-view>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Observer } from 'mobx-vue';
import EntityList from '@/common/Entity/EntityList';
import Store from '@/common/Entity/EntityCollectionStore';
import { User as Model, UserSearch as SearchModel } from '@/services/api/factory';
import MultiFilters from './components/MultiListFilters.vue';

@Observer
@Component({
  name: 'List',
  components: { MultiFilters }
})
export default class List extends EntityList {
  store: Store = new Store(Model, SearchModel);

  get headers () {
    return [
      {
        text: this.$t('user.list.headers.login'),
        align: 'left',
        value: 'login'
      },
      {
        text: this.$t('user.list.headers.createdAt'),
        align: 'left',
        value: 'createdAt'
      },
      {
        text: this.$t('user.list.headers.lastActivityAt'),
        align: 'left',
        value: 'lastActivityAt'
      },
      {
        text: this.$t('user.list.headers.status'),
        align: 'left',
        value: 'status',
        sortable: false
      },
      {
        text: this.$t('user.list.headers.actions'),
        value: 'id',
        align: 'right',
        sortable: false
      }
    ];
  }
}
</script>

<style lang="scss"></style>
