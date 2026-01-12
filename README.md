
# Trust OS - Library

Prototipo de Trust OS - Library basado en el bundle original (Figma: https://www.figma.com/design/sXYpvwM9MlIhkgD9gGYW4l/Trust-OS---Library).

## Desarrollo

```sh
npm ci
npm run dev
```

## Lint

```sh
npm run lint
```

## Build

```sh
npm run build
```

El build se publica en `docs/` para GitHub Pages.

## Deploy (GitHub Pages)

1. Ejecuta `npm run build`.
2. Commitea los cambios generados en `docs/`.
3. En GitHub, configura Pages para servir desde la carpeta `/docs`.

El `base` de Vite está configurado como `./` para funcionar en subrutas de GitHub Pages.
  
