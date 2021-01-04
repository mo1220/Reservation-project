import React, { useEffect, useState } from 'react';
import './reservation.css';
import styled from 'styled-components';
import axios from 'axios';
import NonReservation from './NonReservation';
import ReservationList from './ReservationList';
import { Spin } from 'antd';

const Contianer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

function MyReservationPage(props) {
    let url = '';
    const reservationEmail = props.match.params.user
    const [reservationList, setReservationList] = useState([]);
    const [count, setCount] = useState({
        cacnelCount: 0,
        completedCount: 0,
        confirmCount: 0,
    })
    const { cacnelCount, completedCount, confirmCount } = count;

    useEffect(() => {
        fetchGetReservation();
    }, [])

    const fetchGetReservation = () => {
        axios.post('/api/reservations/myreservation', { reservationEmail })
            .then(response => {
                console.log(response.data)
                if (response.data.success) {
                    setReservationList(response.data.reservation);
                } else {
                    alert('예약 리스트를 가져오지 못했습니다.')
                }
            })
    }

    const refreshReservation = () => {
        fetchGetReservation();
    }

    const reservationCounting = (completed, cancel) => {

        setCount({
            cacnelCount: cancel,
            completedCount: completed,
            confirmCount: reservationList.length - cancel - completed
        })
    }


    return (
        <div id="container">
            <div className="ct">
                <div className="section_my">
                    {/* <!-- 예약 현황 --> */}
                    <div className="my_summary">
                        <ul className="summary_board">
                            <li className="item">
                                {/* <!--[D] 선택 후 .on 추가 link_summary_board --> */}
                                <a href={url} className="link_summary_board on">
                                    <i className="spr_book2 ico_book2"></i>
                                    <em className="tit">전체</em>
                                    <span className="figure">{reservationList.length}</span>
                                </a>
                            </li>
                            <li className="item">
                                <a href={url} className="link_summary_board">
                                    <i className="spr_book2 ico_book_ss"></i>
                                    <em className="tit">이용예정</em>
                                    <span className="figure">{count.confirmCount > 0 ? count.confirmCount : 0}</span>
                                </a>
                            </li>
                            <li className="item">
                                <a href={url} className="link_summary_board">
                                    <i className="spr_book2 ico_check"></i>
                                    <em className="tit">이용완료</em>
                                    <span className="figure">{count.completedCount}</span>
                                </a>
                            </li>
                            <li className="item">
                                <a href={url} className="link_summary_board">
                                    <i className="spr_book2 ico_back"></i>
                                    <em className="tit">취소·환불</em>
                                    <span className="figure">{count.cacnelCount}</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* 예약 리스트 */}
                    <div className="wrap_mylist">
                        <ul className="list_cards" ng-if="bookedLists.length > 0">
                            {
                                reservationList &&
                                    reservationList.length > 0
                                    ? <ReservationList
                                        reservationList={reservationList}
                                        refreshReservation={refreshReservation}
                                        reservationCounting={reservationCounting} />
                                    : reservationList === 0
                                        ? <NonReservation />
                                        :
                                        <Contianer>
                                            <Spin
                                                tip="loading..."
                                                size="large">
                                            </Spin>

                                        </Contianer>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(MyReservationPage);