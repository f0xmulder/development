/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'developer.overheid.nl Documentation',
  tagline: '',
  url: 'https://developer.overheid.nl/docs',
  baseUrl: '/docs/',
  favicon: 'img/favicon.ico',
  organizationName: 'common-ground',
  projectName: 'developer.overheid.nl',
  themeConfig: {
    navbar: {
      title: 'developer.overheid.nl',
      logo: {
        alt: 'developer.overheid.nl logo',
        src: 'img/logo_don.png',
      },
      items: [
        {href: 'https://developer.overheid.nl/overzicht', label: 'Overzicht', position: 'right'},
        {to: 'developer', label: 'Docs', position: 'right'},
        {href: 'https://developer.overheid.nl/api-toevoegen', label: 'API toevoegen', position: 'right'},
        {href: 'https://developer.overheid.nl/over', label: 'Over', position: 'right'},
      ],
    },
    footer: {
      style: 'light',
      links: [],
      logo: {
        alt: 'VNG Realisatie Logo',
        src: 'img/logo_vng_gs.svg',
      },
      copyright: `Copyright © ${new Date().getFullYear()} VNG Realisatie`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          routeBasePath: '',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://gitlab.com/commonground/developer.overheid.nl/tree/master/docs/docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  customFields: {
    startUrl: 'developer',
  },
};
