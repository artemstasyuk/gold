<template>
  <vt-dashboard-view>
    <v-layout justify-center>
      <v-flex
        md8
        xs12
      >
        <v-card>
          <v-card-text>
            <h2>
              Пользователи -
              <router-link :to="{ name: 'userList' }">
                {{ userCount }}
              </router-link>
            </h2>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </vt-dashboard-view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import NotificationService from '@/services/NotificationService';

@Component({})
export default class Dashboard extends Vue {
  data () {
    return {
      userCount: null,
      categoryCount: null,
      newsCount: null
    };
  }

  async mounted () {
    try {
      this.$data.userCount = await this.$api.user.count({});
    } catch (err) {
      NotificationService.add({
        message: `errors.rpc${err.code}`
      });
    }
  }
}
</script>
