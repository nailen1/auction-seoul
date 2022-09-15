import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ItemsContext } from './data/ItemsContext';

import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';
import Header from './data/Header';
import ToTop from './data/ToTop';
import Footer from './data/Footer';
import Sidemenu from './data/Sidemenu';

import Home from './pages/Home'
import Maps from './pages/Maps';
import Miss from './pages/Miss';
import LocationSeoul from './pages/LocationSeoul';
import Price from './pages/Price';
import Date from './pages/Date';
import Detail from './pages/Detail';
import DevLab from './pages/DevLab';
import MyPage from './pages/MyPage';

// const DB_SEOUL_URL = 'https://1noon-auction-bucket.s3.ap-northeast-2.amazonaws.com/data-from-court/1noon-items-seoul-raw.json';
const DB_SEOUL_URL = 'https://1noon-auction-bucket.s3.ap-northeast-2.amazonaws.com/data-from-court/1noon-auction-seoul-itemsUniq.json';


function App() {
  console.log('App.js rendered')

  // FETCH ITEMS
  const [items, setItems] = useState(null);
  const fetchData = async () => {
    const response = await axios.get(DB_SEOUL_URL);
    const itemsRaw = response.data;
    let itemsUniq = itemsRaw.filter(function (x, i) {
      return itemsRaw.findIndex(y => x.text[0] === y.text[0]) === i
    });
    // console.log(itemsUniq);
    const dayRecent = moment().subtract(13, 'days').format('l');
    // console.log(dayRecent)
    const itemsRecent = itemsUniq.filter(x => x.date[0] > dayRecent);
    // console.log(itemsRecent)
    let itemsMain = itemsRecent.filter(x => x.title[1] === 1);
    // console.log(itemsMain)
    let itemsSub = itemsRecent.filter(x => x.title[1] !== 1);
    // console.log(itemsSub)
    // let itemsRecent = [];
    // for (let i = 0; i < itemsUniq.length; i++) {
    //   if (itemsUniq[i].date[0] > dayRecent) {
    //     itemsRecent.push(itemsUniq[i])
    //   }
    // }
    // console.log(itemsRecent);
    setItems(itemsMain.reverse());
  };
  useEffect(() => {
    fetchData();
  }, [])
  // console.log(items)
  // SET ITEMS for MISS PAGE 
  // (info > items > slect)

  const infoMiss = [
    { label: '신건', filter: 'new' },
    { label: '유찰', filter: 'miss' },
    { label: '전체', filter: 'total' },
  ];

  const itemsMiss = [
    items?.filter(x => (x.miss[0] === "신건")),
    items?.filter(x => (x.miss[0] !== "신건")),
    items
  ];

  const [missSelect, setMissSelect] = useState(Array.from({ length: infoMiss.length }));

  // SET ITEMS LOCATION.SEOUL
  // (info > items > slect > ...)

  const infoSeoul = [
    { court: ['서울중앙지법', '중앙', 'center', '#06D6A0'], state: ['강남구', '서초구', '종로구', '중구', '동작구', '관악구'] },
    { court: ['서울동부지법', '동부', 'east', '#6A4C93'], state: ['송파구', '강동구', '성동구', '광진구'] },
    { court: ['서울서부지법', '서부', 'west', '#FFD166'], state: ['용산구', '마포구', '서대문구', '은평구'] },
    { court: ['서울남부지법', '남부', 'south', '#F79824'], state: ['영등포구', '양천구', '강서구', '구로구', '금천구'] },
    { court: ['서울북부지법', '북부', 'north', '#118AB2'], state: ['강북구', '노원구', '성북구', '중랑구', '동대문구'] },
  ];

  const itemsLocation = [
    items?.filter(x => (x.court[0] === infoSeoul[0].court[0])),
    items?.filter(x => (x.court[0] === infoSeoul[1].court[0])),
    items?.filter(x => (x.court[0] === infoSeoul[2].court[0])),
    items?.filter(x => (x.court[0] === infoSeoul[3].court[0])),
    items?.filter(x => (x.court[0] === infoSeoul[4].court[0]))
  ]
  const [locationSelect, setLocationSelect] = useState(Array.from({ length: infoSeoul.length }));
  const [hideItems, setHideItems] = useState(false);

  // SET ITEMS PRICE
  const infoPrice = [
    { label: '~ 1천만원', range: [0, 0.1e8] },
    { label: '~ 5천만원', range: [0.1e8, 0.5e8] },
    { label: '~ 1억원', range: [0.5e8, 1e8] },
    { label: '~ 5억원', range: [1e8, 5e8] },
    { label: '~ 10억원', range: [5e8, 10e8] },
    { label: '~ 20억원', range: [10e8, 20e8] },
    { label: '~ 50억원', range: [20e8, 50e8] },
    { label: '~ 100억원', range: [50e8, 100e8] },
    { label: '100억원 이상', range: [100e8, Infinity] },
  ]

  const funcItemsPrice = () => {
    let bucket = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];

    items?.forEach(function (x) {
      let price = x.price[0];
      if (price > infoPrice[0].range[0] && price <= infoPrice[0].range[1]) {
        bucket[0].push(x);
      }
      else if (price > infoPrice[1].range[0] && price <= infoPrice[1].range[1]) {
        bucket[1].push(x);
      }
      else if (price > infoPrice[2].range[0] && price <= infoPrice[2].range[1]) {
        bucket[2].push(x);
      }
      else if (price > infoPrice[3].range[0] && price <= infoPrice[3].range[1]) {
        bucket[3].push(x);
      }
      else if (price > infoPrice[4].range[0] && price <= infoPrice[4].range[1]) {
        bucket[4].push(x);
      }
      else if (price > infoPrice[5].range[0] && price <= infoPrice[5].range[1]) {
        bucket[5].push(x);
      }
      else if (price > infoPrice[6].range[0] && price <= infoPrice[6].range[1]) {
        bucket[6].push(x);
      }
      else if (price > infoPrice[7].range[0] && price <= infoPrice[7].range[1]) {
        bucket[7].push(x);
      }
      else {
        bucket[8].push(x);
      }
    })
    return bucket
  }

  const itemsPrice = funcItemsPrice();

  const [priceSelect, setPriceSelect] = useState(Array.from({ length: infoPrice.length }));

  //SET DATE SELECT 

  const todayDay = moment().format('dd');
  let funcIndexToday = (x) => {
    let index;
    switch (x) {
      case '일':
        index = 7;
        break;
      case '월':
        index = 8;
        break;
      case '화':
        index = 9;
        break;
      case '수':
        index = 10;
        break;
      case '목':
        index = 11;
        break;
      case '금':
        index = 12;
        break;
      case '토':
        index = 13;
        break;
      default:
        break;
    }
    return index;
  };

  const indexToday = funcIndexToday(todayDay);
  let funcInfoDate = function (x) {
    console.log('calendar fuction activate')
    let infoBucket = [];
    for (let i = 0; i < 28; i++) {
      let day = moment().add(i - x, 'days');
      infoBucket.push({ filter: day.format('l'), label: [day.format('M'), day.format('D')], day: day.format('dd') });
    }
    return infoBucket;
  }

  const infoDate = funcInfoDate(indexToday);
  // console.log(infoDate);

  let itemsDate = [];
  for (let i = 0; i < 28; i++) {
    itemsDate.push(items?.filter(x => x.date[0] === infoDate[i].filter));
  };
  // '28' simplified from infoDate.length
  const [dateSelect, setDateSelect] = useState(Array.from({ length: 28 }));

  // SET FOOTER 
  const [itemsFooter, setItemsFooter] = useState(JSON.parse(localStorage.getItem('watched-detail')));

  //SET ITEM DETAIL
  const [itemDetail, setItemDetail] = useState();

  // SET SIDEMENU

  return (
    <ItemsContext.Provider
      value={{
        itemsMiss, infoMiss,
        itemsLocation, infoSeoul,
        itemsPrice, infoPrice,
        itemsDate, infoDate, indexToday,
        itemsFooter, setItemsFooter,
        itemDetail, setItemDetail
      }}>
      <div className={`App `}>
        <Header
          setMissSelect={setMissSelect}
          setLocationSelect={setLocationSelect}
          setPriceSelect={setPriceSelect}
          setDateSelect={setDateSelect}
          indexToday={indexToday}
        />
        <Routes>
          {/* ITEMS PAGE */}
          <Route path='/' element={<Home />} />
          <Route path={`/:itemCase`} element={<Detail item={itemDetail} setItem={setItemDetail} />} />
          {/* ITEMS MISS */}
          <Route path='/items' element={<Miss tabSelect={missSelect} setTabSelect={setMissSelect} />}>
            <Route path={`:subject/page=:pageNum`} element={<Maps />} />
          </Route>
          {/* ITEMS LOCATION */}
          <Route path='/location' element={<LocationSeoul tabSelect={locationSelect} setTabSelect={setLocationSelect} hideItems={hideItems} setHideItems={setHideItems} />}>
            <Route path={`:subject/page=:pageNum`} element={<Maps />} />
          </Route>

          <Route path='/price' element={<Price tabSelect={priceSelect} setTabSelect={setPriceSelect} />}>
            <Route path={`:subject/page=:pageNum`} element={<Maps />} />
          </Route>

          <Route path='/date' element={<Date tabSelect={dateSelect} setTabSelect={setDateSelect} />}>
            <Route path={`:subject/page=:pageNum`} element={<Maps />} />
          </Route>

          <Route path='/my%20page' element={
            <MyPage />
          } />
          <Route path='/dev%20lab' element={<DevLab />} />
        </Routes>
        <Footer setItemsFooter={setItemsFooter} />
        <ToTop />
        <Sidemenu />
      </div>
    </ItemsContext.Provider>
  );
}
export default App;
