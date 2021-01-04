import React from 'react'
import {Icon} from 'antd';
import styled from 'styled-components';

const Link = styled.a`
    display: block;
    width: 100%;
    height: 80px;
    line-height: 2.5rem;
    text-align: center;
    color: #000;
    margin-top: 20px;
`;

function Footer() {
    return (
            <div style={{
                background: '#f0f0f0',
                height: '80px', 
                display: 'flex',
                flexDirection: 'column', 
                width: '100%',
                fontSize:'1rem',
                justifyContent: 'center', 
                alignItems: 'center'
            }}>
            <Link href="#top" className="top">↑ TOP</Link>                
            <p> Happy Coding  <Icon type="smile" /></p>
        </div>

    )
}

export default Footer
