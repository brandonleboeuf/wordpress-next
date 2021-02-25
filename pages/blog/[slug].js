import { gql } from '@apollo/client'
import Link from 'next/link'

import { client } from '../../lib/apollo'

import styles from '../../styles/Home.module.css'

export default function Blog({ post }) {
  return (
    <main className={styles.main}>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <Link href="/">
        <a>&larr; Back to Home</a>
      </Link>
    </main>
  )
}

export async function getStaticPaths() {
  const result = await client.query({
    query: gql`
      query GetWordPressPosts {
        posts {
          nodes {
            slug
          }
        }
      }
    `,
  })

  return {
    paths: result.data.posts.nodes.map(({ slug }) => {
      return {
        params: { slug },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const result = await client.query({
    query: gql`
      query GetWordPressPostsBySlut($slug: String!) {
        postBy(slug: $slug) {
          title
          content
        }
      }
    `,
    variables: { slug },
  })
  return {
    props: {
      post: result.data.postBy,
    },
  }
}
