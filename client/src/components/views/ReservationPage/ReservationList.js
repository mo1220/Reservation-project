import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import {cancelReservation} from '../../../_actions/reservation_action';
import { Link } from 'react-router-dom';

function ReservationList(props) {
    const dispatch = useDispatch();

    const reservationList = props.reservationList;
    const [completed, setCompleted] = useState([]);

    useEffect(() => {
        let currentDate = new Date();
        const cancelCount = reservationList.map(item => item.cancelYn).filter(item => item === true);
        const dates = reservationList.map(item => {
            if(!item.cancelYn) return item.reservationYearMonthDay;           
        });
        const completedDate = dates.map(date => {
            date = new Date(date);
            if(date < currentDate){
                if(date.getDate() !== currentDate.getDate()) {
                    return true
                }
            } 
        })
        setCompleted(completedDate);
        props.reservationCounting(completedDate.filter(item => item === true).length, cancelCount.length);
    }, [])

    const url = (e) => {
        e.preventDefault();
    }

    const useConfirm = (msg = null, onConfirm, onCancel) => {
        if(!onConfirm || typeof onConfirm !== 'function'){
            return;
        }
        if(onCancel && typeof onCancel !== 'function') {
            return;
        }
        const confirmAction = (e) => {
            e.preventDefault();
            const id = e.target.id
            if(window.confirm(msg)) {
                onConfirm(id);
            } else {
                onCancel();
            }
        }

        return confirmAction;
    }
    
    const reservCancelConfirm = (_id) => {

        setTimeout( () => {
            dispatch(cancelReservation({_id}))
            .then(response => {
                if(response.payload.success){
                    props.refreshReservation();
                }else{
                    alert('에러')
                }   
            });
        }, 300)
    }
    const cancelConfirm = () => console.log('취소했습니다.');

    const cancelHandler = useConfirm (
        "예약을 취소하시겠습니까?",
        reservCancelConfirm,
        cancelConfirm,

    );
    
    return (
        <>
            {/* <!--[D] 예약확정: .confirmed, 취소된 예약&이용완료: .used 추가 card --> */}
            {
                reservationList &&
                reservationList.map((item, index) => {
                    return (
                        <li 
                            key={index} 
                            className={`card confirmed ${item.cancelYn || completed[index] ? 'used' : ''}`}>
                            <div className="link_booking_details">
                                <div className="card_header">
                                    <div className="left"></div>
                                    <div className="middle">
                                        {/* <!--[D] 예약 신청중: .ico_clock, 예약확정&이용완료: .ico_check2, 취소된 예약: .ico_cancel 추가 spr_book2 --> */}
                                        <i className="spr_book2 ico_clock"></i>
                                        <span className="tit title">
                                            {
                                                item.cancelYn ? '취소된 예약' : completed[index ] ? '이용 완료' : '예약 확정'
                                            }
                                        </span>
                                    </div>
                                    <div className="right"></div>
                                </div>
                            </div>
                            <article className="card_item">
                                <Link to='#' onClick={url} style={{cursor: 'default'}}className="link_booking_details">
                                    <div className="card_body">
                                        <div className="left"></div>
                                        <div className="middle">
                                            <div className="card_detail">
                                                <em className="booking_number">No. {index + 1}</em>
                                                <h4 className="tit">{item.displayInfo[0].productDescription}</h4>
                                                <ul className="detail">
                                                    <li className="item">
                                                        <span className="item_tit">일정</span>
                                                        <em className="item_dsc">
                                                            {item.reservationYearMonthDay}
                                                        </em>
                                                    </li>
                                                    <li className="item">
                                                        <span className="item_tit">내역</span>
                                                        <em className="item_dsc">
                                                            내역이 없습니다.
														</em>
                                                    </li>
                                                    <li className="item">
                                                        <span className="item_tit">장소</span>
                                                        <em className="item_dsc">
                                                            {item.displayInfo[0].placeLot} <br />
                                                            {item.displayInfo[0].placeStreet}
                                                        </em>
                                                    </li>
                                                    <li className="item">
                                                        <span className="item_tit">업체</span>
                                                        <em className="item_dsc">
                                                            업체명이 없습니다.
														</em>
                                                    </li>
                                                </ul>
                                                <div className="price_summary">
                                                    <span className="price_tit">결제 예정금액</span>
                                                    <em className="price_amount">
                                                        <span>{item.totalPrice}</span>
                                                        <span className="unit">원</span>
                                                    </em>
                                                </div>
                                                {/* <!-- [D] 예약 신청중, 예약 확정 만 취소가능, 취소 버튼 클릭 시 취소 팝업 활성화 --> */}
                                                <div className="booking_cancel">
                                                    {
                                                        item.cancelYn ? undefined 
                                                        : completed[index] 
                                                        ? (<Link
                                                            to={`/reviewEdit?categoryId=${item.displayInfo[0].categoryId}&displayInfoId=${item.displayInfo[0].displayInfoId}`}
                                                            style={{
                                                                display: 'block',
                                                                textAlign: 'center',
                                                                width: '100%',
                                                                height: '30px',
                                                                color: '#000',
                                                                margin: '8px 0',
                                                                background: '#f5f5f5',
                                                                border: '1px solid #e5e5e5',
                                                                cursor: 'pointer'
    
                                                            }} 
                                                            className="btn">
                                                                {/* 예매자 리뷰 남기기 */}
                                                                <span style={{lineHeight: '1.8rem'}}>예매자 리뷰 남기기</span>
                                                        </Link>)
                                                        : (<button
                                                            value={index}
                                                            id={item._id}
                                                            style={{
                                                                
                                                                width: '100%',
                                                                height: '30px',
                                                                color: '#000',
                                                                margin: '8px 0',
                                                                border: '1px solid #e5e5e5',
                                                                cursor: 'pointer'
    
                                                            }} 
                                                            className="btn"
                                                            onClick={cancelHandler}>
                                                                <span>취소</span>
                                                        </button>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right"></div>
                                    </div>
                                    <div className="card_footer">
                                        <div className="left"></div>
                                        <div className="middle"></div>
                                        <div className="right"></div>
                                    </div>
                                </Link>
                                <Link to="" onClick={url} className="fn fn-share1 naver-splugin btn_goto_share" title=""></Link>
                            </article>
                        </li>
                    )
                })
            }
        </>
    );
}
export default React.memo(ReservationList);