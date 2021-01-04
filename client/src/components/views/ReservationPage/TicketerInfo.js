import React, {useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import './reservation.css';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {reservation} from '../../../_actions/reservation_action';
import {withRouter} from 'react-router-dom';

const FormContainer = styled.div`
    background-color: #fff;
`;
function TicketerInfo(props) {
    const dispatch = useDispatch();

    const totalCount = props.count.adultCount + props.count.teenagerCount + props.count.childCount;
    const displayInfo = props.displayInfo;
    const prices = props.prices;
    const totalPrice = props.totalPrice;

    const [checked, setChecked] = useState(false);
    const [reservationDate, setReservationDate] = useState('');

    const d = new Date();
    const _month = d.getMonth();
    const date = d.getDate() + Math.floor(Math.random() * 6);
    const reservDate = new Date(2020, _month, date).toLocaleDateString("ko-KR");
    
    useEffect( () => {
        setReservationDate(reservDate.replace(/ /g,""));

    }, []);

    //예약하기 버튼 활성화
    const submitBtn = useRef();
    const checkedHandler = () => {
        setChecked(!checked);
    }


    //동의하기 '보기' 활성화
    const toggle_1 = useRef();
    const toggle_2 = useRef();
    
    const agreementMoreHandler = (n) => {
        const useragreement_detail = document.querySelectorAll('.agreement');

        if(n === 1) {
            toggle_1.current.classList.toggle('fn');
            useragreement_detail[n].classList.toggle('open');
        } else {
            toggle_2.current.classList.toggle('fn');
            useragreement_detail[n].classList.toggle('open');
        }
    }

    const regNumber = /^\d{3}-\d{3,4}-\d{4}$/;

    return (
        <Formik
            initialValues={{
                name: '',
                tel: '',
                email: ''
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                  .required('필수 입력입니다'),
                tel: Yup.string()
                  .matches(regNumber, '전화번호 형식으로 입력해 주세요.')
                  .required('필수 입력입니다.'),
                email: Yup.string()
                  .email('이메일 형식으로 입력해 주세요.')
                  .required('필수 입력입니다'),
            })}

            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    let reservationParams = {
                        displayInfo: displayInfo,
                        prices: prices,
                        totalPrice: totalPrice,
                        productId: displayInfo.productId,
                        reservationEmail: values.email,
                        reservationName: values.name,
                        reservationTelephone: values.tel,
                        reservationYearMonthDay: reservationDate 
                    }
                    console.log(reservationParams);

                    dispatch(reservation(reservationParams)).then(response => {
                        console.log(response)
                        if(response.payload.success){
                            alert('예약하시겠습니까?');
                            props.history.push('/');
                        } else {
                            alert(response.payload.err.errmsg)
                        }
                    })
                    
                    setSubmitting(false);
                  }, 400);
            }}>
            {
                props => {
                    const {
                        values,
                        errors,
                        touched,
                        dirty,
                        isValid,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    } = props;

                return (
                    <FormContainer className="section_booking_form">
                        <div className="booking_form_wrap">
                         <div className="form_wrap">
                           <h3 className="out_tit">예매자 정보</h3>
                           <div className="agreement_nessasary help_txt">  
                               <span className="spr_book ico_nessasary"></span>
                               <span>필수입력</span>
                           </div>
                           <form
                               className="form_horizontal" 
                               onSubmit={handleSubmit}>
                               <div className="inline_form"> 
                                   <label className="label" htmlFor="name"> 
                                       <span className="spr_book ico_nessasary">필수</span> <span>예매자</span> 
                                   </label>
                                   <div className="inline_control"> 
                                       <input 
                                           type="text" 
                                           name="name" 
                                           id="name"
                                           value={values.name} 
                                           className={ errors.name && touched.name ? 'text-input error' : 'text' }
                                           placeholder="네이버" maxLength="17"
                                           onChange={handleChange}
                                           onBlur={handleBlur}/>
                                            {
                                                errors.name && touched.name &&
                                                (
                                                    <div className="warning_msg">{errors.name}</div>
                                                )
                                            }
                                   </div>
                               </div>
                               <div className="inline_form"> 
                                   <label className="label" htmlFor="tel"> 
                                       <span className="spr_book ico_nessasary">필수</span> <span>연락처</span> 
                                   </label>
                                   <div className="inline_control tel_wrap">
                                       <input 
                                           type="tel" 
                                           name="tel" 
                                           id="tel" 
                                           className={ errors.tel && touched.tel ? 'text-input error' : 'text' }
                                           value={values.tel} 
                                           placeholder="휴대폰 입력 시 예매내역 문자발송"
                                           onChange={handleChange}
                                           onBlur={handleBlur}/>
                                            {
                                                errors.tel && touched.tel &&
                                                (
                                                    <div className="warning_msg">{errors.tel}</div>
                                                )
                                            }
                                   </div>
                               </div>
                                   <div className="inline_form">
                                       <label className="label" htmlFor="email">
                                           <span className="spr_book ico_nessasary">필수</span>  
                                           <span>이메일</span> 
                                       </label>
                                       <div className="inline_control"> 
                                           <input 
                                               type="email" 
                                               name="email" 
                                               id="email" 
                                               className={ errors.email && touched.email ? 'text-input error' : 'text' }
                                               value={values.email} 
                                               placeholder="crong@codesquad.kr" 
                                               maxLength="50"
                                               onChange={handleChange}
                                               onBlur={handleBlur}/>
                                                {
                                                    errors.email && touched.email &&
                                                        (
                                                            <div className="warning_msg">{errors.email}</div>
                                                        )
                                                }
                                       </div>
                                   </div>
                                   <div className="inline_form last"> 
                                       <label className="label" htmlFor="message">예매내용</label>
                                          <div className="inline_control">
                                               <p className="inline_txt selected">{reservationDate} 총 <span id="totalCount">{totalCount}</span>매</p>
                                           </div>
                                   </div>
                               </form>
                           </div>
                       </div>
       
                       {/* 이용자 약관 동의 Form*/}
                       <div className="section_booking_agreement">
                           <div className="agreement all">
                               <input 
                                   type="checkbox" 
                                   id="chk3" 
                                   className="chk_agree"
                                   checked={checked}
                                   onChange={checkedHandler}/> 
                               <label 
                                   htmlFor="chk3" 
                                   className="label chk_txt_label"> 
                                   <span>이용자 약관 전체동의</span> 
                               </label>
                               <div className="agreement_nessasary">
                                   <span>필수동의</span>
                               </div>
                           </div>
       
                           {/* [D] 약관 보기 클릭 시 agreement에 open 클래스 추가*/}
                           <div 
                               className="agreement">
                               <span className="chk_txt_span">
                                   <i className="spr_book ico_arr_ipc2">icon</i> 
                                   <span>개인정보 수집 및 이용 동의</span>
                               </span>
                               <a 
                                   href="#"
                                   value="btn_1"
                                   className="btn_agreement" 
                                   onClick={(e) =>{
                                       e.preventDefault();
                                       agreementMoreHandler(1)}}> 
                                   <span className="btn_text">보기</span> 
                                   <i
                                       ref={toggle_1}
                                       className="fn fn-down2"></i> 
                               </a>
                               <div 
                                   className="useragreement_details">&lt;개인정보 수집 및 이용 동의&gt;<br/><br/> 1. 수집항목 : [필수] 이름, 연락처, [선택] 이메일주소<br/><br/> 2. 수집 및 이용목적 : 사업자회원과 예약이용자의 원활한 거래 진행, 고객상담, 불만처리 등 민원 처리, 분쟁조정 해결을 위한 기록보존, 네이버 예약 이용 후 리뷰작성에 따른 네이버페이 포인트 지급 및 관련 안내<br/><br/> 3. 보관기간<br/> - 회원탈퇴 등
                                   개인정보 이용목적 달성 시까지 보관<br/> - 단, 상법 및 ‘전자상거래 등에서의 소비자 보호에 관한 법률’ 등 관련 법령에 의하여 일정 기간 보관이 필요한 경우에는 해당 기간 동안 보관함<br/><br/> 4. 동의 거부권 등에 대한 고지: 정보주체는 개인정보의 수집 및 이용 동의를 거부할 권리가 있으나, 이 경우 상품 및 서비스 예약이 제한될 수 있습니다.<br/>
                               </div>
                           </div>
       
                           {/* [D] 약관 보기 클릭 시 agreement에 open 클래스 추가 */}
                           <div
                               className="agreement">
                               <span className="chk_txt_span">
                                   <i className="spr_book ico_arr_ipc2">icon</i>
                                   <span>개인정보 제3자 제공 동의</span> 
                               </span>
                               <a 
                                   href="#"
                                   onClick={(e) => {
                                       e.preventDefault();
                                       agreementMoreHandler(2)}}
                                   value="btn_2" 
                                   className="btn_agreement">
                                   <span className="btn_text">보기</span>
                                   <i  
                                       ref={toggle_2}
                                       className="fn fn-down2"></i>
                               </a>
                               <div
                                   className="useragreement_details custom_details_wrap">
                                   <div className="custom_details">&lt;개인정보 제3자 제공 동의&gt;<br/><br/> 1. 개인정보를 제공받는 자 : 미디어앤아트<br/><br/> 2. 제공하는 개인정보 항목 : [필수] 네이버 아이디, 이름, 연락처 [선택] 이메일 주소<br/><br/> 3. 개인정보를 제공받는 자의 이용목적 : 사업자회원과 예약이용자의 원활한 거래 진행, 고객상담, 불만처리 등 민원 처리, 서비스 이용에 따른 설문조사 및 혜택 제공, 분쟁조정
                                       해결을 위한 기록보존<br/><br/> 4. 개인정보를 제공받는 자의 개인정보 보유 및 이용기간 : 개인정보 이용목적 달성 시 까지 보관합니다.<br/><br/> 5. 동의 거부권 등에 대한 고지 : 정보주체는 개인정보 제공 동의를 거부할 권리가 있으나, 이 경우 상품 및 서비스 예약이 제한될 수 있습니다.<br/>
                                   </div>
                               </div>
                           </div>
                       </div>
       
                       <div className="box_bk_btn">
                           {/* <!-- [D] 약관 전체 동의가 되면 disable 제거 --> */}
                           <div
                               ref={submitBtn} 
                               className={`bk_btn_wrap ${!(dirty && isValid && checked) ? 'disable' : ''}`}> 
                               <button 
                                   type="submit" 
                                   className="bk_btn"
                                   onClick={handleSubmit}
                                   disabled={!dirty && isValid}> 
                                   <i className="spr_book ico_naver_s">
                                   </i>  
                                   <span>예약하기</span>
                               </button> 
                           </div>
                       </div>
                    </FormContainer>
                );
            }}
        </Formik>
    );
};

export default withRouter(React.memo(TicketerInfo));