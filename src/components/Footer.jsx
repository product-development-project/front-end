import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-bottom: 0px;
`;

const LinkContainer = styled.div`
    padding-bottom: 5px;    
    
    &:hover {
    transform: scale(1.1);
    border-top: 3px solid #ffffff;
    
    }
`;

const Link = styled.a`
    width: 120px;
    padding-bottom: 5px;
    transition: all 0.2s ease-in-out;
    font-size: 18px;
    color: white;

    &:hover {
      transform: scale(1.1);

      margin-left: 10px;
      margin-right: 10px;
      cursor: pointer;
      font-size: 20px;
    }
`;

export default function Footer(props) {
  const scrollToSection = (sectionRef, event) => {
    event.preventDefault();
    window.scrollTo({
      top: sectionRef.current.offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <FooterContainer style={{ background: 'rgb(25,57,118)', background: 'linear-gradient(112deg, rgba(25,57,118,1) 0%, rgba(56,84,137,1) 99%)', borderTop: '4px solid white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
        <LinkContainer>
          <Link onClick={(event) => scrollToSection(props.sectionRefs[0], event)}>
            Back to top
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link onClick={(event) => scrollToSection(props.sectionRefs[1], event)}>
            FAQ
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link onClick={(event) => scrollToSection(props.sectionRefs[2], event)}>
            Contacts
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link onClick={(event) => scrollToSection(props.sectionRefs[3], event)}>
            Help
          </Link>
        </LinkContainer>
      </div>
    </FooterContainer>
  );
};