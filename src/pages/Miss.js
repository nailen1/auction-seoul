import { useContext, useEffect, useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ItemsContext } from "../data/ItemsContext";

function Miss(props) {

    const { subject, pageNum } = useParams();
    console.log(subject);
    const navigate = useNavigate();
    const dataContext = useContext(ItemsContext);
    const items = dataContext.itemsMiss;
    const info = dataContext.infoMiss;

    function arraySetting(n) {
        let diagArr = [];
        for (let i = 0; i < n; i++) {
            let settingArr = Array.from({ length: n });
            settingArr[i] = 'select';
            diagArr.push(settingArr)
        }
        return diagArr
    }

    const arrTab = Array.from({ length: info.length });
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

    useEffect(() => {
        // if (subject === 'new') {
        //     props.setTabSelect(['select', ,])
        //     setPageBtns(arrsPage);
        // }
        // if (subject === 'miss') {
        //     props.setTabSelect([, 'select',])
        //     setPageBtns(arrsPage);
        // }
        // if (subject === 'total') {
        //     props.setTabSelect([, , 'select'])
        //     setPageBtns(arrsPage);
        // }
        props.setTabSelect(['select', ,]);
        // setPageSelect(diagArrsPage[0][pageNum - 1])
        setPageSelect(['select',])
    }, [])

    return (
        <div className="body">
            <div className={`page-title flex-align`}>
                <h2>
                    <i className={`bx bxs-layer-plus`}></i>
                    items. {subject}
                </h2>
            </div>

            <div className="container-tabBtns">
                <div className="frame-tabBtns flex-align">
                    {
                        info.map((x, i) => {
                            return (
                                <button key={i} className={`flex-align tabBtn-miss ${props.tabSelect[i]}`} onClick={() => {
                                    props.setTabSelect(diagArrTab[i]);
                                    setPageSelect(diagArrsPage[0][0]);
                                    navigate(`/items/${x.filter}/page=1`);
                                    console.log(x.filter)
                                    setPageBtns(arrsPage);
                                }}><span className="tabName">{x.label}</span>
                                    <span className={`tabNum-miss`} >{items[i]?.length}</span>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            {
                info.map((x, i) => {
                    return (
                        <div className={`container-pageBtns ${props.tabSelect[i]}`} key={i} style={{ paddingBottom: 0 }}>
                            <div className="container-numBtns " onClick={() => {
                                setPageBtns(arrsPage);
                            }}>
                                {
                                    (pageBtns[0].length === 0) ?
                                        (<div className="btnRefresh">
                                            <i className='bx bx-refresh'></i><span>페이지 버튼 보기</span>
                                        </div>) :
                                        (
                                            <div className="frame-numBtns flex-align">
                                                {
                                                    pageBtns[i]?.map((y, j) => {
                                                        return (
                                                            <button className={`numBtn-miss ${pageSelect[j]}`} key={j + 1} onClick={(e) => {
                                                                setPageSelect(diagArrsPage[i][j]);
                                                                navigate(`/items/${x.filter}/page=${j + 1}`);
                                                                // numBtnSelect(e.target);
                                                            }}>{j + 1}</button>
                                                        )
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
            {
                info.map((x, i) => {
                    return (
                        <div className={`container-pageBtns ${props.tabSelect[i]}`} key={i} style={{ paddingBottom: 0, marginBottom: '5vw' }}>

                            <div className="container-numBtns " onClick={() => {
                                setPageBtns(arrsPage);
                            }}>
                                {
                                    (pageBtns[0].length === 0) ?
                                        (<div className="btnRefresh">
                                            <i className='bx bx-refresh'></i><span>페이지 버튼 보기</span>
                                        </div>) :
                                        (
                                            <div className="frame-numBtns flex-align">
                                                {
                                                    pageBtns[i]?.map((y, j) => {
                                                        return (
                                                            <button className={`numBtn-miss ${pageSelect[j]}`} key={j + 1} onClick={(e) => {
                                                                setPageSelect(diagArrsPage[i][j]);
                                                                navigate(`/items/${x.filter}/page=${j + 1}`);
                                                                window.scrollTo(0, 0)
                                                                // numBtnSelect(e.target);
                                                            }}>{j + 1}</button>
                                                        )
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
        </div >
    )
}
export default Miss