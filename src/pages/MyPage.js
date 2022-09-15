import moment from 'moment';
import 'moment/locale/ko';

function MyPage() {
    // console.log('--itemsRaw--')
    // console.log(itemsRaw)

    // let itemsUniq = itemsRaw.filter(function (x, i) {
    //     return i === itemsRaw.findIndex(y => x.text[0] === y.text[0])
    // });
    // console.log('--itemsUniq--')
    // console.log(itemsUniq)

    // const dayRecent = moment().subtract(13, 'days').format('l');
    // const itemsRecent = itemsUniq.filter(x => x.date[0] > dayRecent);
    // console.log('--itemsRecent--')
    // console.log(itemsRecent)

    // const itemsOutdated = itemsUniq.filter(x => x.date[0] <= dayRecent);
    // console.log('--itemsOutdated--')
    // console.log(itemsOutdated)

    // let itemsMain = itemsRecent.filter(x => x.title[1] === 1);
    // console.log('--itemsMain--')
    // console.log(itemsMain)

    // let itemsSub = itemsRecent.filter(x => x.title[1] !== 1);
    // console.log('--itemsSub--')
    // console.log(itemsSub)

    return (
        <div className="body">
            <div className={`page-title flex-align`}>
                <h2>
                    <i className={`bx bxs-user`}></i>
                    my page
                </h2>
            </div>
        </div>
    )
}
export default MyPage