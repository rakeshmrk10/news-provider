import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import All from './Pages/ScrollContainer';
import search from './assets/search.png';
import ScrollContainer from './Pages/ScrollContainer';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function App() {
  const category = ['All', 'Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState('publishedAt');
  const [tempText, setTempText] = useState('');
  const [toDate, setToDate] = useState(new Date());
  const [period, setPeriod] = useState('');
  const [fromDate, setFromDate] = useState();
  const [today, setToday] = useState(new Date());
  const [reload, setReload] = useState(false);
  const [planMaxDate, setPlanMaxDate] = useState('');


  function handleDateCalc(date) {
    const tempdate=date.getFullYear().toString()+'-' + (date.getMonth()+1).toString()+'-'+date.getDate().toString();
    return tempdate;
  }

  function resetDate() {
    setFromDate();
    setToDate(new Date());
  }

  useEffect(()=>{
    fetch("https://google.com",{}).then(()=>{
      console.log("successfuly connected!")
    }
    ).catch((e)=>{
      console.log(e);
    })
    setPlanMaxDate(today.getMonth().toString()+'/'+today.getDate().toString() +'/'+today.getFullYear().toString());
    console.log('planMax--->', planMaxDate);
    document.title = 'News - One';
    setSort('publishedAt');
    const periodQuery = 'to='+handleDateCalc(today);
    setPeriod(periodQuery);
    console.log(period);
  }, [activeCategory, searchText]);

  function handleCategoryClick(i) {
    console.log(i, 'is clicked!');
    setActiveCategory(i);
    setTempText('');
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log('submitted----->', searchText);
    setActiveCategory('Search');
    setSearchText(tempText);
  }

  function handleTextChangeEvent(e) {
    setTempText(e.target.value);
    console.log('changing------>', searchText);
  }

  function handleSortClick(sortType) {
    setSort(sortType);
    console.log('sortBY', sortType);
  }

  function handleReload() {
    if (fromDate===undefined) {
      alert('Select From Date to proceed!');
    } else {
      const periodQuery = 'from='+handleDateCalc(fromDate)+'&to='+handleDateCalc(toDate);
      setPeriod(periodQuery);
      console.log(period);
      setReload(!reload);
    }
  }

  return (
    <div className='newsProvider'>
      <div className='topContainer'>
        <div className='col1'>
          <div className='heading'>
            <h1>Newserfewjfhewhfuerhurfiuh</h1>
            <h1 className='oneText'>One</h1>
          </div>
        </div>
        <div className='col2'>
          <img src={search}></img>
          <form className='searchForm' onSubmit={(e)=>submitHandler(e)}>
            <input type="text" name='search' className='search' placeholder='search for topics, location & sources' onChange={(e)=>handleTextChangeEvent(e)} value={tempText}>
            </input>
          </form>
        </div>
        <div className='col3'></div>
      </div>
      <div className='middleContainer'>
        {category.map((i, index)=><div className={activeCategory===i?'activeCategory':'category'} onClick={()=>handleCategoryClick(i)}>
          <p>{i}</p>
        </div>)}
      </div>
      {activeCategory==='Search' ?
      <div className='searchResult'>
        <h4>Search Results for  </h4>
        "
        <p>{searchText}</p>
        "
      </div>:<div className='searchResult'><h4></h4><p></p></div>}
      <div className='sortBy'>
        <div className='sortTitle'><p>Sort by: </p></div>
        <div className={sort==='publishedAt'?'sortTag' : 'sortTagInactive'} onClick={()=>handleSortClick('publishedAt')}><p>Publish At</p></div>
        {activeCategory==='Search'?<div className={sort==='relevancy'?'sortTag' : 'sortTagInactive'} onClick={()=>handleSortClick('relevancy')}><p>Relevancy</p></div>:null}
        <div className={sort==='popularity'?'sortTag' : 'sortTagInactive'} onClick={()=>handleSortClick('popularity')}><p>Popularity</p></div>
        <div className='dateTab'>
          <label>From: </label>
          <ReactDatePicker minDate={planMaxDate} maxDate={toDate} className='dateIndividual' selected={fromDate} onChange={(date) => setFromDate(date)} />
          <label>To: </label>
          <ReactDatePicker minDate={fromDate} className='dateIndividual' selected={toDate} onChange={(date) => setToDate(date)} />
          <div className='reload' onClick={handleReload}><p>Reload</p></div>
        </div>
      </div>
      <ScrollContainer activeCategory={activeCategory} searchText={searchText} sort={sort} period={period} resetDate={resetDate} reload={reload}/>
    </div>
  );
}

export default App;
