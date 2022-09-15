import { useContext, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import { ItemsContext } from "../data/ItemsContext";

function Total() {
    const dataContext = useContext(ItemsContext);
    const items = dataContext.items;

    const pageNum = (items?.length - items?.length % 10) / 10;
    const pages = Array.from({ length: pageNum });

    const navigate = useNavigate();
    const [tab, setTab] = useState(['', '', 'select'])

    const numBtn = document.querySelectorAll('.numBtn');
    console.log(numBtn);

    function numBtnSelect(x) {
        for (let i = 0; i < numBtn.length; i++) {
            numBtn[i].classList.remove('select');
        }
        x.classList.add('select');
    }

    return (
        <div className="body">
            <div className={`page-title flex-align`}>
                <h2>
                    <i className={`bx bxs-layer-plus`}></i>
                    items. total
                </h2>
            </div>

            <div className="container-tabBtns">
                <div className="frame-tabBtns flex-align">
                    <button className={`flex-align tabBtn ${tab[0]}`} onClick={() => {
                        setTab(['select', '', '']); navigate('/new/page=1');
                    }}>
                        <span className="tabName">신건</span>
                    </button>
                    <button className={`flex-align tabBtn ${tab[1]}`} onClick={() => {
                        setTab(['', 'select', '']); navigate('/old/page=1');
                    }}><span className="tabName">유찰</span>
                        {/* <span className="tabNum">{itemsOld?.length}</span> */}
                    </button>
                    <button className={`flex-align tabBtn ${tab[2]}`} onClick={() => {
                        setTab(['', '', 'select']); navigate('/total/page=1');
                    }}><span className="tabName">전체</span>
                        <span className="tabNum">{items?.length}</span>
                        {/* <span className="tabNum">{items?.length}</span> */}
                    </button>
                </div>
            </div>
            <div className="container-pageBtns">
                {/* <button>prev</button> */}
                <div className="container-numBtns ">
                    <div className="frame-numBtns flex-align">
                        <button className={`numBtn select`} key={1} onClick={(e) => {
                            navigate(`/total/page=1`);
                            numBtnSelect(e.target);
                        }}>1</button>
                        {
                            pages.map((x, i) => {
                                return (
                                    <button className={`numBtn`} key={i + 2} onClick={(e) => {
                                        navigate(`/total/page=${i + 2}`);
                                        numBtnSelect(e.target);
                                    }}>{i + 2}</button>
                                )
                            })
                        }
                    </div>
                </div>
                {/* <button>next</button> */}
            </div>

            <Outlet></Outlet>
        </div >
    )
}
export default Total