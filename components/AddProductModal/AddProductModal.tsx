import { Input, Modal, Radio } from "antd";
import { useState, Dispatch, SetStateAction, useRef, useEffect } from "react";
import { ADD_CART_BTN, MINUS_CART_BTN, NOTE_ICON } from "../../utils/variable";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/authSlice";
import { useRouter } from "next/router";
import { useProductQuery } from "../../apis/product";
import CustomSpin from "../Spin";
import { isEmpty, sumBy, toNumber } from "lodash";
import { IResponseProductOrder } from "../../apis/order";

const AddProductModal = ({ 
    isOpen,
    setIsOpen,
    isEdit = true,
    productId = 1,
    productOrder
 }: { 
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    isEdit?: boolean;
    productId?: number;
    productOrder?: IResponseProductOrder
}) => {
    const scrollRef = useRef(null);
    const currentUser = useSelector(selectCurrentUser);
    
    const handleCancel = () => {
        setIsOpen(false);
    };

    const { scrollToTop } = scrollRef.current || {} as any;
    if (scrollToTop && !isOpen) {
        scrollToTop();
    }

    const { data: dataProduct, isFetching } = useProductQuery(productId);
    const product = dataProduct?.product;
    const toppings = dataProduct?.toppings;
    const sizes = dataProduct?.sizes;
    const [objectQuantity, setObjectQuantity] = useState({
        enabledMinus: (productOrder?.quantity || 0) > 1,
        enabledPlus: (productOrder?.quantity || 0) < 10,
        quantity: productOrder?.quantity || 1,
    });
    
    const [sizeId, setSizeId] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(product?.price || 0);
    const handleMinusQuantity = (e: any) => {
        const isEnabled = e.target.parentElement.className.includes("active") || e.target.className.includes("active");
        if (isEnabled){
            const newObjectQuantity = {
                quantity: objectQuantity.quantity - 1,
                enabledMinus: true,
                enabledPlus: true,
            }
            if (newObjectQuantity.quantity === 1){
                newObjectQuantity.enabledMinus = false;
            }

            setObjectQuantity(newObjectQuantity);
            setTotalQuantity((pre) => pre -= product?.price || 0);
        }
    }

    const handlePlusQuantity = (e: any) => {
        const isEnabled = e.target.parentElement.className.includes("active") || e.target.className.includes("active");
        if (isEnabled){
            const newObjectQuantity = {
                quantity: objectQuantity.quantity + 1,
                enabledMinus: true,
                enabledPlus: true,
            }
            if (newObjectQuantity.quantity === 10){
                newObjectQuantity.enabledPlus = false;
            }

            setObjectQuantity(newObjectQuantity);
            setTotalQuantity((pre) => pre += product?.price || 0);
        }
    }


    const [objToppingQuantity, setObjToppingQuantity] = useState({} as any);

    useEffect(() => {
        const toppingsMapped: any = (toppings || []).reduce((acc, topping) => {
            const toppingOrder = productOrder?.toppings.find(element => element.toppingId === topping.id);
            return {
                ...acc,
                [`${topping.id}quantity`]: toppingOrder?.quantity || 0,
                [`${topping.id}enabledMinus`]: (toppingOrder?.quantity || 0) > 0,
                [`${topping.id}enabledPlus`]: (toppingOrder?.quantity || 0) < 2,
            }
        }, {});

        setObjToppingQuantity(toppingsMapped);
        setTotalQuantity(product?.price || 0);
        setSizeId(sizes?.find((size) => size.price === 0)?.id || 0);
    }, [toppings, product, sizes])

    const handleMinusToppingQuantity = (e: any, id: number) => {
        const isDisabled = e.target.parentElement.className.includes("hide") || e.target.className.includes("hide");
        if (!isDisabled){
            const newObjectQuantity = {
                ...objToppingQuantity,
                [`${id}quantity`]: objToppingQuantity[`${id}quantity`] - 1,
                [`${id}enabledMinus`]: true,
                [`${id}enabledPlus`]: true,
            }
            if (newObjectQuantity[`${id}quantity`] === 0){
                newObjectQuantity[`${id}enabledMinus`] = false;
            }

            setObjToppingQuantity(newObjectQuantity);
            setTotalQuantity((pre) => pre -= toppings?.find(topping => topping.id === id)?.price || 0)
        }
    }

    const handlePlusToppingQuantity = (e: any, id: number) => {
        const isDisabled = e.target.parentElement.className.includes("cursor-not-allowed") || e.target.className.includes("cursor-not-allowed");
        if (!isDisabled){
            const newObjectQuantity = {
                ...objToppingQuantity,
                [`${id}quantity`]: objToppingQuantity[`${id}quantity`] + 1,
                [`${id}enabledMinus`]: true,
                [`${id}enabledPlus`]: true,
            }
            if (newObjectQuantity[`${id}quantity`] === 2){
                newObjectQuantity[`${id}enabledPlus`] = false;
            }

            setObjToppingQuantity(newObjectQuantity);
            setTotalQuantity((pre) => pre += toppings?.find(topping => topping.id === id)?.price || 0)
        }
    }

    useEffect(() => {
        const toppingsMapped: any = (toppings || []).reduce((acc, topping) => {
            const toppingOrder = productOrder?.toppings.find(element => element.toppingId === topping.id);
            return {
                ...acc,
                [`${topping.id}quantity`]: toppingOrder?.quantity || 0,
                [`${topping.id}enabledMinus`]: (toppingOrder?.quantity || 0) > 0,
                [`${topping.id}enabledPlus`]: (toppingOrder?.quantity || 0) < 2,
            }
        }, {});
        setObjToppingQuantity(toppingsMapped);
        setObjectQuantity({
            enabledMinus: (productOrder?.quantity || 0) > 1,
            enabledPlus: (productOrder?.quantity || 0) < 10,
            quantity: productOrder?.quantity || 1,
        });
        setSizeId(productOrder?.sizeId || 0);
        setTotalQuantity((productOrder?.totalPrice || 0) + sumBy(productOrder?.toppings, "totalPrice"))
    }, [productOrder, isOpen])

    const handleOnChangeSize = (value: number) => {
        const preSize = sizes?.find(size => size.id === sizeId);
        const currentSize = sizes?.find(size => size.id === value);
        setTotalQuantity(pre => {
            const price = pre - (preSize?.price || 0) + (currentSize?.price || 0)
            return price;
        });
        setSizeId(value);
    }
    const router = useRouter();

    const handleOnOk = () => {
        if (isEmpty(currentUser)) {
            const toppingIds = Object.keys(objToppingQuantity).filter(
                key => key.includes("quantity") && objToppingQuantity[key]
            )
            const toppings = toppingIds.map(key => ({
                toppingId: toNumber(key.replace("quantity", "")),
                quantity: toNumber(objToppingQuantity[key]),
            }));
            const orderInfo = {
                productId: productId,
                quantity: objectQuantity.quantity,
                sizeId: sizeId,
                toppings
            };
            sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));
            router.push("/sign-in");
        }
    }

    return (
        <Modal title={`${isEdit ? "Edit Order": "Add Drink"}`}
            width={"430px"}
            open={isOpen} onOk={handleOnOk}
            onCancel={handleCancel}
            okButtonProps={{ typeof: "submit", style: { backgroundColor: "var(--orange-4)", display: isFetching ? "none" : "inline"  } }}
            okText={`${isEdit ? `${totalQuantity} $ - Save changes`: `${totalQuantity} $ - Add to cart`}`}
            cancelButtonProps={{ style: { backgroundColor: "transparent" } }}
            
        >
            {
                isFetching ? <CustomSpin/>
                :
                <Scrollbars ref={scrollRef} renderThumbHorizontal={() => <div></div>} autoHide style={{ height: 500 }}>
                    <div>
                        <div className="flex">
                            <div className="tch-product__image card-product-info-image relative">
                                <img className="card-product-info-image" src={product?.favIcon}/>
                            </div>
                            <div className="card-product-detail flex">
                                <span className="card-product-name">
                                    {product?.nameProduct}
                                </span>
                                <span className="card-product-description">
                                    {product?.description || "There is no description available"}
                                </span>
                                <div className="card-product-footer flex">
                                    <span className="card-product-price">{product?.price}$</span>
                                    <div className="card-product-quantity-config flex items-center justify-evenly" style={{ width: "140px" }}>
                                        <div onClick={(e) => { handleMinusQuantity(e) }} className={`minus-quantity card-product-decrease btn btn--orange-1 quantity-product add-to-cart ${objectQuantity.enabledMinus ? "active" : ""}`} style={{ padding: 0 }}>
                                            <img src={MINUS_CART_BTN}/>
                                        </div>
                                        <span className="card-product-quantity">{objectQuantity.quantity}</span>
                                        <div onClick={(e) => { handlePlusQuantity(e) }} className={`plus-quantity ard-product-decrease btn btn--orange-1 quantity-product add-to-cart p-0 ${objectQuantity.enabledPlus ? "active" : ""}`} style={{ padding: 0 }}>
                                            <img src={ADD_CART_BTN}/>
                                        </div>
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
                            <div className="card-product-option">
                                <span className="card-product-option-text">Choose Size (Required)</span>
                            </div>
                            <div className="justify-between card-product-option-size-item items-center flex mt-4">
                                {
                                    <Radio.Group value={sizeId} onChange={(value) => { handleOnChangeSize(value.target.value) }}>
                                    {
                                        sizes?.map(size => (
                                            <Radio className="card-product-option-item" key={size.id} value={size.id}>
                                                <div className="flex flex-col justify-center">
                                                    <span>{size.size}</span>
                                                    <span>+ {size.price}$</span>
                                                </div>
                                            </Radio>
                                        ))
                                    }
                                    </Radio.Group>
                                }
                            </div>
                        </section>

                        <section className="card-product-topping">
                            <div className="card-product-option">
                                <span className="card-product-option-text">Choose Topping (Optional)</span>
                            </div>
                            <div className="card-product-option-topping-item">
                                {
                                    (toppings || []).map(topping => (
                                        <div className="card-product-option-topping flex" key={topping.id}>
                                            <div className="flex flex-col">
                                                <span className="card-product-option-topping-name">{topping.nameTopping}</span>
                                                <span className="card-product-option-topping-price">+ {topping.price} $</span>
                                            </div>
                                            <div className="card-product-quantity-config flex items-center">
                                                <div onClick={(e) => { handleMinusToppingQuantity(e, topping.id) }} className={`quantity-extra flex justify-center items-center cursor-pointer ${objToppingQuantity[`${topping.id}enabledMinus`] ? "" : "hide"}`}>
                                                    <div className="decrease"></div>
                                                </div>
                                                <span className="card-product-quantity extra">{objToppingQuantity[`${topping.id}quantity`]}</span>
                                                <div onClick={(e) => { handlePlusToppingQuantity(e, topping.id) }} className={`quantity-extra flex justify-center items-center cursor-pointer ${objToppingQuantity[`${topping.id}enabledPlus`] ? "" : "cursor-not-allowed"}`}>
                                                    <div className="increase"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </section>
                    </div>
                </Scrollbars>
            }
        </Modal>
    )
}

export default AddProductModal;