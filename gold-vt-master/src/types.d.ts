import Vue from 'vue';
import ApiService from '@/services/api';
import VfsService from '@/services/vfs';
import { ApiFactoryType } from '@/services/api/ApiService';
import { VfsFactoryType } from '@/services/vfs/VfsService';

declare module 'vue/types/vue' {

  interface Vue {
    $apiService: typeof ApiService;
    $vfsService: typeof VfsService;
    $api: ApiFactoryType;
    $vfs: VfsFactoryType;
    $t: any;
  }
}
