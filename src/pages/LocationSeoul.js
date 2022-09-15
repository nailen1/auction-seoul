import { useContext, useState, } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import { ItemsContext } from "../data/ItemsContext";

function LocationSeoul(props) {

    const navigate = useNavigate();

    const funcClick = (x, court) => {
        props.setTabSelect(diagArrTab[x]);
        props.setHideItems(true);
        setPageSelect(diagArrsPage[0][0]);
        navigate(`/location/${court}/page=1`);
        setPageBtns(arrsPage);
    }

    const dataContext = useContext(ItemsContext);
    const items = dataContext.itemsLocation;
    const info = dataContext.infoSeoul;

    function arraySetting(n) {
        let diagArr = [];
        for (let i = 0; i < n; i++) {
            let settingArr = Array.from({ length: n });
            settingArr[i] = 'select';
            diagArr.push(settingArr)
        }
        return diagArr
    }

    const arrTab = Array.from({ length: info.length })
    const diagArrTab = arraySetting(info.length);

    const pageNumbers = [];
    for (let i = 0; i < info.length; i++) {
        pageNumbers.push(Math.ceil(items[i]?.length / 10))
    }

    const arrsPage = [];
    for (let i = 0; i < info.length; i++) {
        arrsPage.push(Array.from({ length: pageNumbers[i] }))
    }

    let [pageBtns, setPageBtns] = useState(arrsPage);

    const diagArrsPage = [];
    for (let i = 0; i < info.length; i++) {
        diagArrsPage.push(arraySetting(pageNumbers[i]))
    }

    const [pageSelect, setPageSelect] = useState(diagArrsPage[0][0]);

    return (
        <div className="body">
            <div className={`page-title flex-align`}>
                <h2>
                    <i className={`bx bxs-map-pin`}></i>
                    location. seoul
                </h2>
            </div>

            <div div className="container-map-seoul" >
                <svg version="1.1" id="seoul"
                    viewBox="0 0 905.5 749" onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            props.setTabSelect([undefined, undefined, undefined, undefined, undefined]);
                            props.setHideItems(true);
                            setPageSelect(diagArrsPage[0][0]);
                            navigate(`/location`);
                            setPageBtns(arrsPage);
                        }
                    }}>
                    <style type="text/css">
                    </style>
                    <g className={`center ${props.tabSelect[0]}`} onClick={() => {
                        funcClick(0, 'center')
                    }}>
                        <polygon id="joong" class="st0" points="419.8,385 506.8,409 539.8,346 416.8,354.9 	" />
                        <polygon id="jongno" class="st0" points="536.8,341 413.8,349.9 406.8,278 368.2,252.5 434.8,187 467.8,279 	" />
                        <polygon id="seocho" class="st0" points="457.5,514 493.8,509 523.8,470 554.2,561 608.8,608 656.8,590 690.8,633 608.8,711 
		559.8,677 549.8,622 473.8,615 452,590.5 	"/>
                        <polygon id="dongjak" class="st0" points="298.9,566 403.8,548 425.8,589.5 449,589.5 454.5,513 411.8,507 376.6,483 329.8,512 	
		"/>
                        <polygon id="gwanak" class="st0" points="337.8,658 383.8,687 469.8,618 448,593.5 424.8,593.5 402.8,552 297.9,570 	" />
                        <polygon id="gangnam" class="st0" points="525.8,466 552.8,448 581.8,448 630.8,484 639.8,515 701.8,549 749.8,604 692.8,629 
		658.8,586 610.8,604 556.2,557 	"/>
                    </g>
                    <g className={`east ${props.tabSelect[1]}`} onClick={() => {
                        funcClick(1, 'east');
                    }}>
                        <polygon id="songpa" class="st0" points="633.8,482 704.8,464 728.8,424 779.8,488 811.8,522 752.8,602 704.8,547 642.8,513 	" />
                        <polygon id="sungdong" class="st0" points="511.8,412 532.2,440 572,426 611.8,447 640.8,378 544.8,349 	" />
                        <polygon id="gwangjin" class="st0" points="710.8,379 710.8,418 691.8,454 640.3,466 614.8,448 643.8,379 658.8,358.9 705.8,338.7 
			"/>
                        <polygon id="gangdong" class="st0" points="729.8,368.5 841.8,313.2 859.8,395.3 810.8,420 780.8,483 729.8,419 	" />
                    </g>
                    <g className={`west ${props.tabSelect[2]}`} onClick={() => {
                        funcClick(2, "west");
                    }}>
                        <polygon id="eunpyeong" class="st0" points="382.8,131 301.8,161 269.8,293 291.9,320.7 429.8,185 	" />
                        <polygon id="yongsan" class="st0" points="525.2,440 476.2,489 417.8,485 370.8,453 417.8,388 504.8,412 	" />
                        <polygon id="seodaemoon" class="st0" points="403.8,280 413.8,382 334.8,376 293.9,324.7 365.2,254.5 	" />
                        <polygon id="mapo" class="st0" points="206.8,334 271.8,301 334.8,380 413.8,386 366.8,451 	" />
                    </g>
                    <g className={`south ${props.tabSelect[3]}`} onClick={() => {
                        funcClick(3, "south");

                    }}>
                        <polygon id="yeongdeungpo" class="st0" points="264.8,406.1 373.6,481 326.8,510 295.9,564 249.8,491 	" />
                        <polygon id="yangcheon" class="st0" points="131.8,447 125.8,489 155.8,519 246.8,489 261.8,404.1 199.8,412 181.8,447 	" />
                        <polygon id="geumcheon" class="st0" points="227.8,556 300.2,585.3 332.8,657 285.8,691 246.8,629 	" />
                        <polygon id="guro" class="st0" points="300.2,582.3 292.9,566 246.8,493 155.8,523 125.8,493 115.8,582 174.8,589.5 227.8,553 	" />
                        <path id="gangseo" class="st0" d="M116.8,294c-33,30.3-66,60.7-99,91l58,43l35-6l20,22h50l18-35l62-7.9
		C212.8,365.4,164.8,329.7,116.8,294z"/>
                    </g>
                    <g className={`north ${props.tabSelect[4]}`} onClick={() => {
                        funcClick(4, "north");
                    }}>
                        <polygon id="joongrang" class="st0" points="733.8,230.9 733.8,291 709.8,332.7 662.8,352.9 647.8,255.5 709.8,217 	" />
                        <polygon id="seongbook" class="st0" points="459.5,180 557.8,249 592.8,228.9 639.8,253.5 531.2,330.7 474.8,280 441.8,188 	" />
                        <polygon id="dongdaemoon" class="st0" points="643.8,374 547.8,345 535.2,333.7 643.8,256.5 658.8,353.9 	" />
                        <polygon id="dobong" class="st0" points="524.2,12 603.8,52 613.8,161 574,193.6 533.8,138 504.8,52 	" />
                        <polygon id="noweon" class="st0" points="656.8,30 690.8,67 680.8,132 708.8,213 646.8,251.5 599.8,226.9 578,196.6 617.8,164 
		607.8,55 	"/>
                        <polygon id="gangbook" class="st0" points="500.8,52 448.8,117 458.5,175 556.8,244 591.8,223.9 529.8,138 	" />
                    </g>
                </svg>

            </div>
            <div className="container-tabBtns">
                <div className="frame-tabBtns flex-align">
                    {
                        info.map((x, i) => {
                            return (
                                <button key={i} className={`flex-align tabBtn-location ${props.tabSelect[i]}`} onClick={() => {
                                    props.setTabSelect(diagArrTab[i]);
                                    props.setHideItems(true);
                                    setPageSelect(diagArrsPage[0][0]);
                                    navigate(`/location/${x.court[2]}/page=1`);
                                    setPageBtns(arrsPage);
                                }}><span className="tabName">{props.tabSelect[i] ? x.court[0] : x.court[1]}</span>
                                    <span className={`tabNum-location`} style={{ background: (props.tabSelect[i] ? '#fff' : x.court[3]) }}>{items[i]?.length}</span>
                                </button>
                            )
                        })
                    }
                </div>

                {
                    props.tabSelect.filter(x => x === undefined).length === 5 ?
                        (
                            <div className="container-notice">
                                <ul>
                                    <li>지도의 관심 지역을 클릭하세요.</li>
                                    <li>해당 지역 관할법원의 물건들이 보입니다.</li>
                                </ul>
                            </div>
                        ) : (null)
                }
                {
                    info.map((x, i) => {
                        return (
                            <div key={i} className={`container-courtStates ${props.tabSelect[i]} flex-align`} style={{ background: x.court[3] }}>
                                <ul className="frame-courtStates flex-align">
                                    {
                                        x.state.map((y, j) => {
                                            return (
                                                <li className="courtState" key={j}>#{y}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
            {
                info.map((x, i) => {
                    return (
                        <div key={i} className={`container-pageBtns ${props.tabSelect[i]}`} >
                            <div className="container-numBtns ">
                                <div className="frame-numBtns flex-align">
                                    {
                                        pageBtns[i]?.map((y, j) => {
                                            return (
                                                <button key={j + 1} className={`numBtn-location ${pageSelect[j]}`} style={{ background: (pageSelect[j] ? x.court[3] : '') }} onClick={() => {
                                                    setPageSelect(diagArrsPage[i][j]);
                                                    navigate(`/location/${x.court[2]}/page=${j + 1}`);
                                                    // numBtnSelect(e.target);
                                                }}>{j + 1}</button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {pageBtns[i].length > 4 ? (<i className='bx bx-transfer-alt'></i>) : null}
                        </div>

                    )
                })
            }
            {
                props.hideItems ?
                    <Outlet></Outlet>
                    :
                    (
                        null
                    )
            }
            {
                info.map((x, i) => {
                    return (
                        <div key={i} className={`container-pageBtns ${props.tabSelect[i]}`} >
                            <div className="container-numBtns ">
                                <div className="frame-numBtns flex-align">
                                    {
                                        pageBtns[i]?.map((y, j) => {
                                            return (
                                                <button key={j + 1} className={`numBtn-location ${pageSelect[j]}`} style={{ background: (pageSelect[j] ? x.court[3] : '') }} onClick={() => {
                                                    setPageSelect(diagArrsPage[i][j]);
                                                    navigate(`/location/${x.court[2]}/page=${j + 1}`);
                                                    window.scrollTo(0, 0);
                                                    // numBtnSelect(e.target);
                                                }}>{j + 1}</button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {pageBtns[i].length > 4 ? (<i className='bx bx-transfer-alt'></i>) : null}
                        </div>
                    )
                })
            }
        </div >
    )
}
export default LocationSeoul