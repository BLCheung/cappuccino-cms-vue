const ErrorRouter = [
  {
    path:      '/401',
    component: () => import('@/views/error-page/401'),
    name:      'Page401',
    hidden:    true,
    meta:      { title: '401', cache: false },
  },
  {
    path:      '/404',
    component: () => import('@/views/error-page/404'),
    name:      'Page404',
    hidden:    true,
    meta:      { title: '404', cache: false },
  },
];

export default ErrorRouter;
