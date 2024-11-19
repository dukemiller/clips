// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Clips',
  tagline: '',

  url: 'https://dukemiller.github.io',
  baseUrl: '/clips/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dukemiller', 
  projectName: 'clips', 
  trailingSlash: false,

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          breadcrumbs: false,
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Clips',
        logo: {
          alt: 'Site Logo',
          src: 'img/logo.svg',
          width: 32,
          height: 32
        },
        items: [
          {
            href: 'https://github.com/dukemiller/clips',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository'
          }
        ],
      },
      
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },

      prism: {
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
