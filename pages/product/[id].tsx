import { Image, Radio, Input, Spin } from "antd";
import { ADD_CART_BTN, MINUS_CART_BTN, NOTE_ICON } from "../../utils/variable";
import { useRouter } from "next/router";
import { useProductQuery } from "../../apis/product";
import { toNumber } from "lodash";

export default function ProductPage() {
    const router = useRouter();
    const { id = 1 } = router.query;
    const { data: product, isLoading } = useProductQuery(id);

    return (
        <>
            {
                isLoading
                ? 
                <div className="flex justify-center items-center w-full h-screen">
                    <Spin />
                </div> :
                <div className="product-detail-page" style={{ marginRight: "auto", marginLeft: "auto" }}>
                    <div className="left-cols">
                        <div className="container">
                            <div className="row items-center">
                                <Image src={product?.favIcon}/>
                            </div>
                        </div>
                        <div className="card-product-description mt-12">
                            {product?.description || "There is no description available"}
                        </div>
                    </div>
                    <div className="right-cols">
                        <div>
                            <div className="card-product-detail flex">
                                <span className="card-product-name" style={{ fontSize: "var(--space-30)", lineHeight: "var(--space-32)" }}>
                                    {product?.nameProduct}
                                </span>
                                <div className="card-product-footer flex">
                                    <span className="card-product-price">{product?.price} $</span>
                                    <div className="card-product-quantity-config flex items-center justify-evenly" style={{ width: "140px" }}>
                                        <div className="card-product-decrease btn btn--orange-1 quantity-product add-to-cart" style={{ padding: 0 }}>
                                            <img src={MINUS_CART_BTN}/>
                                        </div>
                                        <span className="card-product-quantity">1</span>
                                        <div className="card-product-decrease btn btn--orange-1 quantity-product add-to-cart p-0 active" style={{ padding: 0 }}>
                                            <img src={ADD_CART_BTN}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section className="card-product-note">
                                <div className="card-product-note-item">
                                    <img src={NOTE_ICON} className="card-product-note-icon"/>
                                    <Input placeholder="Note for your order" className="card-product-text"/>
                                </div>
                            </section>
                            <section className="card-product-size">
                                <div className="card-product-option" style={{ marginLeft: 0, width: "100%" }}>
                                    <span className="card-product-option-text">Choose Size (Required)</span>
                                </div>
                                <div className="justify-between card-product-option-size-item items-center flex mt-4">
                                    <Radio.Group>
                                        <Radio className="card-product-option-item" value={1}>
                                            <div className="flex flex-col justify-center">
                                                <span>Large</span>
                                                <span>+ 20$</span>
                                            </div>
                                        </Radio>
                                        <Radio className="card-product-option-item" value={2}>
                                            <div className="flex flex-col justify-center">
                                                <span>Medium</span>
                                                <span>+ 15$</span>
                                            </div>
                                        </Radio>
                                        <Radio className="card-product-option-item" value={3}>
                                            <div className="flex flex-col justify-center">
                                                <span>Small</span>
                                                <span>+ 10$</span>
                                            </div>
                                        </Radio>
                                    </Radio.Group>
                                </div>
                            </section>

                            <section className="card-product-topping">
                                <div className="card-product-option" style={{ marginLeft: 0, width: "100%" }}>
                                    <span className="card-product-option-text">Choose Topping (Optional)</span>
                                </div>
                                <div className="card-product-option-topping-item">
                                    <div className="card-product-option-topping flex">
                                        <div className="flex flex-col">
                                            <span className="card-product-option-topping-name">Lychee</span>
                                            <span className="card-product-option-topping-price">+ 10$</span>
                                        </div>
                                        <div className="card-product-quantity-config flex items-center">
                                            <div className="quantity-extra flex justify-center items-center cursor-pointer hide">
                                                <div className="decrease"></div>
                                            </div>
                                            <span className="card-product-quantity extra">0</span>
                                            <div className="quantity-extra flex justify-center items-center cursor-pointer">
                                                <div className="increase"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-product-option-topping flex">
                                        <div className="flex flex-col">
                                            <span className="card-product-option-topping-name">Lychee</span>
                                            <span className="card-product-option-topping-price">+ 10$</span>
                                        </div>
                                        <div className="card-product-quantity-config flex items-center">
                                            <div className="quantity-extra flex justify-center items-center cursor-pointer hide">
                                                <div className="decrease"></div>
                                            </div>
                                            <span className="card-product-quantity extra">0</span>
                                            <div className="quantity-extra flex justify-center items-center cursor-pointer">
                                                <div className="increase"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-product-option-topping flex">
                                        <div className="flex flex-col">
                                            <span className="card-product-option-topping-name">Lychee</span>
                                            <span className="card-product-option-topping-price">+ 10$</span>
                                        </div>
                                        <div className="card-product-quantity-config flex items-center">
                                            <div className="quantity-extra flex justify-center items-center cursor-pointer hide">
                                                <div className="decrease"></div>
                                            </div>
                                            <span className="card-product-quantity extra">0</span>
                                            <div className="quantity-extra flex justify-center items-center cursor-pointer">
                                                <div className="increase"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-product-option-topping flex">
                                        <div className="flex flex-col">
                                            <span className="card-product-option-topping-name">Lychee</span>
                                            <span className="card-product-option-topping-price">+ 10$</span>
                                        </div>
                                        <div className="card-product-quantity-config flex items-center">
                                            <div className="quantity-extra flex justify-center items-center cursor-pointer hide">
                                                <div className="decrease"></div>
                                            </div>
                                            <span className="card-product-quantity extra">0</span>
                                            <div className="quantity-extra flex justify-center items-center cursor-pointer">
                                                <div className="increase"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-product-option-topping flex">
                                        <div className="flex flex-col">
                                            <span className="card-product-option-topping-name">Lychee</span>
                                            <span className="card-product-option-topping-price">+ 10$</span>
                                        </div>
                                        <div className="card-product-quantity-config flex items-center">
                                            <div className="quantity-extra flex justify-center items-center cursor-pointer hide">
                                                <div className="decrease"></div>
                                            </div>
                                            <span className="card-product-quantity extra">0</span>
                                            <div className="quantity-extra flex justify-center items-center cursor-pointer">
                                                <div className="increase"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
        </div>
            }
        </>
    )
}
