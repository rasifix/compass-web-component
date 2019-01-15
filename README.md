# compass-web-component
Interactive compass logo as a webcomponent.

```
<script src="https://unpkg.com/vue"></script>
<!--Load the web component polyfill-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.2.0/webcomponents-loader.js"></script>
<script src="./compass-view.js"></script>

<compass-view radius="18"></compass-view>
```

## Project setup
```
npm install
```

## Build Web Component
```
vue build --target wc --name compass-view ./src/components/Compass.vue
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
