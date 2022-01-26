import React, {useContext, useState} from 'react';
import {Button, Card, Col, Form, FormControl, Image} from "react-bootstrap";
import {BsXLg} from "react-icons/bs"
import Rating from "./Rating";
import './styles/ReviewItem.css'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {createReview, deleteReview} from "../http/productAPI";

const ReviewItem = observer(({review}) => {
    const {user} = useContext(Context)
    const [text, setText] = useState('')

    const add = () => {
        if (user.rating && text) {
            createReview({
                product_id: review.product_id,
                rating: user.rating,
                text
            }).then(data => window.location.reload())
        } else {
            alert('Напишите отзыв или оставьте оценку')
        }
    }

    const remove = () => {
        deleteReview(review.id).then(data => window.location.reload())
    }

    return (
        <Col md={{span: 8, offset: 2}} className='d-flex mt-3'>
            <Card className=' d-flex float-left justify-content-center align-items-center review__img' style={{
                // height: '120px',
                maxWidth: '120px',
                backgroundColor: '#C4C4C4'
            }}>
                {<Image className='m-auto' width={'90%'}
                        src={review.imageUrl || 'https://svgsilh.com/svg/159847-9e9e9e.svg'}/>}
            </Card>
            <div className='mx-3 review__body' style={{
                color: '#C4C4C4',
                fontFamily: 'Open Sans Condensed',
                width: '100%'
            }}>
                <hr className='mb-0 mt-1'/>

                <div className="d-flex  my-1 h-20 align-items-center review__had" style={{
                    width: '100%'
                }}>
                    <div className='review__rating'>
                        {review.id !== 'new'
                            ? <Rating value={review.rating}/>
                            : <Rating value={user.rating}/>
                        }
                    </div>
                    {review.id !== 'new'
                        ?   <div className='d-flex w-100 align-items-center justify-content-between'>
                                {review.firstname} {review.lastname}
                                {review.uid === {...user.user}.id
                                    ?   <Button
                                            className='p-1'
                                            variant="danger"
                                            style={{lineHeight: '0'}}
                                            onClick={remove}
                                            >
                                            <BsXLg/>
                                        </Button>
                                    : ''
                                }
                            </div>
                        :   <div className='d-flex w-100 justify-content-end'>
                                <Button className='my-auto' variant="success" onClick={add}>Добавить</Button>
                            </div>
                    }
                </div>

                <div style={{
                    fontSize: '0.8em',
                }}>
                    {review.id !== 'new'
                        ? <p>{review.text}</p>
                        : <Form>
                            <FormControl
                                placeholder="Оставьте свой отзыв..."
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                        </Form>

                    }
                </div>
            </div>
        </Col>
    );
});

export default ReviewItem;