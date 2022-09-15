import logo from "../img/1noon-logo.svg";
import { useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from 'jquery'

function Header(props) {

    const navigate = useNavigate();
    const [titleIndex, setTitleIndex] = useState(0);

    const infoIcon = [
        ['home', 'bxs-home-alt-2'],
        ['items', 'bxs-layer-plus'],
        ['location', 'bxs-map-pin'],
        ['price', 'bx-won'],
        ['date', 'bxs-calendar'],
        ['my page', 'bxs-user'],
        ['dev lab', 'bxs-flask'],
        ['news', 'bxs-news'],
    ]
    return (

        <header className={`container-header`}>
            <div className={`header flex-align`}>
                <div className={`header-title`} onClick={() => {
                    navigate('/');
                    setTitleIndex(0);
                }}>
                    <h1>1NOON</h1>
                    <img src={logo} className="1noon-logo" alt="logo" />
                    <h1>AUCTION</h1>
                </div>
            </div>
            <div className={`top-iconBtns`}>
                <div className='frame-iconBtns'>
                    {
                        infoIcon.map((x, i) => {
                            let page;
                            if (x[0] === 'home') {
                                page = '/';
                            }
                            else {
                                page = '/' + x[0];
                            }
                            if (x[0] === 'items') {
                                page = '/items/new/page=1'
                            }
                            if (x[0] === 'date') {
                                page = `/date/${props.indexToday}/page=1`
                            }

                            return (
                                <button
                                    key={i}
                                    value={i}
                                    onClick={() => {
                                        window.scrollTo(0, 0)
                                        setTitleIndex(i);
                                        console.log(titleIndex);
                                        navigate(page);
                                        props.setMissSelect(['select', undefined, undefined])
                                        props.setLocationSelect([undefined, undefined, undefined, undefined, undefined,])
                                        props.setPriceSelect([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,])
                                        // $('.container-location-pageBtns')?.remove('.select')
                                        // window.location.replace(page)
                                    }}>
                                    <i className={`bx ${x[1]}`}></i>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </header>
    )

}
export default Header