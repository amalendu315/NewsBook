import React, { Component } from "react";
// import PropTypes from "prop-types";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: "90%", zIndex: "1" }}>{source}</span>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://c.ndtvimg.com/2021-08/l21stpq8_radhye-shyam_625x300_30_August_21.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-danger">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-info"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
