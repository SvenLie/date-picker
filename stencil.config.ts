import { Config } from "@stencil/core"
import { sass } from "@stencil/sass"

export const config: Config = {
  // See https://github.com/ionic-team/stencil/blob/master/src/declarations/config.ts for config
  namespace: "duet",
  enableCache: true,
  hashFileNames: false,
  autoprefixCss: false,
  minifyCss: true,
  buildEs5: true,
  taskQueue: "immediate",
  preamble: "Built with Duet Design System",
  hashedFileNameLength: 8,
  commonjs: { include: /node_modules|(..\/.+)/ } as any,
  bundles: [{ components: ["duet-date-picker"] }],
  devServer: {
    openBrowser: true,
    port: 3333,
    reloadStrategy: "pageReload",
  },
  extras: {
    // We need the following for IE11 and old Edge:
    cssVarsShim: true,
    dynamicImportShim: true,
    // We don’t use shadow DOM so this is not needed:
    shadowDomShim: false,
    // Setting the below option to “true” will actually break Safari 10 support:
    safari10: false,
    // This is to tackle an Angular specific performance issue:
    initializeNextTick: true,
    // Don’t need any of these so setting them to “false”:
    scriptDataOpts: false,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: false,
  },
  outputTargets: [
    {
      type: "dist-hydrate-script",
      dir: "hydrate",
      empty: false,
    },
    {
      type: "dist-custom-elements-bundle",
      dir: "custom-element",
      empty: true,
    },
    {
      type: "dist",
      dir: "dist",
      empty: true,
      copy: [{ src: "themes", warn: true }],
    },
    {
      type: "docs-readme",
    },
    {
      type: "www",
      dir: "www",
      serviceWorker: null,
      empty: true,
      baseUrl: "https://duetds.github.io/",
      prerenderConfig: "./prerender.config.ts",
      copy: [{ src: "themes", dest: "themes", warn: true }],
    },
  ],
  plugins: [sass()],
  testing: {
    browserHeadless: process.env.TEST_HEADLESS !== "false",
    setupFilesAfterEnv: ["<rootDir>/jest/jest-setup.js"],
    testPathIgnorePatterns: ["<rootDir>/hydrate/", "<rootDir>/dist/"],
  },
}
