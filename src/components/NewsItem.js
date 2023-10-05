import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title, description, imageurl, newsUrl, author, date, source} = this.props;
    let z = new Date(date).toGMTString();
    // let s = source[0];
    // console.log(source)
    // const cardStyle = {
    //     width: '18rem'
    //   };
    return (
      <div>
            <div className="card my-3" style={{border: "2px solid black", height:"600px" }}>
              <div style={{display: "flex", justifyContent: "flex-end", position: "absolute", right: "0"}}>
     <span class="badge rounded-pill bg-danger"  > {source} </span>
     </div>
            <img src={!imageurl?"https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_640.jpg":imageurl} style={{height:"300px"}}   className="card-img-top" alt="..."/>
            <div className="card-body my-3">
                <h5 className="card-title">{title}...</h5>
                <span class="badge bg-secondary">{source}</span>
                <p className="card-text">{description}...</p>
                <p class="card-text"><small class="text-body-secondary">by {!author? "Unknown" :author} on {z} </small></p>
                <a rel="noreferrer" href= {newsUrl} target="_blank"   className="btn btn-dark">Read more</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
// style={{ position: 'absolute',bottom: '10px',left: '10', }}
// height:"470px"