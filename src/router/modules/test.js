import Layout from '@/layout';

import componentsRouter from '@/router/modules/components'
import chartsRouter     from '@/router/modules/charts'
import tableRouter      from '@/router/modules/table'
import nestedRouter     from '@/router/modules/nested'

const testRouter = [
  {
    path:      '/documentation',
    component: Layout,
    children:  [
      {
        path:      'index',
        component: () => import('@/views/documentation/index'),
        name:      'Documentation',
        meta:      { title: 'Documentation', icon: 'documentation', affix: true },
      },
    ],
  },
  {
    path:      '/guide',
    component: Layout,
    redirect:  '/guide/index',
    children:  [
      {
        path:      'index',
        component: () => import('@/views/guide/index'),
        name:      'Guide',
        meta:      { title: 'Guide', icon: 'guide', cache: false },
      },
    ],
  },
  
  {
    path:       '/permission',
    component:  Layout,
    redirect:   '/permission/page',
    alwaysShow: true, // will always show the root menu
    name:       'Permission',
    meta:       {
      title: 'Permission',
      icon:  'lock',
      roles: [ 'admin', 'editor' ], // you can set roles in root nav
    },
    children:   [
      {
        path:      'page',
        component: () => import('@/views/permission/page'),
        name:      'PagePermission',
        meta:      {
          title: 'Page Permission',
          roles: [ 'admin' ], // or you can only set roles in sub nav
        },
      },
      {
        path:      'directive',
        component: () => import('@/views/permission/directive'),
        name:      'DirectivePermission',
        meta:      {
          title: 'Directive Permission',
          // if do not set roles, means: this page does not require permission
        },
      },
      {
        path:      'role',
        component: () => import('@/views/permission/role'),
        name:      'RolePermission',
        meta:      {
          title: 'Role Permission',
          roles: [ 'admin' ],
        },
      },
    ],
  },
  
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,
  
  {
    path:      '/example',
    component: Layout,
    redirect:  '/example/list',
    name:      'Example',
    meta:      {
      title: 'Example',
      icon:  'el-icon-s-help',
    },
    children:  [
      {
        path:      'create',
        component: () => import('@/views/example/create'),
        name:      'CreateArticle',
        meta:      { title: 'Create Article', icon: 'edit' },
      },
      {
        path:      'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name:      'EditArticle',
        meta:      { title: 'Edit Article', cache: false, activeMenu: '/example/list' },
        hidden:    true,
      },
      {
        path:      'list',
        component: () => import('@/views/example/list'),
        name:      'ArticleList',
        meta:      { title: 'Article List', icon: 'list' },
      },
    ],
  },
  {
    path:      '/tab',
    component: Layout,
    children:  [
      {
        path:      'index',
        component: () => import('@/views/tab/index'),
        name:      'Tab',
        meta:      { title: 'Tab', icon: 'tab' },
      },
    ],
  },
  {
    path:      '/error-log',
    component: Layout,
    children:  [
      {
        path:      'log',
        component: () => import('@/views/error-log/index'),
        name:      'ErrorLog',
        meta:      { title: 'Error Log', icon: 'bug' },
      },
    ],
  },
  
  {
    path:      '/excel',
    component: Layout,
    redirect:  '/excel/export-excel',
    name:      'Excel',
    meta:      {
      title: 'Excel',
      icon:  'excel',
    },
    children:  [
      {
        path:      'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name:      'ExportExcel',
        meta:      { title: 'Export Excel' },
      },
      {
        path:      'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name:      'SelectExcel',
        meta:      { title: 'Export Selected' },
      },
      {
        path:      'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name:      'MergeHeader',
        meta:      { title: 'Merge Header' },
      },
      {
        path:      'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name:      'UploadExcel',
        meta:      { title: 'Upload Excel' },
      },
    ],
  },
  
  {
    path:       '/zip',
    component:  Layout,
    redirect:   '/zip/download',
    alwaysShow: true,
    name:       'Zip',
    meta:       { title: 'Zip', icon: 'zip' },
    children:   [
      {
        path:      'download',
        component: () => import('@/views/zip/index'),
        name:      'ExportZip',
        meta:      { title: 'Export Zip' },
      },
    ],
  },
  
  {
    path:      '/pdf',
    component: Layout,
    redirect:  '/pdf/index',
    children:  [
      {
        path:      'index',
        component: () => import('@/views/pdf/index'),
        name:      'PDF',
        meta:      { title: 'PDF', icon: 'pdf' },
      },
    ],
  },
  {
    path:      '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden:    true,
  },
  
  {
    path:      '/theme',
    component: Layout,
    children:  [
      {
        path:      'index',
        component: () => import('@/views/theme/index'),
        name:      'Theme',
        meta:      { title: 'Theme', icon: 'theme' },
      },
    ],
  },
  
  {
    path:      '/clipboard',
    component: Layout,
    children:  [
      {
        path:      'index',
        component: () => import('@/views/clipboard/index'),
        name:      'ClipboardDemo',
        meta:      { title: 'Clipboard', icon: 'clipboard' },
      },
    ],
  },
  
  {
    path:      'external-link',
    component: Layout,
    children:  [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link' },
      },
    ],
  },
]
