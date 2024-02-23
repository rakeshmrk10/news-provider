import {useEffect, useState} from 'react';
import axios from 'axios';

function ScrollContainer(props) {
  const {activeCategory} = props;
  const {sort} = props;
  const {searchText} = props;
  const {period} = props;
  const {resetDate} = props;
  const {reload} = props;
  const [news, setNews] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const scrollBar = document.querySelector('.scrollContainer');
  useEffect(()=> {
    getNewsEverything();
    console.log('category---->', activeCategory, 'from scrollcont');
    console.log('search text--->', searchText);
    console.log('sort type---->', sort);
    console.log('period---->', period);
    setNews([]);
    setPageNum(1);
    if (news.length!=0) {
      scrollBar.scrollTo({top: 0});
    }
    resetDate();
  }, [activeCategory, searchText]);

  useEffect(()=>{
    console.log('category---->', activeCategory, 'from scrollcont');
    console.log('search text--->', searchText);
    console.log('sort type---->', sort);
    console.log('period---->', period);
    getNewsEverything();
    setNews([]);
    setPageNum(1);
    if (news.length!=0) {
      scrollBar.scrollTo({top: 0});
    }
  }, [reload, sort]);

  useEffect(()=>{
    getNewsEverything();
  }, [pageNum]);


  function getNewsEverything() {
    let url;
    if (activeCategory==='Search') url='https://newsapi.org/v2/everything?q='+searchText+'&pageSize=20&language=en&page='+pageNum+'&'+period+'&sortBy='+sort+'&apiKey=0c5d0578baa0460e983522b54858ed9c';
    else if (activeCategory==='All') url='https://newsapi.org/v2/everything?q=keyword&pageSize=20&language=en&page='+pageNum+'&'+period+'&sortBy='+sort+'&apiKey=0c5d0578baa0460e983522b54858ed9c';
    else url='https://newsapi.org/v2/top-headlines?category='+activeCategory+'&pageSize=20&language=en&page='+pageNum+'&'+period+'&sortBy='+sort+'&apiKey=0c5d0578baa0460e983522b54858ed9c';
    console.log('url---->', url);
    axios({
      url: url,
      method: 'GET',
    })
        .then((res) => {
          const tempNewsStorage=res.data.articles;
          console.log(res.data.articles);
          if (pageNum===1) setNews(tempNewsStorage);
          else {
            setNews((prev)=> [...prev, ...tempNewsStorage]);
          }
          console.log('news--> ', news);
          console.log('page num----->', pageNum);
          console.log('num of news--->', news.length);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function handleNewsClick(clickedUrl) {
    console.log('clicked ----->', clickedUrl);
    window.open(clickedUrl, '_blank');
  }

  function nextPage() {
    setPageNum(pageNum+1);
    console.log(pageNum);
  }

  const handleScroll = (e) => {
    console.log(e.target.clientHeight);
    console.log(e.target.scrollHeight - e.target.scrollTop);
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if ( e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight || e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight+1) {
      nextPage();
      console.log('----load here----');
    }
  };

  function handleScrollToTop() {
    scrollBar.scrollTo({top: 0});
  }

  return (
    <>
      <div className="scrollToTop" >
        <p onClick={handleScrollToTop}>Scroll to Top</p>
      </div>
      <div className="scrollContainer" onScroll={handleScroll}>
        {news.length===0 ? <div className="newsCardNull">NO CONTENT TO DISPLAY</div>:''}
        {news.map((i, index)=>
          <div className="newsCard">
            <div key={index} onClick={()=>handleNewsClick(i.url)}>
              <div className="title" >{i.title}</div>
              <div className="newsBody">
                <div className="description">{i.description}</div>
                <div className="image">
                  <img src={i.urlToImage} width='200'></img>
                </div>
              </div>
              <div className="releaseDetails">
                <div className="author">
                  <h3>Published by: &nbsp;</h3> <p>{i.author}</p></div>
                <div className="publish">
                  <h3>Published on: &nbsp;</h3> <p>{i.publishedAt}</p>
                </div>
              </div>
              <br>
              </br>
            </div>
            <div className="url">
              <a href={i.url} target="_blank" rel="noreferrer">{i.url}</a>
            </div>
          </div>,
        )}
      </div>
    </>
  );
}

export default ScrollContainer;
