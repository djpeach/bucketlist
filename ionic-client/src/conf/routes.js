export default {
  index: '/',
  example: {
    suggestions: '/example/suggestions',
  }
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