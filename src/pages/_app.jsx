/* eslint-disable no-restricted-syntax */
import Head from 'next/head'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'

import 'focus-visible'
import '@/styles/tailwind.css'

function getNodeText(node) {
  let text = ''
  for (const child of node.children ?? []) {
    if (typeof child === 'string') {
      text += child
    }
    text += getNodeText(child)
  }
  return text
}

function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  const sections = []

  for (const node of nodes) {
    if (node.name === 'h2' || node.name === 'h3') {
      const title = getNodeText(node)
      if (title) {
        const id = slugify(title)
        node.attributes.id = id
        if (node.name === 'h3') {
          if (!sections[sections.length - 1]) {
            throw new Error(
              'Cannot add `h3` to table of contents without a preceding `h2`'
            )
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}

export default function App({ Component, pageProps }) {
  const title = pageProps.markdoc?.frontmatter.title

  const pageTitle =
    pageProps.markdoc?.frontmatter.pageTitle ||
    `${pageProps.markdoc?.frontmatter.title} - Docs`

  const description = pageProps.markdoc?.frontmatter.description

  const tableOfContents = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : []

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.css"
        />
        <script
          type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/@algolia/algoliasearch-netlify-frontend@1/dist/algoliasearchNetlify.js"
        ></script>
        <script type="text/javascript">
          {`algoliasearchNetlify({
    appId: '5LLAQUQ7EW',
    apiKey: 'd183a709f283e8984b78b4e7ddabea26',
    siteId: 'bfc1dbf9-5911-435c-a374-02eb19f98c6d',
    branch: 'master',
    selector: 'div#search',
    openOnFocus: true,
  });`}
        </script>
      </Head>
      <Layout title={title} tableOfContents={tableOfContents}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
