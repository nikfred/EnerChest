import React from 'react';
import {Row} from "react-bootstrap";
import ReviewItem from './ReviewItem'


const ReviewList = ({reviews}) => {
    return (
        <Row className="d-flex ">
            {reviews.map(review =>
                <ReviewItem key={review.id} review={review}/>
            )}
        </Row>
    );
};

export default ReviewList;