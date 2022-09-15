import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import { ItemsContext } from "../data/ItemsContext";
import Map from "../data/Map";
import $ from 'jquery'
import logo from "../img/1noon-logo.svg";

function Detail(props) {
    const navigate = useNavigate();
    const [fold, setFold] = useState(true);
    const { itemCase } = useParams();
    console.log(itemCase)
    const dataContext = useContext(ItemsContext);
    const itemDetail = dataContext.itemsMiss[2]?.filter(x => x.title[0] === itemCase)[0];
    // console.log(itemDetail)

    const item = props.item || itemDetail;

    const lines = item?.text.length
    const courtName = item?.court[0];
    const titleName = item?.title[0];
    let kindName = item?.kind;
    const kindNameShort = item?.kind.slice(0, 5);
    const area = item?.area[0] || [0, 0];
    // console.log(area)
    const areaShort = item?.area[0].toFixed(1);
    const areaPy = Math.round(item?.area[1]);
    const miss = item?.miss[1];
    const percent = item?.percent[1];
    const date = [item?.date[0], item?.date[1], item?.date[2], item?.date[3]];

    let state = item?.address[0];
    let district = item?.address[1];
    let street = item?.address[2];

    let estimate = item?.estimate[1];
    let price = item?.price[1];


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
        return [x?.toFixed(1), unit]
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
                draggable: true,
            };
            let map = new naver.maps.Map(titleName, mapOptions);
            map.setOptions("mapTypeControl", true); //지도 유형 컨트롤의 표시 여부

            var seoul = new naver.maps.LatLngBounds(
                new naver.maps.LatLng(37.42829747263545, 126.76620435615891),
                new naver.maps.LatLng(37.7010174173061, 127.18379493229875));

            $("#toCenter").on("click", function (e) {
                e.preventDefault();
                map.setCenter(position);
            });
            $("#fold").on("click", function (e) {
                e.preventDefault();
                setFold(!fold);
            });
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

    // console.log(props.item);

    return (
        <div className="body">

            <div className={`detail-title flex-align`}>
                <div className="container-backward">
                    <i className='bx bx-arrow-back' onClick={() => navigate(-1)}></i>
                </div>
                <h2>{titleName}</h2>
                {/* <i className='bx bxs-purchase-tag'>복사</i> */}
            </div>
            <div className="container-details">
                <div className="container-detail-texts">
                    <div className="frame-detail-text">
                        <div className="text-title flex-align">
                        </div>
                    </div>
                    <div className="frame-detail-logo-title flex-align">
                        <img src={logo} className="detail-1noon-logo" alt="logo" />
                        <span className="flex-align"> 요약</span>
                    </div>
                </div>

                <div className="container-detail-info">
                    <div className="detail-info">
                        <div><span>{district} {kindName}</span></div>
                        <div><span>{courtName}</span></div>
                        <div><span>{date[1]}년 {date[2]}월 {date[3]}일</span></div>
                        <div><span>{miss} (-{percent}%)</span></div>
                        <div><span>감정가 {priceUnit(estimate)[0]}{priceUnit(estimate)[1]}</span></div>
                        <div><span>입찰가능가 {priceUnit(price)[0]}{priceUnit(price)[1]}</span></div>
                        <div><span>사용면적 {areaShort}㎡ ({areaPy}평)</span></div>

                    </div>
                </div>
                <div className="container-detail-texts">
                    <div className="frame-detail-text">
                        <div className="text-title flex-align"><span>지도</span></div>
                    </div>
                </div>
                <div className="frame-detail-map">
                    <div className="container-mapBtns flex-align">
                        <button className="mapBtn flex-align" id="fold">
                            {
                                fold ? (<span className="flex-align"><i className='bx bx-collapse-alt'></i></span>) : (<span className="flex-align"><i className='bx bx-square'></i></span>)
                            }
                        </button>
                        <button className="mapBtn flex-align" id="toCenter"><i className='bx bxs-map'></i></button>
                    </div>
                    <div className={`detail-map ${fold ? '' : 'unfold'}`}>
                        <div className={`naver-map  ${fold ? '' : 'unfold'}`} id={titleName} >
                        </div>
                    </div>
                </div>
                <div className="container-detail-texts">
                    <div className="frame-detail-text">
                        <div className="text-title flex-align"><span>상세주소</span>
                            {lines > 5 ? <span className="caution"><i className='bx bxs-error'></i>법원 상세정보 확인필요</span> : ''}</div>
                        <div className="text-long">{item?.text[lines - 2]}</div>
                    </div>
                    <div className="frame-detail-text">
                        <div className="text-title flex-align"><span>상세 정보</span>
                            {lines > 5 ? <span className="caution"><i className='bx bxs-error'></i>법원 상세정보 확인필요</span> : ''}
                        </div>
                        <div className="text-long">{item?.text[lines - 1]}</div>
                        <div className="text-long">{item?.note}</div>
                    </div>
                    <div className="frame-detail-text">
                        <div className="text-title flex-align"><span>가격 정보</span></div>
                        <div className="text-long">{item?.text[1]}</div>
                    </div>
                    <div className="frame-detail-text">
                        <div className="text-title flex-align"><span>공판 정보</span></div>
                        <div className="text-long">{titleName}</div>
                        <div className="text-long">{item?.court[1]}, {item?.court[2]}</div>
                        <div className="text-long">경매공판일: <span className="courtDate">{date[0]}</span></div>
                    </div>
                    <div className="frame-detail-text">
                        <div className="text-title flex-align"><span>기타 주의사항</span></div>
                        <div className="text-title flex-align">
                            {lines > 5 ? <span className="text-caution"><i className='bx bxs-error'></i>물건 정보 중 누락된 정보가 일부 있을 수 있습니다. 법원의 물건 상세정보 확인이 필요합니다.</span> : ''}
                        </div>
                        <div className="text-long"><i className='bx bxs-error'></i>경매 정보는 사건 관련 (채무 변제, 소 취하 등) 법원의 판단으로 공판 직전일까지 일정과 내용이 변경될 수 있습니다.</div>

                    </div>
                </div>
            </div>

        </div >

    )
}
export default Detail