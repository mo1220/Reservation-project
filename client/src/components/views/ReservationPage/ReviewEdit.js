import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './reservation.css';
import qs from 'querystring';
import { BASE_URL } from '../../Config';


function ReviewEdit(props) {
    const url = props.location.search.replace("?", "");
    const query = qs.parse(url);
    const displayInfoId = parseInt(query.displayInfoId, 10);
    const detail_api = `${BASE_URL}/api/products/${displayInfoId}`;

    const [_image, setImage] = useState(null);
    const [displayInfo, setDisplayInfo] = useState({});
    const [currentRating, setCurrentRating] = useState(0);
    const [text, setText] = useState('');

    let ratingArray = [1, 2, 3, 4, 5];

    const image_container = useRef();

    useEffect(() => {
        Axios.get(detail_api)
            .then(response => {
                console.log(response.data);
                setDisplayInfo(response.data.displayInfo);
            })

    }, [])

    const setThumbnail = (e) => {
        for (let image of e.target.files) {
            let reader = new FileReader();
            reader.onload = (e) => {
                let img = document.createElement('img');
                img.setAttribute('src', e.target.result);
                image_container.current.appendChild(img);
            };
            setImage(image);
            reader.readAsDataURL(image);
        }
    }

    const removeImage = () => {
        setImage(null);
        image_container.current.removeChild(image_container.current.lastChild);
    }

    const ratingHandler = (e) => {
        setCurrentRating(e.target.value);
    }

    const wordCountHandler = (e) => {
        if(text.length >= 400){
            setText(e.target.value.substr(0, text.length));
        } else{
            setText(e.target.value);
        }
    }

    const reviewSubmitHandler = (e) => {
        e.preventDefault();
        if(text.length < 5) {
            alert('최소 5자 이상 입력해 주세요.')
        } else{
            const reviewData = {
                currentRating,
                text,
                _image
            }
            if(window.confirm('리뷰를 등록하시겠습니까?')){
                props.history.push('/');
            } else {
                console.log('등록 취소');
            }
            //DB 저장
    
        }
    }   

    return (
        <div id="review_container">
            <div className="review_wrap">
                <div className="title_wrap">
                    {
                        displayInfo &&
                        (
                            <h3 className="product_title">{displayInfo.productDescription}</h3>
                        )
                    }
                </div>

                <div className="section">
                    <div className="review_write_head">
                        <label
                            htmlFor="score" className="score_title">
                            별점과 이용경험을 남겨주세요.
                            </label>
                        <div className="rating_wrap">
                            {
                                ratingArray.map(item => (
                                    <div key={item} style={{display:'inline-block'}}>
                                        <input
                                            type="checkbox"
                                            id={`score_${item}`}
                                            className={`default ${item <= currentRating  ? 'rating' : ''}`}
                                            value={item}
                                            title={`${item}점`}
                                            name="rating" 
                                            onClick={ratingHandler}/>
                                        <label
                                            htmlFor={`score_${item}`}
                                            className="icon_star_score"></label>

                                    </div>
                                ))
                            }
                        </div>
                        <span className="score">{currentRating > 0 ? currentRating : 0}</span>
                    </div>

                    <div className="review_write_body">
                        <textarea
                            cols="50"
                            rows="10"
                            value={text}
                            onChange={wordCountHandler}>
                        </textarea>
                    </div>
                    <div className="review_write_footer_wrap">
                        <div className="review_write_footer">
                            <label
                                className="btn_upload"
                                htmlFor="reviewImageFileOpenInput">
                                <i
                                    className="fn fn-image1"
                                    area-hidden="true"></i>
                                <span className="text_add_photo">
                                    사진 추가</span>
                            </label>
                            <input
                                type="file"
                                className="hidden_input"
                                id="reviewImageFileOpenInput"
                                accept="image/*"
                                onChange={setThumbnail}
                            />
                            <div className="guide_review">
                                <span>{text.length}</span>
                                        /400
                                <span>(최소5자 이상)</span>
                            </div>
                        </div>

                        {/* 리뷰 포토 */}
                        <div className="review_photos review_photos_write">
                            <div className="item_preview_thumbs">
                                <ul className="lst_thumb">
                                    <li
                                        ref={image_container}
                                        className="item"
                                        style={_image ? { display: 'inline-block' } : { display: 'none' }}>
                                        <a href="#" className="anchor"
                                            onClick={removeImage}>
                                            <span className="spr_book ico_del">삭제</span>
                                        </a>
                                        <span className="img_border"></span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* <!-- 리뷰 등록 --> */}
                        <div className="box_bk_btn review_btn_box">
                            <div className="bk_btn_wrap">
                                <button type="submit" className="bk_btn" onClick={reviewSubmitHandler}>
                                    <span className="btn_txt">리뷰 등록</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewEdit;