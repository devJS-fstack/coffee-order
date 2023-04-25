import { CoffeeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ADD_CART_BTN } from "../../utils/variable"
import { categories } from "../../mock/category";
import { products } from "../../mock/product";


const CategoryProduct = () => {
    const [categoryCurr, setCategoryCurr] = useState(1);

    const handleOnClickCategory = (id: number) => setCategoryCurr(id);
    return (
        <div className="container-lg container-fluid">
            <div className="tch-box__body">
                <div className="tch-box__header tch-box__header-spacing">
                    <div className="tch-box__title flex justify-start items-center justify-content-md-center">
                        <span className="icon">
                            <CoffeeOutlined />
                        </span>
                        <span className="text">Categories</span>
                    </div>
                </div>
                <ul className="tch-category-card-list tch-category-card-list--spacing flex justify-content-md-center flex-xl-wrap flex-lg-wrap border-0">
                        {
                            categories.map(category => (
                                <li className="ml-2" key={category._id} onClick={(e) => { handleOnClickCategory(category._id) }}>
                                    <a className={`nav-link nav-link-category m-0 border-0 ${categoryCurr === category._id ? "active" : ""}`}>
                                        <div className="tch-category-card flex flex-col">
                                            <div className="flex justify-center items-center tch-category-card__image tch-category-card--circle">
                                                <img src={category.img}/>
                                            </div>
                                            <div className="tch-category-card__content">
                                                <h5 className="tch-category-card__title text-center mb-0">{category.name}</h5>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))
                        }
                </ul>
                <div className="tab-content">
                    <div>
                        <div className="row mb-4 mb-lg-5">
                            {
                                products.map((product, index) => (
                                    <div className="col-12 col-md-6 col-lg-3 col-xl-2 mt-2 mt-lg-3" key={index}>
                                        <div>
                                            <div className="tch-product__card flex flex-lg-column ml-0">
                                                <div className="tch-product__image tch-product--lg__image tch-product-img-border">
                                                    <img src={product.img} />
                                                </div>
                                                <div className="tch-product__content tch-product__content--mobile-padding flex flex-col">
                                                    <div className="tch-product__content__top mb-1 mb-lg-3">
                                                        <h4 className="tch-product-content__title mb-0">{product.name}</h4>
                                                    </div>
                                                    <div className="tch-product__content__footer flex justify-between items-center mt-auto">
                                                        <p className="mb-0">
                                                            <span className="block">{product.price}.000đ</span>
                                                        </p>
                                                        <div className="btn btn--orange-1 add-to-cart p-0">
                                                            <img src={ADD_CART_BTN} style={{ maxWidth: "none" }}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct