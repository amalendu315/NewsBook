import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const updateNews = async () => {
    props.setProgress(25);
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f0fe2270076b49f9bd49fe0df59d5dc1&country=${props.country}&category=${props.category}&pageSize=${props.pageSize}&page=${page}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsBook`;
    updateNews();
    //eslint-disable-next-line
  }, [])

  const fetchData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f0fe2270076b49f9bd49fe0df59d5dc1&country=${props.country}&category=${props.category}&pageSize=${props.pageSize}&page=${page + 1}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
    setLoading(false);
  };
  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0", marginTop: "90px" }}>NewsBook - Top {capitalizeFirstLetter(props.category)} Headlines </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}>
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={
                      element.description ? element.description : element.content
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>

  );

}

News.defaultProps = {
  country: "in",
  pageSize: 7,
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  page: PropTypes.number,
  category: PropTypes.string,
}

export default News;
