import { useState } from 'react'

function ToTop() {
    const [toTop, sestToTop] = useState(false);
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            sestToTop(true);
        }
        if (window.scrollY < window.innerHeight) {
            sestToTop(false);
        }
    })
    return (
        <div className={`container-toTop ${toTop && 'select'}`}>
            <div className="flex-align toTop" onClick={() => {
                window.scrollTo(0, 0)
            }}>
                <i className='bx bxs-arrow-to-top'></i>
            </div>
        </div>
    )
}
export default ToTop