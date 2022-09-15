import { useState, useEffect, useContext, } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import { ItemsContext } from '../data/ItemsContext';
import moment from 'moment';
import 'moment/locale/ko';

function Date(props) {
    const navigate = useNavigate();
    const dataContext = useContext(ItemsContext);
    const items = dataContext.itemsDate;
    const info = dataContext.infoDate;
    const indexToday = dataContext.indexToday;
    console.log(indexToday)

    const calendarDays = ['일', '월', '화', '수', '목', '금', '토'];
    const todayYYYYMMDD = moment().format('l');
    const todayYear = [moment().format('YY'), moment().format('YYYY'),];
    const todayMonth = moment().format('M');
    const todayDate = moment().format('D');
    const todayDay = moment().format('dd');

    function arraySetting(n) {
        let diagArr = [];
        for (let i = 0; i < n; i++) {
            let settingArr = Array.from({ length: n });
            settingArr[i] = 'select';
            diagArr.push(settingArr)
        }
        return diagArr
    }

    // const arrTab = Array.from({ length: info.length });
    const diagArrTab = arraySetting(info.length);

    const pageNumbers = [];
    for (let i = 0; i < info.length; i++) {
        let length = items[i]?.length;
        if (length % 10 === 0) {
            length = length - 1;
        }
        let pageNumber = 1 + (length - length % 10) / 10;

        pageNumbers.push(pageNumber)
    }

    console.log(pageNumbers)
    const arrsPage = [];
    for (let i = 0; i < info.length; i++) {
        arrsPage.push(Array.from({ length: pageNumbers[i] }))
    }

    let [pageBtns, setPageBtns] = useState(arrsPage);

    const diagArrsPage = [];
    for (let i = 0; i < info.length; i++) {
        diagArrsPage.push(arraySetting(pageNumbers[i]))
    }
    // console.log(info);
    const [pageSelect, setPageSelect] = useState(diagArrsPage[0][0]);
    console.log(pageSelect)

    useEffect(() => {
        props.setTabSelect(diagArrTab[indexToday]);
        // setPageSelect(['select',])
    }, [])

    let [dateTitle, setDateTitle] = useState([todayMonth, todayDate, todayDay, todayYYYYMMDD]);
    let [index, setIndex] = useState(indexToday);


    return (
        <div className="body">
            <div className={`page-title flex-align`}>
                <h2>
                    <i className={`bx bxs-calendar`}></i>
                    date. {todayYear[1]}. {todayMonth[0]}.
                </h2>
            </div>
            <div className="body">
                <div className="container-calendar">
                    <div className="frame-calendar flex-align">
                        {
                            calendarDays?.map((x, i) => {
                                return (
                                    <button key={i} className='calendar-cell day'>{x}</button>
                                )
                            })
                        }
                    </div>
                    <div className="frame-calendar" style={{ borderTop: 'none' }}>
                        {
                            info.map((x, i) => {
                                let temp;
                                if (x.filter < todayYYYYMMDD) {
                                    temp = 'past'
                                }
                                else if (x.filter === todayYYYYMMDD) {
                                    temp = 'present'
                                }
                                return (
                                    <button className={`calendar-cell date ${temp} ${props.tabSelect[i]}`} onClick={(e) => {
                                        props.setTabSelect(diagArrTab[i]);
                                        setPageBtns(arrsPage);
                                        setPageSelect(diagArrsPage[0][0]);
                                        setDateTitle([x.label[0], x.label[1], x.day, x.filter]);
                                        setIndex(i);
                                        navigate(`/date/${i}/page=1`)
                                    }} >
                                        <div className='num-date'><span>{x.label[1]}</span></div>
                                        <div><span className='num-item'>{items[i]?.length !== 0 && items[i]?.length}</span></div>
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="container-dateTitle ">
                    <div className="dateTitle flex-align">
                        <i className='bx bxs-quote-alt-left'></i>
                        <div className="date-sentence">
                            <p>
                                <span className='text-date'>{dateTitle[0]}월 {dateTitle[1]}일({dateTitle[2]})</span>
                                {dateTitle[3] === todayYYYYMMDD ? <span >오늘</span> : <span> {moment(dateTitle[3].replace(/\./g, ''), "YYYYMMDD").fromNow()}</span>}
                            </p>
                            <p>
                                <span>경매물건은 </span>
                                {items[index]?.length === 0 ? <span>없습니다</span> : <><span className='num-item-date'>{items[index]?.length}</span><span>개 입니다</span></>}
                            </p>
                        </div>
                    </div>
                </div>
                {
                    info.map((x, i) => {
                        return (
                            <div className={`container-pageBtns ${props.tabSelect[i]} flex-align`} key={i} style={{ paddingBottom: 0 }}>
                                <div className="container-numBtns " >
                                    {
                                        (pageBtns[0].length === 0) ?
                                            (<div className="btnRefresh" onClick={() => {
                                                navigate(`/date/${i}/page=1`);
                                            }} >
                                                <i className='bx bx-refresh'></i><span>물건 새로고침</span>
                                            </div>) :
                                            (
                                                <div className="frame-numBtns flex-align">
                                                    {
                                                        pageBtns[i]?.map((y, j) => {
                                                            if (items[index]?.length === 0) {
                                                                return null
                                                            }
                                                            else {
                                                                return (
                                                                    <button className={`numBtn-date ${pageSelect[j]}`} key={j + 1} onClick={(e) => {
                                                                        setPageSelect(diagArrsPage[i][j]);
                                                                        navigate(`/date/${i}/page=${j + 1}`);
                                                                        // numBtnSelect(e.target);
                                                                    }}>{j + 1}</button>
                                                                )
                                                            }

                                                        })
                                                    }
                                                </div>
                                            )
                                    }
                                </div>
                                {pageBtns[i].length > 4 ? (<i className='bx bx-transfer-alt'></i>) : null}
                            </div>
                        )
                    })
                }
                <Outlet></Outlet>
            </div >
        </div>

    )
}

export default Date