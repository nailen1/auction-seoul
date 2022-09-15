import { useContext, useEffect, useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ItemsContext } from "../data/ItemsContext";

function Home(props) {
    useEffect(() => {
    }, [])

    const navigate = useNavigate();
    const dataContext = useContext(ItemsContext);
    const items = dataContext.itemsMiss;
    const numNew = items[0]?.length;
    const numMiss = items[1]?.length
    const numTotal = items[2]?.length
    const itemsLocation = dataContext.itemsLocation;
    // console.log(itemsLocation)
    const numsLocation = itemsLocation?.map(x => x?.length);
    // console.log(numsLocation)
    const portionLocation = numsLocation.map(x => ((x / numTotal) * 100).toFixed(1))
    // console.log(portionLocation)
    const namesLocation = ['중앙', '동부', '서부', '남부', '북부'];

    const pricesItems = items[2]?.map(x => x.price[1]);
    // console.log(pricesItems)

    const estimatesItems = items[2]?.map(x => x.estimate[1]);
    // console.log(estimatesItems)

    let capPrices = parseInt(pricesItems?.reduce(function add(sum, currValue) {
        return sum + currValue;
    }, 0));
    let capEstimates = parseInt(estimatesItems?.reduce(function add(sum, currValue) {
        return sum + currValue;
    }, 0));

    // console.log(capPrices);

    console.log('home')
    return (
        <div className="body">
            <div className={`page-title flex-align`}>
                <h2>
                    <i className={`bx bxs-home`}></i>
                    home
                </h2>
            </div>
            <h2 className="subtitle"><i class='bx bxs-info-square' ></i>AUCTION MARKET INDEX</h2>
            <div className="container-auction-informs">
                <div className="auction-inform">
                    <div className="num-inform flex-align"><span>{capPrices.toLocaleString()}억</span></div>
                    <div className="text-inform flex-align">
                        <p className="text">AUTC</p>
                        <div className="toolTip">
                            <i class='bx bx-info-circle'><span className="toolTip-text">최근물건들 경매시작가의 총합</span></i>
                        </div>
                    </div>
                </div>
                <div className="auction-inform">
                    <div className="num-inform flex-align"><span>{capEstimates.toLocaleString()}억</span></div>
                    <div className="text-inform flex-align">
                        <p className="text">AUEC</p>
                        <div className="toolTip">
                            <i class='bx bx-info-circle'><span className="toolTip-text">최근물건들 감정가의 총합</span></i>
                        </div>
                    </div>
                </div>
                <div className="auction-inform">
                    <div className="num-inform flex-align"><span>{parseInt(capPrices / capEstimates * 100)}%</span></div>
                    <div className="text-inform flex-align">
                        <p className="text">AUMR</p>
                        <div className="toolTip">
                            <i class='bx bx-info-circle'><span className="toolTip-text">최근물건들 유찰가격율</span></i>
                        </div>
                    </div>
                </div>
                <div className="auction-inform">
                    <div className="num-inform flex-align"><p>{numTotal}</p> <p>({numNew})</p></div>
                    <div className="text-inform"><p>전체(신규) 물건수</p></div>
                </div>
            </div>
            <div className="container-auction-informs lg">
                <div className="auction-informs lg">
                    <div className="auction-inform lg">
                        <div className="frame-colors">
                            {
                                portionLocation.map((x, i) => {
                                    return (
                                        <div key={i} className="color" style={{ width: `${x}%` }}>

                                            <p className="name-location">{namesLocation[i]}</p>
                                            <div className="num-portion flex-align"><span>{x}%</span></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="text-inform"><span>관할법원 지역별 물건 비율</span></div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />

            {/* <p>(개발중) chart devlab</p>
            <a href="https://www.chartjs.org/docs/latest/samples/line/multi-axis.html">Multi Axis Line Chart</a>
            <h4>l-axis: item numbers</h4>
            <h4>r-axis: total cap</h4> */}
        </div >
    )
}
export default Home
