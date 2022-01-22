import React from 'react';
import {BsDot, BsThreeDotsVertical} from "react-icons/bs"
import './styles/Rating.css';

const Rating = (value) => {
    let rating = [1, 2, 3, 4, 5]

    const stylePart = {background: 'linear-gradient(90deg, #FED501 0% ?%, #C4C4C4 ?% 100%)'}


    const fill = (key) => {
        let bg = stylePart.background.split('?')
        const res = value.value - key + 1
        const limit = res >= 1
            ? 100
            : res > 0 && res < 1
                ? res * 100
                : 0
        return bg[0] + limit + bg[1] + limit + bg[2]
    }

    return (
        <div className='flex-column rating'>
            <div className='battery'>
                {rating.map(i => {
                        let style = {background: fill(i)}
                        if (i === 1) {
                            style.borderRadius = '0.25em 0px 0px 0.25em'
                        } else {
                            style.borderLeftStyle = 'dashed'
                            style.borderLeftColor = 'aliceblue'
                            if (i === 5) {
                                style.borderRadius = '0px 0.25em 0.25em 0px'
                            }
                        }
                        return <BsDot className="cell" key={i} style={style}/>
                    }
                )}
            </div>
            <BsThreeDotsVertical className='hat'/>
        </div>
    );
};

export default Rating;