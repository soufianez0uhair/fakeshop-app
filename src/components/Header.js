import { useState } from "react";

import Menu from "./Menu";

import {AiOutlineMenu} from 'react-icons/ai';
import {GrFormClose} from 'react-icons/gr';

const Header = () => {
    const [isShow, setIsShow] = useState(false);

    console.log(isShow);
    return (
        <header className="header" >
            <div className="header__logo">
                <div className="logo">
                    <h1>FakeShop</h1>
                </div>
                {!isShow ? <AiOutlineMenu onClick={() => setIsShow(!isShow)} className="icon icon--menu" /> : <GrFormClose onClick={() => setIsShow(!isShow)} className="icon icon--menu" />}
            </div>
            <div style={{top: isShow ? '8.26rem' : 'calc(-100vh + 7.96rem)'}} className="header__menu">
                <Menu />
            </div>
        </header>
    )
}

export default Header;