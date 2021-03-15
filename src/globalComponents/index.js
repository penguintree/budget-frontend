const context = require.context('./', false, /\.vue$/);

const namedComponents = {};
for (let key of context.keys()) {
   const name = key.slice(2, -4);
   namedComponents[name] = context(key).default;
}

export default namedComponents;