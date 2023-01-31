import { init } from '@umijs/bundler-utils/compiled/es-module-lexer';
import { fsExtra, importLazy, lodash, Mustache } from '@umijs/utils';
import assert from 'assert';
import { existsSync, readFileSync, statSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { IApi } from './types';
import { isTypeScriptFile } from './utils/isTypeScriptFile';

export default (api: IApi) => {
  [
    'onGenerateFiles',
    'onBeforeCompiler',
    'onBuildComplete',
    'onBuildHtmlComplete',
    'onPatchRoute',
    // 'onPatchRouteBefore',
    // 'onPatchRoutes',
    // 'onPatchRoutesBefore',
    'onPkgJSONChanged', // new
    'onDevCompileDone',
    'onCheckPkgJSON',
    'onCheckCode',
    'onCheckConfig',
    'onBeforeMiddleware',
    'addBeforeMiddlewares',
    'addLayouts',
    'addMiddlewares',
    'addApiMiddlewares',
    'addRuntimePlugin',
    'addRuntimePluginKey',
    // 'addUmiExports',
    'addPolyfillImports',
    'addEntryImportsAhead',
    'addEntryImports',
    'addEntryCodeAhead',
    'addEntryCode',
    'addExtraBabelPresets',
    'addExtraBabelPlugins',
    'addBeforeBabelPresets',
    'addBeforeBabelPlugins',
    'addHTMLMetas',
    'addHTMLLinks',
    'addHTMLStyles',
    'addHTMLHeadScripts',
    'addHTMLScripts',
    'addTmpGenerateWatcherPaths',
    'chainWebpack',
    'modifyEntry',
    'modifyHTMLFavicon',
    'modifyHTML',
    'modifyExportHTMLFiles',
    'modifyWebpackConfig',
    'modifyViteConfig',
    // 'modifyHTMLChunks',
    // 'modifyExportRouteMap',
    // 'modifyPublicPathStr',
    'modifyRendererPath',
    'modifyServerRendererPath',
    'modifyRoutes',
    'modifyBabelPresetOpts',
  ].forEach((name) => {
    api.registerMethod({ name });
  });

  api.onStart(async () => {
    await init;
  });

  api.registerMethod({
    name: 'writeTmpFile',
    fn(opts: {
      path: string;
      content?: string;
      tpl?: string;
      tplPath?: string;
      context?: Record<string, string>;
      noPluginDir?: boolean;
    }) {
      assert(
        api.service.stage >= api.ServiceStage.runCommand,
        `api.writeTmpFile() should not execute in register stage.`,
      );
      const absPath = join(
        api.paths.absTmpPath,
        // @ts-ignore
        this.plugin.key && !opts.noPluginDir ? `plugin-${this.plugin.key}` : '',
        opts.path,
      );
      fsExtra.mkdirpSync(dirname(absPath));
      let content = opts.content;
      if (!content) {
        assert(
          !opts.tplPath ||
            (existsSync(opts.tplPath) && statSync(opts.tplPath).isFile()),
          `opts.tplPath does not exists or is not a file.`,
        );
        const tpl = opts.tplPath
          ? readFileSync(opts.tplPath, 'utf-8')
          : opts.tpl;
        assert(tpl, `opts.tpl or opts.tplPath must be supplied.`);
        assert(
          lodash.isPlainObject(opts.context),
          `opts.context must be plain object.`,
        );
        content = Mustache.render(tpl, opts.context);
      }

      // Only js files generate comments
      const isJsFile = /\.(t|j)sx?$/.test(absPath);

      content = [
        isTypeScriptFile(opts.path) && `// @ts-nocheck`,
        isJsFile && '// This file is generated by Umi automatically',
        isJsFile && '// DO NOT CHANGE IT MANUALLY!',
        content.trim(),
        '',
      ]
        .filter((text) => text !== false)
        .join('\n');

      // transform imports for all javascript-like files only vite mode enable
      if (api.appData.vite && isJsFile) {
        const { default: transformIEAR } = importLazy(
          require.resolve('./utils/transformIEAR'),
        );
        content = transformIEAR({ content, path: absPath }, api);
      }

      if (!existsSync(absPath)) {
        writeFileSync(absPath, content!, 'utf-8');
      } else {
        const fileContent = readFileSync(absPath, 'utf-8');

        if (fileContent.startsWith('// debug') || fileContent === content) {
          return;
        } else {
          writeFileSync(absPath, content!, 'utf-8');
        }
      }
    },
  });
};
