import React from 'react';
import {Col, Image, Card} from "react-bootstrap";
import Rating from "./Rating";
import './styles/ReviewItem.css'

const ReviewItem = ({review}) => {
    return (
        <Col md={{ span: 8, offset: 2 }} className='d-flex mt-3'>
            <Card className=' d-flex float-left justify-content-center align-items-center review__img' style={{
                // height: '120px',
                maxWidth: '120px',
                backgroundColor: '#C4C4C4'
            }}>
                {<Image className='m-auto' width={'90%'}  src={review.imageUrl ||'https://svgsilh.com/svg/159847-9e9e9e.svg'}/>}
            </Card>
            <div className='mx-3 review__body' style={{
                color: '#C4C4C4',
                fontFamily: 'Open Sans Condensed',
                width: '100%'
            }}>
                <hr className='mb-2 mt-1'/>
                <div className="d-flex float-left mt-1 h-20 align-items-center review__had" style={{
                    width: '100%'
                }}>
                    <div className='review__rating'>
                        <Rating value={review.rating}/>
                    </div>

                    {review.firstname} {review.lastname}
                </div>

                <div style={{
                    fontSize: '0.8em',
                }}>
                    {review.text}
                </div>
            </div>
        </Col>
    );
};

export default ReviewItem;