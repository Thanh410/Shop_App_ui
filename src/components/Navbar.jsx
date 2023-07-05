import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Tippy from "@tippyjs/react/headless";
import { logout } from "../redux/userSlice";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { locales } from "../i18n";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  cursor: pointer;
`;

const Input = styled.input`
  border: none;
  outline: none;

  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = ({ cat }) => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [active, setActive] = useState(false);
  const { i18n, t } = useTranslation("navbar");
  const currentLanguage = locales[i18n.language];
  const hanldeLogout = () => {
    dispatch(logout({ ...user }));
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setActive(true);
  };
  // Get products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat ? `/products?q=${searchValue}` : "/products"
        );
        setSearchResult(res.data);
      } catch (err) {}
    };
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>
            <span
              className={
                currentLanguage === "English"
                  ? "textLanguage active"
                  : "textLanguage"
              }
              onClick={() => changeLanguage("en")}
            >
              EN
            </span>
            |
            <span
              className={
                currentLanguage === "Tiếng Việt"
                  ? "textLanguage active"
                  : "textLanguage"
              }
              onClick={() => changeLanguage("vi")}
            >
              VI
            </span>
          </Language>
          <Tippy
            interactive
            visible={searchResult && searchValue.length > 0}
            placement="bottom-start"
            render={(attrs) => (
              <div className="searchBox" tabIndex="-1" {...attrs}>
                {searchResult.map((result, i) => (
                  <ul className="itemList" key={i}>
                    <Link to={"/"}>
                      <li className="item">{result.title}</li>
                    </Link>
                  </ul>
                ))}
              </div>
            )}
          >
            <SearchContainer>
              <Input
                placeholder="Search"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
          </Tippy>
        </Left>
        <Center>
          <Link to={"/"}>
            <Logo className="logo">LAMA</Logo>
          </Link>
        </Center>
        <Right>
          {user ? (
            <Tippy
              interactive
              placement="bottom-end"
              delay={[0, 500]}
              hideOnClick={false}
              render={(attrs) => (
                <div className="box" tabIndex="-1" {...attrs}>
                  <ul className="itemList">
                    <Link to={"/"}>
                      <li className="item">Tích điểm (thẻ VIP)</li>
                    </Link>
                    <Link to={"/"}>
                      <li className="item">Đơn hàng của tôi</li>
                    </Link>
                    <Link to={"/"}>
                      <li className="item">Sản phẩm đã xem</li>
                    </Link>
                    <Link onClick={hanldeLogout}>
                      <li className="item">Đăng xuất</li>
                    </Link>
                  </ul>
                </div>
              )}
            >
              <img src={user.img} className="avatar" alt={user.name} />
            </Tippy>
          ) : (
            <>
              <Link to={"/register"}>
                <MenuItem>{t("register")}</MenuItem>
              </Link>
              <Link to={"/login"}>
                <MenuItem>{t("login")}</MenuItem>
              </Link>
            </>
          )}
          <MenuItem>
            <Link to={"/cart"}>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
