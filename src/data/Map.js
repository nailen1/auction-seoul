import { useState, useEffect, useContext, useMemo } from 'react'
import { ItemsContext } from './ItemsContext';
import $ from 'jquery'
import { useNavigate } from 'react-router-dom';
import logo from "../img/1noon-logo.svg";


// console.log(window.scrollY);

let Map = (props) => {

    // const [mapOn, setMapOn] = useState(false);

    console.log('map randered.')
    const navigate = useNavigate();
    const dataContext = useContext(ItemsContext);
    let itemsWatchedDetail = JSON.parse(localStorage.getItem('watched-detail'))?.slice(0, 10);
    const setItemsFooter = dataContext.setItemsFooter;
    const setItemDetail = dataContext.setItemDetail;

    // VARIABLES DECLARED
    const item = props.x;
    const courtName = item.court[0];
    const titleName = item.title[0];
    let kindName = item.kind;
    const kindNameShort = item.kind.slice(0, 5);
    const area = item.area[0];
    const areaShort = item.area[0].toFixed(1);
    const miss = item.miss[1];
    const percent = item.percent[1];
    const date = [item.date[0], item.date[1], item.date[2], item.date[3]];

    let [fillStar, setFillStar] = useState(false);

    let courtColor;
    switch (courtName) {
        default:
            break;
        case '서울중앙지법':
            courtColor = { background: "#06D6A0", color: "white" };
            break;
        case '서울동부지법':
            courtColor = { background: "#6A4C93", color: "white" };
            break;
        case '서울서부지법':
            courtColor = { background: "#FFD166", color: "white" };
            break;
        case '서울남부지법':
            courtColor = { background: "#F79824", color: "white" };
            break;
        case '서울북부지법':
            courtColor = { background: "#118AB2", color: "white" };
            break;
    }

    if (kindName === '다가구주택') { kindName = '다가구' }
    let kindIcon, kindColor;
    switch (kindName) {
        default:
            kindIcon = 'bx-home-smile';
            kindColor = '#118AB2';
            break;
        case '다세대':
        case '연립주택':
        case '다가구주택':
            kindIcon = 'bx-building-house';
            kindColor = '#97d8c4';
            break;
        case '단독':
            kindIcon = 'bx-home';
            kindColor = '#331e38';
            break;
        case '단독주택':
            kindIcon = 'bx-home';
            kindColor = '#331e38';
            break;
        case '아파트':
            kindIcon = 'bxs-business';
            kindColor = '#4059ad';
            break;
        case '토지':
        case '대지':
        case '임야':
            kindIcon = 'bx-landscape';
            kindColor = '#0ead69';
            break;
        case '상가':
        case '근린시설':
            kindIcon = 'bx-store';
            kindColor = '#f4b942';
            break;
        case '빌딩':
            kindIcon = 'bx-builings';
            kindColor = '#545e75';
            break;
        case '자동차':
            kindIcon = 'bxs-car';
            kindColor = '#118AB2';
            break;
    }

    let textsize;
    if (kindName.length > 3) {
        textsize = "0.5em"
    }

    let mix = props.x.mix;
    let mixIcon;
    switch (mix) {
        case '단일물건':
            mixIcon = 'bxs-circle';
            break;
        case '복합물건':
            mixIcon = 'bxs-error-circle';
            break;
        case '지분경매':
            mixIcon = 'bxs-circle-three-quarter';
            break;
        case '동산':
            mixIcon = 'bxs-cart';
            break;
        default:
            mixIcon = 'bxs-won';
            break;
    }

    let state = item.address[0];
    let district = item.address[1];
    let street = item.address[2];

    let districtShort = item.address[1].slice(0, 3);
    let locationColor;
    switch (state) {
        default:
            break;
        case '서울특별시':
            state = '서울시';
            locationColor = 'rgb(89, 179, 255)';
            break;
    }

    let estimate = item.estimate[1];
    let price = item.price[1];

    function priceUnit(x) {
        let unit;

        if (x >= 1 && x < 10000) {
            unit = '억';
        }
        else if (x >= 0.1 && x < 1) {
            x = x * 10;
            unit = '천만';
        }
        else if (x >= 0.01 && x < 0.1) {
            x = x * 100;
            unit = '백만';
        }
        return [x.toFixed(1), unit]
    }

    function addFavorite() {
        let itemsWatched = JSON.parse(localStorage.getItem('watched'));
        let itemFav = item.title[0];
        let itemFavDetail = item;
        console.log(itemsWatched);
        console.log(itemFav);

        if (itemsWatched === null) {
            localStorage.setItem('watched', JSON.stringify([itemFav]));
            localStorage.setItem('watched-detail', JSON.stringify([itemFavDetail]));
        }
        else {
            console.log(itemsWatched.includes(itemFav));
            if (!itemsWatched.includes(itemFav)) {
                itemsWatched.unshift(itemFav);
                itemsWatchedDetail.unshift(itemFavDetail);
                localStorage.setItem('watched', JSON.stringify(itemsWatched));
                localStorage.setItem('watched-detail', JSON.stringify(itemsWatchedDetail));
            }
        }
        console.log(itemsWatched);
        console.log(itemsWatchedDetail);
    }

    const { naver } = window;

    useEffect(() => {

        let address = state + ' ' + district + ' ' + street;
        naver.maps.Service.geocode({
            query: address
        }, function response(status, response) {
            // console.log(response);
            if (status !== naver.maps.Service.Status.OK) {
                return alert('Connection lost');
            }

            let xy = [response.v2.addresses[0].x, response.v2.addresses[0].y];
            // console.log(xy);
            let position = new naver.maps.LatLng(xy[1], xy[0]);

            var mapOptions = {
                center: position,
                zoom: 18,
                minZoom: 12, //지도의 최소 줌 레벨
                maxZoom: 19,
                zoomControl: true, //줌 컨트롤의 표시 여부
                zoomControlOptions: { //줌 컨트롤의 옵션
                    position: naver.maps.Position.TOP_RIGHT
                },
                zoomOrigin: position,
                disableDoubleClickZoom: true,
                scrollWheel: false,
                keyboardShortcuts: false,
                scaleControl: true,
                mapDataControl: false,
                mapTypeControl: true,
                mapTypeControlOptions: { //줌 컨트롤의 옵션
                    position: naver.maps.Position.TOP_RIGHT
                },
                draggable: false,
            };
            let map = new naver.maps.Map(titleName, mapOptions);
            map.setOptions("mapTypeControl", true); //지도 유형 컨트롤의 표시 여부

            $("#interaction").on("click", function (e) {
                e.preventDefault();

                if (map.getOptions("draggable")) {
                    map.setOptions({ //지도 인터랙션 끄기
                        draggable: false,
                        pinchZoom: false,
                        scrollWheel: false,
                        keyboardShortcuts: false,
                        disableDoubleTapZoom: true,
                        disableDoubleClickZoom: true,
                        disableTwoFingerTapZoom: true
                    });

                    $(this).removeClass("control-on");
                } else {
                    map.setOptions({ //지도 인터랙션 켜기
                        draggable: true,
                        pinchZoom: true,
                        scrollWheel: true,
                        keyboardShortcuts: true,
                        disableDoubleTapZoom: false,
                        disableDoubleClickZoom: false,
                        disableTwoFingerTapZoom: false
                    });

                    $(this).addClass("control-on");
                }
            });

            var marker = new naver.maps.Marker({
                position: position,
                map: map,
                icon: {
                    content: [
                        '<div class="marker-frame">',
                        '<div class="marker-bubble-frame">',
                        `<div class="marker-text" style="background: ${kindColor}">`,
                        `<span>${district + ' ' + kindName}</span>`,
                        '</div>',
                        `<div class="marker-pointer" style="border-top: 3vw solid ${kindColor}"></div>`,
                        '</div>',
                        '<div class="marker-icon">',
                        `<div class="marker-icon-circle" style="border: 0.25rem solid ${kindColor}">`,
                        `<span><i class="bx ${kindIcon}" style="color:${kindColor}"></i></span>`,
                        '</div>',
                        '</div>',
                        '</div>',
                    ].join(''),
                }
            });

            // naver.maps.Event.addListener(map, 'zoom_changed', function (zoom) {
            //     console.log('zoom:' + zoom);
            // });

            // var pano = new naver.maps.Panorama("pano", {
            //     // panoId: "OregDk87L7tsQ35dcpp+Mg==",
            //     position: position,
            //     pov: {
            //         pan: -135,
            //         tilt: 29,
            //         fov: 100
            //     },
            //     flightSpot: true, // 항공 아이콘 표시 여부, default: true
            // });
        });
    },
        //  []
    );

    return (
        <>
            <div className="item-card">
                <div className="item-card-frame">
                    {/* map part */}
                    <div className="item-map">
                        <div className="naver-map" id={titleName} style={{ width: '100%', height: '100%' }}>
                        </div>
                        {/* {
                            mapOn ?
                                (<div className="naver-map" id={titleName} style={{ width: '100%', height: '100%' }}>
                                </div>) :
                                (<img src={logo} className="mapoff-1noon-logo" onClick={() => { setMapOn(true) }} alt="logo" />)
                        } */}

                    </div>
                    <div className="item-card-icons-container">
                        <div className="item-card-name">
                            <p className="item-card-court" style={courtColor}>{courtName}</p>
                            <p className="item-card-number">{titleName}</p>
                        </div>
                        {/* title and top icons */}
                        <div className="item-card-icons-top">
                            <div className="icon">
                                <div className="icon-square" style={{ background: kindColor }}>
                                    <i className={`bx ${kindIcon}`}></i>
                                    <p className='unit' style={{ fontSize: textsize }}>{kindNameShort}</p>
                                </div>
                                <div className="icon-title"><span>분류</span></div>
                            </div>
                            <div className="icon">
                                <div className="icon-square" style={{ background: locationColor }}>
                                    <ul>
                                        <li>{state}</li>
                                        <li>{districtShort}</li>
                                    </ul>
                                </div>
                                <div className="icon-title"><span>지역</span></div>
                            </div>
                            <div className="icon"
                            // onClick={() => { setPy(!py) }}
                            >
                                <div className="icon-square">
                                    <i className='bx bx-fullscreen'></i>
                                    <p className="areaIcon" >{typeof (area) === 'number' ? areaShort : ''}</p>
                                </div>
                                <div className="icon-title"><span>면적(㎡)</span></div>
                            </div>
                            <div className="icon">
                                <div className="icon-square">
                                    <i className={`bx ${mixIcon}`}></i>
                                    <p className='unit'>{mix}</p>
                                </div>
                                <div className="icon-title"><span>경매대상</span></div>
                            </div>
                        </div>
                    </div>

                    {/* bottom icons */}
                    <div className="item-card-icons-bottom">
                        <div className="icon">
                            <div className="icon-square gray">
                                <p className='icon-bottom-text'>{priceUnit(estimate)[0]}</p><p className='unit'>{priceUnit(estimate)[1]}</p>
                            </div>
                            <div className="icon-title"><span>감정가</span></div>
                        </div>
                        <div className="icon">
                            <div className="icon-square red">
                                <p className='icon-miss-text'>{miss}</p><p>-{percent}%</p>
                            </div>
                            <div className="icon-title"><span>유찰</span></div>
                        </div>
                        <div className="icon">
                            <div className="icon-square">
                                <ul>
                                    <li>{date[2]}/{date[3]}</li>
                                    <li>{date[1]}</li>
                                </ul>
                            </div>
                            <div className="icon-title"><span>경매일</span></div>
                        </div>
                        <div className="icon">
                            <div className="icon-square">
                                <p className='icon-bottom-text'>{priceUnit(price)[0]}</p>
                                <p className='unit' style={{ textAlign: 'right' }}>{priceUnit(price)[1]}</p>
                            </div>
                            <div className="icon-title"><span>입찰가능</span></div>
                        </div>
                    </div>
                    {/* right icons */}
                    <div className="item-card-buttons-right">
                        <div className="icon" >
                            <button className="square-button">
                                <i className={'bx bx-flip-horizontal bx-share'} ></i>
                            </button>
                            <div className="icon-title-right"><span>공유</span></div>
                        </div>
                        <div className="icon" onClick={() => {
                            setFillStar(!fillStar);
                            addFavorite();
                            setItemsFooter(itemsWatchedDetail)
                        }}>
                            <button className="square-button">
                                <i className={'bx ' + (fillStar ? 'bxs-star' : 'bx-star')}></i>
                            </button>
                            <div className="icon-title-right"><span>관심물건</span></div>
                        </div>
                        <div className="icon" onClick={() => {
                            // setModalItem(!modalItem);
                            // console.log(modalItem);
                            setItemDetail(item);
                            // console.log(itemDetail);
                            navigate(`/${titleName}`)
                            window.scrollTo(0, 0)
                        }}>
                            <button className="square-button">
                                <i className='bx bx-zoom-in'></i>
                            </button>
                            <div className="icon-title-right"><span>상세보기</span></div>
                        </div>
                        <div className="page-index flex-align">
                            <span>p{props.page} {props.i + 1}/10</span>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}
export default Map