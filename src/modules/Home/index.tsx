import React from 'react'
import s from './style.module.scss'
import ProductList from './ProductList'

const HomeModule = (): React.ReactElement => {
  return (
    <div className={s.hompage}>
      <div className={`${s.container} container`}>
        <h1>Lastest Product</h1>
       <ProductList/>
      </div>
    </div>
  )
}

export default HomeModule