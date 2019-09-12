import React from 'react'

import BtnWithDescription from '../BtnWithDescription'

const ShopInfo = props => {
  const {selectedShop, selectShop} = props

  return (
    <section className="shop-info">
      <div className="shop-title-bar">
        <div className="shop-title">
          <h3>選擇取貨門市</h3>
          <img src="./img/logo_family.png" alt="family mart"/>
        </div>
        <div className="shop-select">
          <div className="dropdown-menu">
            <BtnWithDescription
              content="選擇取貨門市"
              className="font-color-light"
              img="./img/icon_add.svg"
              />
          </div>
          <div className="dropdown-menu fav-shop">
            <div
              className="dropdown-item"
              onClick={e => selectShop(e)}
            >
              <ul
                className="inner"

              >
                <li>
                  <h4>南山</h4>
                  <p>台北市大安區復興路999段99號1巷</p>
                </li>
                <li>
                  <h4>台北車站</h4>
                  <p>台北市大安區復興路999段99號1巷</p>
                </li>
                <li>
                  <h4>京站</h4>
                  <p>台北市大安區復興路999段99號1巷</p>
                </li>
              </ul>

            </div>
            <BtnWithDescription
              content="選擇常用門市"
              className="font-color-primary"
              img="./img/icon_like.svg"
              />
          </div>
        </div>
      </div>
      <div className="shop-detail">
        <div className="shop-name">
          <p>取貨店名</p>
          <p>{selectedShop.name}</p>
          <div className="shop-save">
            <img src="./img/icon_star.svg" alt="save" />
            儲存至常用門市
          </div>
        </div>
        <div className="shop-address">
          <p>取貨地址</p>
          <p>{selectedShop.address}</p>
        </div>
      </div>
    </section>
  )
}

export default ShopInfo
