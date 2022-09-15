import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { ItemsContext } from '../data/ItemsContext';

function Footer(props) {
    const navigate = useNavigate();
    const dataContext = useContext(ItemsContext);
    let items = dataContext.itemsFooter;
    const setItemDetail = dataContext.setItemDetail;

    const kindSetting = (x) => {
        let kindIcon, kindColor;
        switch (x) {
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
        return [kindIcon, kindColor]
    }

    const priceUnit = (x) => {
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

    return (
        <div className='container-footer'>

            <div className="footer-title">
                <i className={'bx bxs-star'}></i><span>최근 관심물건</span></div>
            <div className="frame-footer">
                <div className="footer-items flex-align">
                    {
                        items?.map((x, i) => {
                            return (
                                <ul className='' onClick={() => {
                                    setItemDetail(x)
                                    navigate(`/${x.title[0]}`);
                                    window.scrollTo(0, 0);
                                }}>
                                    <li className='footer-icon' style={{ color: kindSetting(x.kind)[1] }}><i className={`bx ${kindSetting(x.kind)[0]}`}></i></li>
                                    <li className='footer-text'>{x.address[1].slice(0, 3)} {x.kind.slice(0, 2)}</li>
                                    <li className='footer-text'>{priceUnit(x.price[1])[0]}{priceUnit(x.price[1])[1]}</li>
                                </ul>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Footer