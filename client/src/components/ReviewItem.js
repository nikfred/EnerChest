import React from 'react';
import {Col, Image, Card} from "react-bootstrap";
import Rating from "./Rating";

const ReviewItem = ({review}) => {
    return (
        <Col md={{ span: 8, offset: 2 }} className='d-flex mt-3'>
            <Card className=' d-flex float-left justify-content-center align-items-center mx-3' style={{
                height: '120px',
                width: '120px',
                backgroundColor: '#C4C4C4'
            }}>
                {<Image height={'90%'} width={'90%'}  src={review.imageUrl ||'https://svgsilh.com/svg/159847-9e9e9e.svg'}/>}
            </Card>
            <div style={{
                color: '#C4C4C4',
                fontFamily: 'Open Sans Condensed',
            }}>
                <hr className='mb-2 mt-1'/>
                <div className="d-flex float-left my-2 h-20 align-items-center" style={{
                    fontSize: '25px',
                    width: '100%'
                }}>
                    <Rating value={review.rating}/>
                    {review.firstname} {review.lastname}
                </div>

                <div style={{
                    fontSize: '20px',
                }}>
                    {review.text}
                </div>
            </div>
        </Col>
    );
};

export default ReviewItem;