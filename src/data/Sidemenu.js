import { useState } from 'react'

function Sidemenu(props) {
    const [sidemenu, setSidemenu] = useState(false)
    if (sidemenu) {
        document.querySelectorAll('body')[0].style.overflowY = 'hidden';
    }
    else {
        document.querySelectorAll('body')[0].style.overflowY = 'scroll';
    }

    return (
        <div className={`container-sidemenu`}>
            <div className={`blocker-sidemenu  ${sidemenu ? 'select' : ''}`}
                onClick={() => {
                    setSidemenu(false);
                }}>
            </div>

            <div className={`frame-sidemenu ${sidemenu ? 'select' : ''}`}>
                <i class='bx bxs-bookmark bx-rotate-270' onClick={() => {
                    setSidemenu(!sidemenu)
                }}></i>
                <div className={`container-body-sidemenu`}>
                    <div className={`body-sidemenu`}>
                        <div className="container-sideHeader">
                            <div className="sideHeader flex-align">
                                <span className='text-const'>한눈</span>
                                <div className="region"><span>서울</span></div>
                                <div className="category"><span>모든 물건</span></div>
                                <span className='text-const'>경매</span>
                            </div>
                            <div className='container-setting'>
                                <div className="sideTitle">
                                    <i className='bx bxs-map-pin'></i>
                                    <h4>지역 설정</h4>
                                </div>
                                <div className='container-settingBtns flex-align'>
                                    <div className="settingBtns region flex-align">
                                        <span>서울</span>
                                    </div>
                                </div>
                            </div>
                            <div className='container-setting'>
                                <div className="sideTitle">
                                    <i className='bx bxs-category'></i>
                                    <h4 className='text-category'>물건종류 설정</h4>
                                </div>
                                <div className='container-settingBtns flex-align'>
                                    <div className="settingBtns category flex-align">
                                        <span>모든 물건</span>
                                    </div>
                                </div>
                            </div>
                            <div className='container-setting'>
                                <div className="sideTitle">
                                    <i className='bx bxs-user'></i>
                                    <h4 className='text-category'>MY MENU</h4>
                                </div>
                                <div className='container-settingBtns flex-align'>
                                    <div className="settingBtns category flex-align">
                                        <span>미설정</span>
                                    </div>
                                </div>
                            </div>

                            <div className="sideFooter flex-align">
                                <div className="frame-userIcon">
                                    <div className="userIcon flex-align">
                                        <i className='bx bxs-user'></i>
                                    </div>
                                </div>
                                <div className='frame-userText flex-align'>
                                    <p>로그인 해주세요.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div />
        </div>
    )
}
export default Sidemenu