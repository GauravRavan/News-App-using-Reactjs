import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { Spinner } from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = 
  {
    country: 'us',
    pageSize: 3,
    category: 'general',
   
  }
  static PropsTypes = {
     country: PropTypes.string,
     pageSize:PropTypes.number,
     category: PropTypes.string,
  }
capLat = (string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props){
    super(props)
    // console.log("hello i a, a constructor from news compo")
    this.state = {
      articles : [],
      loading: false,
      page:1,
      totalResults:0
   

    }
    document.title =`${this.capLat(this.props.category)} - NewsApp`;
  }
  async updateNews(){
    this.props.setProgress(0)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=yourapikey&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({
      loading:true,
    })
    let  data =  await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json()
    //console.log(parsedData);
    this.props.setProgress(60)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      totalPages: Math.ceil(parsedData.totalResults / this.props.pageSize),
      loading:false
      
    })
    this.props.setProgress(100)
  }
  async componentDidMount(){
  
  this.setState({ loading: true }, () => {
    // Load news data
    this.updateNews();
    this.setState({loading : false});
  });
  // })
  this.updateNews();
   }
   handleNextClick = async()=>{
  //   if(this.state.page + 1>Math.ceil(this.state.totalResults/this.props.pageSize)){
      
  //   }
  //   else{
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=yourapikey&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   this.setState({
  //     loading:true
  //   })
  //   let  data =  await fetch(url);
  //   let parsedData = await data.json()
    
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading:false  
  //   })
  // }
  //console.log(this.state.page)
  //console.log("this.state.page")

  this.setState({ page: this.state.page + 1},
    async () => {
      // After updating the state, fetch new data
      await this.updateNews();
    });
  

  }
   handlePrevClick = async()=>{
    
    this.setState({
      page: this.state.page -1,
    }, async () =>{await this.updateNews();});
    
    
}

handlePages = async(event)=>{
  event.preventDefault();
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=yourapikey&page=${this.state.totalPages}&pageSize=${this.props.pageSize}`;
  
  let  data =  await fetch(url);
  let parsedData = await data.json()
 // console.log(parsedData);

  this.setState({
    page: this.state.totalPages,
    articles: parsedData.articles,
    loading:false
    
  })
}
handlePage1 = async(event)=>{
  event.preventDefault();
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=yourapikey&page=1&pageSize=${this.props.pageSize}`;
  this.setState({
    loading:true
  })
  let  data =  await fetch(url);
  let parsedData = await data.json()
  //console.log(parsedData);

  this.setState({
    page: 1,
    articles: parsedData.articles,
    loading:false
    
  })
}
fetchMoreData = async() => {
  
  // this.setState({
  //   page: this.state.page+1
  // })
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=yourapikey&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //this.setState({loading:false})
    this.setState({
      page: this.state.page+1
    })
    let  data =  await fetch(url);
    let parsedData = await data.json()
   // console.log(parsedData);

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      totalPages: Math.ceil(parsedData.totalResults / this.props.pageSize),
      loading:false
    })

    
};




  render() {
    return (
      <>
        
        <h1 className='text-center' style={{margin:"0px 55px", marginTop:"77px"}}>NewsApp  {this.props.category === "general" ?"" :" - " + this.capLat(this.props.category)}</h1>
       {this.state.loading && <Spinner/>} 
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>
        <div className='row my-4'>
      { this.state.articles.map((element, index)=>{
           return <div className='col-md-4' key={index}>
           <NewsItem  title={element.title? element.title.slice(0,45):""} description ={element.description?element.description.slice(0,88):""} 
           imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date ={element.publishedAt} source ={element.source.name}></NewsItem>
           </div>
        })}
        </div>
        </div>
      </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
        <button  disabled= {this.state.page === 1}  type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr;</button>
        </div> */}
  {/* <div>
                    <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center my-3">
                <li className="page-item">
                  <a className="page-link" style={{cursor : "pointer"}}  disabled= {this.state.page === 1 } onClick={this.handlePrevClick} >&larr; Previous</a>
                  <button type="button" className="btn btn-light" style={{
                  cursor: this.state.page === 1 ? "not-allowed" : "pointer"}}  disabled= {this.state.page === 1 } onClick={this.handlePrevClick}> &larr; Previous</button>
                </li>
                {this.state.totalPages>2 &&
                (<li className="page-item">
                  <a className="page-link" style={{cursor:"pointer"}}  onClick={this.handlePage1} >1</a></li>
                )}
                {this.state.totalPages>2 &&
                (<li className="page-item"><a  className="page-link" style={{cursor:"pointer"}}  onClick={this.handlePages} >{this.state.totalPages}</a></li>
                )}<li className="page-item">
                  <a className="page-link" style={{cursor : "pointer"}} onClick={this.handleNextClick} >Next &rarr;</a>
                  <button disabled ={(this.state.page + 1>=Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-light" style={{cursor : "pointer"}}  onClick={this.handleNextClick} > Next &rarr;</button>
                </li>
              </ul>
            </nav>
        </div> */}

      
</>
    )
  }
}

export default News

