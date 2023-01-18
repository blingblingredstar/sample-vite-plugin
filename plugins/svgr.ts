import { Plugin } from 'vite';
import resolve from 'resolve';
import fs from 'fs';

interface SvgrOptions {
  defaultExport: 'url' | 'component';
}

export default function viteSvgrPlugin(
  { defaultExport }: SvgrOptions = { defaultExport: 'url' }
): Plugin {
  return {
    name: 'vite-plugin-svgr',
    async transform(code, id) {
      if (!id.endsWith('.svg')) return code;

      const svgrTransform = (await import('@svgr/core')).transform;
      const esbuildPackagePath = resolve.sync('esbuild', {
        basedir: require.resolve('vite'),
      });
      const esbuild = await import(esbuildPackagePath);
      const svg = await fs.promises.readFile(id, 'utf-8');
      const svgrResult = await svgrTransform(
        svg,
        {},
        { componentName: 'ReactComponent' }
      );
      let componentCode = svgrResult;
      if (defaultExport === 'url') {
        componentCode += code;
        componentCode = componentCode.replace(
          'export default ReactComponent',
          'export { ReactComponent }'
        );
        console.log(componentCode);
      }
      const result = await esbuild.transform(componentCode, {
        loader: 'jsx',
      });

      return {
        code: result.code,
        map: null,
      };
    },
  };
}
