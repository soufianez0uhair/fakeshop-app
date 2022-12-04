import Menu from "./Menu";

const Header = () => {

    return (
        <header className="header" >
            <div className="logo">
                <h1>FakeShop</h1>
            </div>
            <div className="header__menu">
                <Menu />
                
            </div>
        </header>
    )
}

export default Header;