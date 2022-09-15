import { useContext, useState } from "react"
import { ItemsContext } from "../data/ItemsContext"
import { Outlet, useNavigate } from 'react-router-dom'

function Price(props) {

    const navigate = useNavigate();
    const dataContext = useContext(ItemsContext);
    const items = dataContext.itemsPrice;
    const info = dataContext.infoPrice;

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


    const nPrice = [
        items[0].length, items[1].length, items[2].length, items[3].length, items[4].length, items[5].length, items[6].length, items[7].length, items[8].length,
    ];

    const funcNhPrice = () => {
        let nhBucket = [];

        nPrice.forEach((x) => {
            let n, h;
            if (x === 0) {
                n = null;
                h = 0;
            }
            else if (x > 100) {
                n = '100+';
                h = 80;
            }
            else {
                n = String(x);
                h = parseFloat((n * 0.8).toFixed(1));
            }
            nhBucket.push([n, h]);
        })

        return nhBucket
    }

    const nhPrice = funcNhPrice();

    return (
        <div className="body">
            <div className={`page-title flex-align`}>
                <h2>
                    <i className={`bx bx-won`}></i>
                    price
                </h2>
            </div>
            <div className={`container-priceBars`}>
                <ul className="frame-priceBars">
                    {
                        nhPrice.map((x, i) => {
                            return (
                                <li key={`group${i + 1}`} className="">
                                    <div className={`container-priceGroup ${props.tabSelect[i]}`} onClick={() => {
                                        props.setTabSelect(diagArrTab[i]);
                                        if (props.tabSelect[i]) { props.setTabSelect(arrTab) };
                                        setPageBtns(arrsPage);
                                        setPageSelect(diagArrsPage[0][0]);
                                        navigate(`/price/group${i}/page=1`)
                                        window.scroll(0, window.innerHeight * 5 / 100 * i)
                                    }}>
                                        <i className={`bx  ${props.tabSelect[i] ? 'bx-expand-vertical' : 'bx-collapse-vertical'}`} onClick={(e) => {
                                        }}></i>
                                        <div className="priceBar">
                                            <div className="price-label">
                                                <span>{info[i].label}</span>
                                            </div>
                                            <div className="bar" style={{ width: x[1] + '%' }}>
                                                <span className="num">{x[0]}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`container-pageBtns ${props.tabSelect[i]}`} key={i}>
                                        <div className="container-numBtns ">
                                            <div className="frame-numBtns flex-align">
                                                {
                                                    pageBtns[i]?.map((y, j) => {
                                                        return (
                                                            <button className={`numBtn-price ${pageSelect[j]}`} key={j + 1} onClick={(e) => {
                                                                setPageSelect(diagArrsPage[i][j]);
                                                                navigate(`/price/group${i}/page=${j + 1}`);
                                                                // numBtnSelect(e.target);
                                                            }}>{j + 1}</button>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        {pageBtns[i].length > 4 ? (<i className='bx bx-transfer-alt'></i>) : null}
                                    </div>
                                    {
                                        props.tabSelect[i] ?
                                            (<Outlet></Outlet>) : null
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>

    )
}
export default Price