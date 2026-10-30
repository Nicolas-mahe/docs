// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Volcano Solutions Docs',
  favicon: '/img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.volcano-solutions.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      navbar: {
        style: 'dark',
        logo: {
          alt: 'Volcano Solutions Full Logo',
          src: 'https://www.volcano-solutions.com/static/img/logo1.png'
        }
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Development',
            items: [
              {
                label: 'GitLab',
                href: 'https://gitlab.chou-dou.com',
              }
            ],
          },
          {
            title: 'Links',
            items: [
              {
                label: 'Homepage',
                href: 'https://www.volcano-solutions.net',
              }
            ],
          },
          {
            title: 'Website',
            items: [
              {
                label: 'Volcano Solutions',
                href: 'https://www.volcano-solutions.com',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Volcano-Solutions, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
