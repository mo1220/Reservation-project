import React, {useState } from 'react';
import styled from 'styled-components';

const CommentContainer = styled.div`
    max-width: 500px;
    padding: 10px;
    margin: 0 auto 8px;
    background-color: #fff;
`;

const Button = styled.a`
    display: block;
    width: 100%;
    height: 40px;
    margin: 0 auto;
    text-align: center;
    line-height: 2.5em;
    background: #f5f5f5;
    color: #000;
    border: 1px solid #e5e5e5;
`;

function CommentPage(props) {
    const averageScore = props.avgScore.toFixed(1);
    const comments = props.comments;
    const description = props.displayInfo.productDescription

    const [index, setIndex] = useState(3);
    const elements = [1,2,3,4,5];


    let comment = comments.slice(0, index);

   const timestampToDate = (timeStamp) => {
       var date = new Date(timeStamp);
    
       return date.toLocaleDateString('ko-KR')
   }

   const commentMore = () =>{
       setIndex(index+3);
   }

    return (
        <CommentContainer className="comment_container">
            <div className="summary" style={{borderBottom: '1px solid #efefef'}}>
                <h2>예매자 한줄평</h2>
                <div className="grade_wrap">
                    <ul id="container">
                        {
                            elements.map(value => {
                                return (
                                    <li 
                                        key={value} 
                                        data-value={value} 
                                        className={`star ${value <= averageScore ? 'rating' : 'default'}`}></li>
                                )
                            })
                        }
                    </ul>
                    {
                        comments.length > 0 ? 
                        <span className="avgScroe">{averageScore}</span> : 
                        <span className="avgScroe">0</span> 
                    }
                    <span> / </span>
                    <span>5.0</span>
                    <span className="total_comment"><strong>{comments.length}건</strong> 등록</span>
                </div>
            </div>
            <ul className="comment_wrap">
                {
                    comment && comment.map(comment  => {
                        return (
                            <li key={comment.commentId} className="commentItem">
                                <p><b>{description}</b></p>
                                <p>{comment.comment}</p>
                                <div className="etc_txt">
                                    <span className="etc score">{comment.score.toFixed(1)}</span>
                                    <span className="etc">|</span>
                                    <span className="etc">{comment.reservationEmail}</span>
                                    <span className="etc">|</span>
                                    <span className="etc">{timestampToDate(comment.reservationDate)} 방문</span>
                                </div>
                                {/* <img src={`${comment.commentImages && `/${comment.commentImages}`}`} alt="comment image" className="commentImg"/> */}
                            </li>
                        )
                    })
                }
            </ul>
            {
                comment.length !== comments.length &&
                <Button className="comment_more_btn" onClick={commentMore}>  
                    예매자 한줄평 더보기 →
                </Button>

            }
        </CommentContainer>
    );
}

export default React.memo(CommentPage);