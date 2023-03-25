import Head from "next/head";
import { useRouter } from "next/router";

import styles from "@/styles/Feed.module.css";

import { Toolbar } from "@/components/toolbar";

const Feed = ({ articles, pageNumber }) => {
  const router = useRouter();
  return articles.length ? (
    <>
      <Head>
        <title>Feed</title>
      </Head>
      <div className="page-container">
        <Toolbar />

        <div className={styles.main}>
          {articles.map((article, index) => (
            <div key={index} className={styles.post}>
              <h1 onClick={() => (window.location.href = article.url)}>
                {article.title}
              </h1>
              <p>{article.description}</p>
              {!!article.urlToImage && <img src={article.urlToImage} />}
            </div>
          ))}
        </div>

        <div className={styles.paginator}>
          <div
            className={pageNumber === 1 ? styles.disabled : styles.active}
            onClick={() => {
              if (pageNumber > 1) {
                router
                  .push(`/feed/${pageNumber - 1}`)
                  .then(() => window.scrollTo(0, 0));
              }
            }}
          >
            Previous Page
          </div>

          <div>#{pageNumber}</div>

          <div
            className={pageNumber === 5 ? styles.disabled : styles.active}
            onClick={() => {
              if (pageNumber < 5) {
                router
                  .push(`/feed/${pageNumber + 1}`)
                  .then(() => window.scrollTo(0, 0));
              }
            }}
          >
            Next Page
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1>Sorry, no articles for this page</h1>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.id;

  if (!pageNumber || pageNumber < 1 || pageNumber > 10) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const apiResponse = await fetch(
    `https://newsapi.org/v2/everything?qInTitle="Star Wars"&language=en&pageSize=10&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  ).then((res) => res.json());

  const { articles } = apiResponse;

  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};

export default Feed;
