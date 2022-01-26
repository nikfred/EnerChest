import React, {useContext, useState} from 'react';
import {BsDot, BsThreeDotsVertical} from "react-icons/bs"
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import './styles/Rating.css';

const Rating = observer(({value}) => {
    const [rating, setRating] = useState([1, 2, 3, 4, 5])
    const {user} = useContext(Context)
    const stylePart = {background: 'linear-gradient(90deg, #FED501 0% ?%, #C4C4C4 ?% 100%)'}

    const fill = (key) => {
        let bg = stylePart.background.split('?')
        const res = value - key + 1
        const limit = res >= 1
            ? 100
            : res > 0 && res < 1
                ? res * 100
                : 0
        return bg[0] + limit + bg[1] + limit + bg[2]
    }

    const pickHover = (e) => {
        if (!user.isSelectedRating) {
            user.setRating(e.target.id)
        }
    }

    const pickClick = (e) => {
        user.setRating(e.target.id)
        user.setIsSelectedRating(true)
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
                        return <BsDot className="cell" key={i} id={i} style={style}
                                      onMouseEnter={(i) => pickHover(i)}
                                      onClick={(i) => pickClick(i)}/>
                    }
                )}
            </div>
            <BsThreeDotsVertical className='hat'/>
        </div>
    );
});

export default Rating;