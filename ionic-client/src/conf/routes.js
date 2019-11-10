export default {
  index: '/',
  home: '/home',
  lists: {
    create: '/lists/new',
    list: '/lists',
    detail: '/lists/:id',
    delete: '/lists/delete'
  },
  suggestions: {
    create: '/suggestions/new',
    list: '/suggestions',
    detail: '/suggestions/:id',
    delete: '/suggestions/delete'
  },
  more: '/more',
}

export const routeWithParams = (route, ...params) => {
  const re = /(?<=\/):\w+/g;
  let i = 0;
  let match;
  while ((match = re.exec(route)) != null) {
    route = route.replace(match[0], params[i]);
    i++;
  }
  return route;
}