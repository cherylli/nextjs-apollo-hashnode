import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import apolloClient from '../lib/apollo-client';
import {gql} from '@apollo/client';

export default function Home({posts, username}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hashnode API Demo</title>
        <meta name="description" content="Hashnode API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          My Hashnode Blog
        </h1>

        <p className={styles.description}>
          displaying my hashnode blog posts using the Hashnode API (graphql)
        </p>

        <div className={styles.grid}>
          {posts.map(post => (
          <a key={post.slug}
             target="_blank"
             rel="noopener noreferrer"
             href={`https://${username}.hashnode.dev/${post.slug}`}
             className={styles.card}>
            <h2>{post.title}</h2>
            <p>{post.brief}</p>
          </a>
          ))}
        </div>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps(){
  const { data } = await apolloClient.query({
    query: gql`
      query Posts {
        user(username: "cherylm") {
          username
          publication{
            posts(page:0){
              slug
              title
              brief
            }
          }
        }
      }
    `
  });
    return {
        props: {
          posts: data.user.publication.posts,
          username: data.user.username
        }
    }
}