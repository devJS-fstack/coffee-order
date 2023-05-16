import { Pagination, Spin } from "antd";
import { CoffeeOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { ADD_CART_BTN } from "../../utils/variable"
// import { products } from "../../mock/product";
import { useCategoriesQuery } from "../../apis/category";
import { useProductsQuery } from "../../apis/product";
import { useRouter } from "next/router";
import AddProductModal from "../AddProductModal/AddProductModal";

const CategoryProduct = () => {
    const router = useRouter();
    const [categoryCurr, setCategoryCurr] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [productId, setProductId] = useState(1);
    const [isNewLoadingProduct, setLoadingProduct] = useState(true);
    const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
    const { data: categories, isLoading: isLoadingCategory } = useCategoriesQuery({});
    const { data: dataProducts, isLoading: isLoadingProduct } = useProductsQuery({ categoryId: categoryCurr, pageNumber });
    const products = dataProducts?.products;
    const total = dataProducts?.total;

    const handleOnClickCategory = (id: number) => {
        setCategoryCurr(id);
    };

    useEffect(() => {
        setLoadingProduct(true);
        setPageNumber(1);
    }, [categoryCurr]);

    useEffect(() => {
        setLoadingProduct(true);
    }, [pageNumber]);

   useEffect(() => {
        if (products) {
            setLoadingProduct(false);
        }
    }, [products]);

    const handleOnChangePage = (pageNumber: number) => {
        setPageNumber(pageNumber);
    }

    const handleOnClickProduct = (id: number) => {
        router.push(`/product/${id}`);
    }

    const handleAddCart = (productId: number) => {
        setProductId(productId);
        setIsOpenAddProduct(true);
    }


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
                            !isLoadingCategory ? (categories ?? []).map((category) => (
                                <li className="ml-2" key={category.id} onClick={(e) => { handleOnClickCategory(category.id) }}>
                                    <a className={`nav-link nav-link-category m-0 border-0 ${categoryCurr === category.id ? "active" : ""}`}>
                                        <div className="tch-category-card flex flex-col">
                                            <div className="flex justify-center items-center tch-category-card__image tch-category-card--circle">
                                                <img src={category.favIcon}/>
                                            </div>
                                            <div className="tch-category-card__content">
                                                <h5 className="tch-category-card__title text-center mb-0">{category.nameCategory}</h5>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            )) : <Spin/>
                        }
                </ul>
                {
                    isNewLoadingProduct ? 
                    <div className="text-center">
                        <Spin/>
                    </div> : 
                    <div className="tab-content">
                        <div>
                            <div className="row mb-4 mb-lg-5">
                                {
                                    (products || []).map((product) => (
                                        <div className="col-12 col-md-6 col-lg-3 col-xl-2 mt-2 mt-lg-3" key={product.id}>
                                            <div>
                                                <div className="tch-product__card flex flex-lg-column ml-0">
                                                    <div className="tch-product__image tch-product--lg__image tch-product-img-border">
                                                        <img className="cursor-pointer" src={product.favIcon} onClick={(e) => handleOnClickProduct(product.id)}/>
                                                    </div>
                                                    <div className="tch-product__content tch-product__content--mobile-padding flex flex-col">
                                                        <div className="tch-product__content__top mb-1 mb-lg-3 cursor-pointer" onClick={(e) => handleOnClickProduct(product.id)}>
                                                            <h4 className="tch-product-content__title mb-0">{product.nameProduct}</h4>
                                                        </div>
                                                        <div className="tch-product__content__footer flex justify-between items-center mt-auto">
                                                            <p className="mb-0">
                                                                <span className="block">{product.price} $</span>
                                                            </p>
                                                            <div className="btn btn--orange-1 add-to-cart p-0" onClick={() => { handleAddCart(product.id) }}>
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
                        { total ? <Pagination onChange={(page) => { handleOnChangePage(page) }} current={pageNumber} style={{ textAlign: "center" }} total={total}/> : <></>}
                    </div>
                }
            </div>
            <AddProductModal productId={productId} isOpen={isOpenAddProduct} setIsOpen={setIsOpenAddProduct} isEdit={false}/>
        </div>
    )
}

export default CategoryProduct