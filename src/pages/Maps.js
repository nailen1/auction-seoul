import Map from "../data/Map"
import { ItemsContext } from "../data/ItemsContext";
import { useContext, useEffect, useState, useTransition } from 'react'
import { useParams } from "react-router-dom";

function Maps() {

    const { subject, pageNum } = useParams();
    console.log(subject);

    const dataContext = useContext(ItemsContext);
    let items, bgColor;
    switch (subject) {
        case 'new':
            items = dataContext.itemsMiss[0];
            break;
        case 'miss':
            items = dataContext.itemsMiss[1];
            break;
        case 'total':
            items = dataContext.itemsMiss[2];
            break;
        case 'center':
            items = dataContext.itemsLocation[0];
            bgColor = '#06D6A022';
            break;
        case 'east':
            items = dataContext.itemsLocation[1];
            bgColor = '#6A4C9322';
            break;
        case 'west':
            items = dataContext.itemsLocation[2];
            bgColor = '#FFD16622';
            break;
        case 'south':
            items = dataContext.itemsLocation[3];
            bgColor = '#F7982422';
            break;
        case 'north':
            items = dataContext.itemsLocation[4];
            bgColor = '#118AB222';
            break;
        case 'group0':
            items = dataContext.itemsPrice[0];
            break;
        case 'group1':
            items = dataContext.itemsPrice[1];
            break;
        case 'group2':
            items = dataContext.itemsPrice[2];
            break;
        case 'group3':
            items = dataContext.itemsPrice[3];
            break;
        case 'group4':
            items = dataContext.itemsPrice[4];
            break;
        case 'group5':
            items = dataContext.itemsPrice[5];
            break;
        case 'group6':
            items = dataContext.itemsPrice[6];
            break;
        case 'group7':
            items = dataContext.itemsPrice[7];
            break;
        case 'group8':
            items = dataContext.itemsPrice[8];
            break;

        case '0':
            items = dataContext.itemsDate[0];
            break;
        case '1':
            items = dataContext.itemsDate[1];
            break;
        case '2':
            items = dataContext.itemsDate[2];
            break;
        case '3':
            items = dataContext.itemsDate[3];
            break;
        case '4':
            items = dataContext.itemsDate[4];
            break;
        case '5':
            items = dataContext.itemsDate[5];
            break;
        case '6':
            items = dataContext.itemsDate[6];
            break;
        case '7':
            items = dataContext.itemsDate[7];
            break;
        case '8':
            items = dataContext.itemsDate[8];
            break;
        case '9':
            items = dataContext.itemsDate[9];
            break;
        case '10':
            items = dataContext.itemsDate[10];
            break;
        case '11':
            items = dataContext.itemsDate[11];
            break;
        case '12':
            items = dataContext.itemsDate[12];
            break;
        case '13':
            items = dataContext.itemsDate[13];
            break;
        case '14':
            items = dataContext.itemsDate[14];
            break;
        case '15':
            items = dataContext.itemsDate[15];
            break;
        case '16':
            items = dataContext.itemsDate[16];
            break;
        case '17':
            items = dataContext.itemsDate[17];
            break;
        case '18':
            items = dataContext.itemsDate[18];
            break;
        case '19':
            items = dataContext.itemsDate[19];
            break;
        case '20':
            items = dataContext.itemsDate[20];
            break;
        case '21':
            items = dataContext.itemsDate[21];
            break;
        case '22':
            items = dataContext.itemsDate[22];
            break;
        case '23':
            items = dataContext.itemsDate[23];
            break;
        case '24':
            items = dataContext.itemsDate[24];
            break;
        case '25':
            items = dataContext.itemsDate[25];
            break;
        case '26':
            items = dataContext.itemsDate[26];
            break;
        case '27':
            items = dataContext.itemsDate[27];
            break;

        default:
            break;
    }

    // METHOD1
    let itemSlice = items?.slice(0 + 10 * (pageNum - 1), 10 + 10 * (pageNum - 1));

    // METHOD2
    // let itemsSlices = [];
    // for (let i = 0; i < Math.ceil(items.length / 10); i++) {
    //     let item10 = items?.slice(0 + 10 * i, 10 + 10 * i);
    //     itemsSlices.push(item10)
    // }

    // console.log(itemsSlices);
    // let itemSlice = itemsSlices[pageNum - 1];

    return (

        <div className="container-items" style={{ background: bgColor }}>

            {/* ITEM CARDS */}
            {
                itemSlice?.map(function (x, i) {
                    return (
                        <Map x={x} page={pageNum} i={i} key={x.title[0]} />
                    )
                })
            }
        </div>
    )
}
export default Maps