/* eslint-disable */
export default [
  /* VfsFile */
  {
    name: "vfsFileList",
    path: "/vfs-files",
    component: () =>
      import("@/pages/Entity/VfsFile/List.vue"),
    meta: {
      breadcrumbs: ["dashboard", "vfsFileList"]
    }
  },
  {
    name: "vfsFileEdit",
    path: "/vfs-files/:id/edit",
    component: () =>
      import("@/pages/Entity/VfsFile/Form.vue"),
    meta: {
      breadcrumbs: ["dashboard", "vfsFileList", "vfsFileEdit"]
    }
  },
  {
    name: "vfsFileAdd",
    path: "/vfs-files/add",
    component: () =>
      import("@/pages/Entity/VfsFile/Form.vue"),
    meta: {
      breadcrumbs: ["dashboard", "vfsFileList", "vfsFileAdd"]
    }
  },
  /* VfsFolder */
  {
    name: "vfsFolderList",
    path: "/vfs-folders",
    component: () =>
      import("@/pages/Entity/VfsFolder/List.vue"),
    meta: {
      breadcrumbs: ["dashboard", "vfsFolderList"]
    }
  },
  {
    name: "vfsFolderEdit",
    path: "/vfs-folders/:id/edit",
    component: () =>
      import("@/pages/Entity/VfsFolder/Form.vue"),
    meta: {
      breadcrumbs: ["dashboard", "vfsFolderList", "vfsFolderEdit"]
    }
  },
  {
    name: "vfsFolderAdd",
    path: "/vfs-folders/add",
    component: () =>
      import("@/pages/Entity/VfsFolder/Form.vue"),
    meta: {
      breadcrumbs: ["dashboard", "vfsFolderList", "vfsFolderAdd"]
    }
  },
  /* Category */
  {
    name: "categoryList",
    path: "/categories",
    component: () =>
      import("@/pages/Entity/Category/List.vue"),
    meta: {
      breadcrumbs: ["dashboard", "categoryList"]
    }
  },
  {
    name: "categoryEdit",
    path: "/categories/:id/edit",
    component: () =>
      import("@/pages/Entity/Category/Form.vue"),
    meta: {
      breadcrumbs: ["dashboard", "categoryList", "categoryEdit"]
    }
  },
  {
    name: "categoryAdd",
    path: "/categories/add",
    component: () =>
      import("@/pages/Entity/Category/Form.vue"),
    meta: {
      breadcrumbs: ["dashboard", "categoryList", "categoryAdd"]
    }
  },
  /* News */
  {
    name: "newsList",
    path: "/news",
    component: () =>
      import("@/pages/Entity/News/List.vue"),
    meta: {
      breadcrumbs: ["dashboard", "newsList"]
    }
  },
  {
    name: "newsEdit",
    path: "/news/:id/edit",
    component: () =>
      import("@/pages/Entity/News/Form.vue"),
    meta: {
      breadcrumbs: ["dashboard", "newsList", "newsEdit"]
    }
  },
  {
    name: "newsAdd",
    path: "/news/add",
    component: () =>
      import("@/pages/Entity/News/Form.vue"),
    meta: {
      breadcrumbs: ["dashboard", "newsList", "newsAdd"]
    }
  },
  /* Tag */
  {
    name: "tagList",
    path: "/tags",
    component: () =>
      import("@/pages/Entity/Tag/List.vue"),
    meta: {
      breadcrumbs: ["dashboard", "tagList"]
    }
  },
  {
    name: "tagEdit",
    path: "/tags/:id/edit",
    component: () =>
      import("@/pages/Entity/Tag/Form.vue"),
    meta: {
      breadcrumbs: ["dashboard", "tagList", "tagEdit"]
    }
  },
  {
    name: "tagAdd",
    path: "/tags/add",
    component: () =>
      import("@/pages/Entity/Tag/Form.vue"),
    meta: {
      breadcrumbs: ["dashboard", "tagList", "tagAdd"]
    }
  },
];
