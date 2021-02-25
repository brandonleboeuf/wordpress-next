import Head from 'next/head'
import Link from 'next/link'
import { gql } from '@apollo/client'

import { client } from '../lib/apollo'
import styles from '../styles/Home.module.css'

export default function Home({ posts, title, content }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>WordPress blog </title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          id="admin-bar-css"
          href="http://54.218.121.170/wp-includes/css/admin-bar.min.css?ver=5.6.2"
          media="all"
        />
        <link
          rel="stylesheet"
          id="wp-block-library-css"
          href="http://54.218.121.170/wp-includes/css/dist/block-library/style.min.css?ver=5.6.2"
          media="all"
        />
        <link
          rel="stylesheet"
          id="wp-block-library-theme-css"
          href="http://54.218.121.170/wp-includes/css/dist/block-library/theme.min.css?ver=5.6.2"
          media="all"
        />
        <link
          rel="stylesheet"
          id="twenty-twenty-one-style-css"
          href="http://54.218.121.170/wp-content/themes/twentytwentyone/style.css?ver=1.0"
          media="all"
        />
        <link
          rel="stylesheet"
          id="twenty-twenty-one-print-style-css"
          href="http://54.218.121.170/wp-content/themes/twentytwentyone/assets/css/print.css?ver=1.0"
          media="print"
        />
      </Head>

      <main className={styles.main}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <ul>
          {posts.map(({ title, slug, date }) => (
            <li key={slug} style={{ marginBottom: '10px' }}>
              <Link href={`/blog/${slug}`}>
                <a>
                  {date} | {title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const result = await client.query({
    query: gql`
      query GetWordPressHomePageAndPosts {
        pageBy(uri: "/") {
          title
          content
        }

        posts {
          nodes {
            title
            content
            date
            slug
          }
        }
      }
    `,
  })
  console.log(result)

  return {
    props: {
      posts: result.data.posts.nodes,
      title: result.data.pageBy.title,
      content: result.data.pageBy.content,
    },
  }
}
