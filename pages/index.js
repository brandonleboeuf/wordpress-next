import Link from 'next/link'
import { gql } from '@apollo/client'

import { client } from '../lib/apollo'
import styles from '../styles/Home.module.css'

export default function Home({ posts, title, content }) {
  return (
    <div className={styles.container}>
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
