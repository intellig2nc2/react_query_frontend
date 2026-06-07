// SiderBar.jsx

import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

const SiderBar = () => {

    const [open, setOpen] = useState(false)
    const [salesOpen, setSalesOpen] = useState(false)
    const location = useLocation()

  return (
    <>

        {/* 모바일 상단 바 */}
        <MobileTopBar>

            <MenuButton
                onClick={() => setOpen(!open)}
            >
                ☰
            </MenuButton>

            <MobileLogo>
                MySystem
            </MobileLogo>

        </MobileTopBar>

        {/* 사이드바 */}
        <Container $open={open}>

            <Menu>

                <MenuItem
                    to="/"
                    $active={location.pathname === "/"}
                    onClick={() => setOpen(false)}
                >
                    Home
                </MenuItem>

                <MenuItem
                    to="/todo"
                    $active={location.pathname === "/todo"}
                    onClick={() => setOpen(false)}
                >
                    할일
                </MenuItem>

                <MenuItem
                    to="/employee"
                    $active={location.pathname === "/employee"}
                    onClick={() => setOpen(false)}
                >
                    고용인 정보
                </MenuItem>
                <MenuWrapper>
                    <MenuItemButton
                        $active={salesOpen}
                        as="div"
                        onClick={() => setSalesOpen(prev => !prev)}
                    >
                        <span>판매 관리 ▼</span>
                        {salesOpen ? <MdExpandLess/> : <MdExpandMore/>}
                    </MenuItemButton>
                </MenuWrapper>
                {salesOpen && (
                    <SubMenu>
                        <SubMenuItem
                            to="/product"
                            $active={location.pathname === "/product"}
                            onClick={() => setOpen(false)}
                        >
                            상품 정보
                        </SubMenuItem>
                        <SubMenuItem
                            to="/sales"
                            $active={location.pathname === "/sales"}
                            onClick={() => setOpen(false)}
                        >
                            판매 정보
                        </SubMenuItem>

                    </SubMenu>
                    
                )}
                

            </Menu>

        </Container>

    </>
  )
}

export default SiderBar

const MenuWrapper = styled.div`
    width: 100%;
`

const MenuItemButton = styled.button`
    width: 100%;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 14px 18px;
    font-size: 15px;
    font-weight: 600;

    color: ${({ $active }) =>
        $active ? "white" : "#cbd5e1"};

    background: ${({ $active }) =>
        $active ? "#3b82f6" : "transparent"};



    reansition: all 025s ease;
    &:hover {
        background: ${({$active}) =>
            $active ? "#0958d9" : "#fff"
        }
    }
    svg{
        font-size: 22px;
        transition: transform 0.25s ease;
    }
`
const SubMenu = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-top: 6px;
`
const SubMenuItem = styled(Link)`
    padding: 12px; 16px;
    text-decoration: none;
    border-radius: 8px;
    margin-top: 6px;
    color: ${({$active}) =>
        $active ? "#1677ff" : "#555"};
    background: ${({$active}) =>
        $active ? "#e6f4ff" : "transparent"};
    transition: all 0.25s ease;

    &:hover{
        background: #f5f5f5;
    }
`;


const MobileTopBar = styled.div`

    display: none;

    @media (max-width: 768px){

        width: 100%;
        height: 60px;

        background: #1e293b;

        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 0 16px;

        position: fixed;

        top: 0;
        left: 0;

        z-index: 1000;
    }
`;

const MenuButton = styled.button`

    border: none;
    background: transparent;

    color: white;

    font-size: 28px;

    cursor: pointer;
`;

const MobileLogo = styled.div`

    color: white;

    font-size: 20px;
    font-weight: bold;
`;

const Container = styled.aside`

    width: 240px;

    min-height: calc(100vh - 70px);

    background: #1e293b;

    padding: 24px 16px;

    transition: 0.3s;

    @media (max-width: 768px){

        position: fixed;

        top: 60px;

        left: ${({ $open }) => ($open ? "0" : "-100%")};

        width: 240px;

        height: calc(100vh - 60px);

        overflow-y: auto;

        z-index: 999;
    }
`;

const Menu = styled.nav`

    display: flex;
    flex-direction: column;

    gap: 12px;
`;

const MenuItem = styled(Link)`

    text-decoration: none;

    padding: 14px 18px;

    border-radius: 10px;

    color: ${({ $active }) =>
        $active ? "white" : "#cbd5e1"};

    background: ${({ $active }) =>
        $active ? "#3b82f6" : "transparent"};

    font-size: 16px;
    font-weight: 500;

    transition: 0.2s;

    &:hover{
        background: #334155;
        color: white;
    }
`;