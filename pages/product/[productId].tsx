import { Image, Radio, Input, Spin } from "antd";
import { ADD_CART_BTN, MINUS_CART_BTN, NOTE_ICON } from "../../utils/variable";
import { useRouter } from "next/router";
import { useProductQuery } from "../../apis/product";
import { useState, useEffect } from "react";
import { selectCurrentUser } from "../../auth/authSlice";
import { useSelector } from "react-redux";
import { isEmpty, toNumber } from "lodash";
import { useAddOrderMutation } from "../../apis/order";

export default function ProductPage() {
    const currentUser = useSelector(selectCurrentUser);
    const router = useRouter();
    const { productId = 1 } = router.query;
    const { data: dataProduct, isLoading } = useProductQuery(productId);
    const [addOrder] = useAddOrderMutation();
    const product = dataProduct?.product;
    const toppings = dataProduct?.toppings;
    const sizes = dataProduct?.sizes;
    const [objectQuantity, setObjectQuantity] = useState({
        enabledMinus: false,
        enabledPlus: true,
        quantity: 1,
    });
    const [sizeId, setSizeId] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleMinusQuantity = (e: any) => {
        const isEnabled =
            e.target.parentElement.className.includes("active") ||
            e.target.className.includes("active");
        if (isEnabled) {
            const newObjectQuantity = {
                quantity: objectQuantity.quantity - 1,
                enabledMinus: true,
                enabledPlus: true,
            };
            if (newObjectQuantity.quantity === 1) {
                newObjectQuantity.enabledMinus = false;
            }
            const totalPriceTopping = toppings?.reduce((acc, topping) => {
                return (acc +=
                    objToppingQuantity[`${topping.id}quantity`] *
                    topping.price);
            }, 0);
            const sizePick = sizes?.find((size) => size.id === sizeId);
            const newTotal =
                totalPrice -
                (product?.price || 0) -
                (sizePick?.price || 0) -
                (totalPriceTopping || 0);

            setObjectQuantity(newObjectQuantity);
            setTotalPrice(newTotal);
        }
    };

    const handlePlusQuantity = (e: any) => {
        const isEnabled =
            e.target.parentElement.className.includes("active") ||
            e.target.className.includes("active");
        if (isEnabled) {
            const newObjectQuantity = {
                quantity: objectQuantity.quantity + 1,
                enabledMinus: true,
                enabledPlus: true,
            };
            if (newObjectQuantity.quantity === 10) {
                newObjectQuantity.enabledPlus = false;
            }

            const totalPriceTopping = toppings?.reduce((acc, topping) => {
                return (acc +=
                    objToppingQuantity[`${topping.id}quantity`] *
                    topping.price);
            }, 0);
            const sizePick = sizes?.find((size) => size.id === sizeId);
            const newTotal =
                totalPrice +
                (product?.price || 0) +
                (sizePick?.price || 0) +
                (totalPriceTopping || 0);
            setObjectQuantity(newObjectQuantity);
            setTotalPrice(newTotal);
        }
    };

    const [objToppingQuantity, setObjToppingQuantity] = useState({} as any);

    useEffect(() => {
        const toppingsMapped: any = (toppings || []).reduce((acc, topping) => {
            return {
                ...acc,
                [`${topping.id}quantity`]: 0,
                [`${topping.id}enabledMinus`]: false,
                [`${topping.id}enabledPlus`]: true,
            };
        }, {});

        setObjToppingQuantity(toppingsMapped);
        setSizeId(sizes?.find((size) => size.price === 0)?.id || 0);
        setTotalPrice(product?.price || 0);
    }, [toppings, product, sizes]);

    const handleMinusToppingQuantity = (e: any, id: number) => {
        const isDisabled =
            e.target.parentElement.className.includes("hide") ||
            e.target.className.includes("hide");
        if (!isDisabled) {
            const newObjectQuantity = {
                ...objToppingQuantity,
                [`${id}quantity`]: objToppingQuantity[`${id}quantity`] - 1,
                [`${id}enabledMinus`]: true,
                [`${id}enabledPlus`]: true,
            };
            if (newObjectQuantity[`${id}quantity`] === 0) {
                newObjectQuantity[`${id}enabledMinus`] = false;
            }

            setObjToppingQuantity(newObjectQuantity);
            const priceTopping =
                toppings?.find((topping) => topping.id === id)?.price || 0;
            const newTotal =
                totalPrice - priceTopping * objectQuantity.quantity;
            setTotalPrice(newTotal);
        }
    };

    const handlePlusToppingQuantity = (e: any, id: number) => {
        const isDisabled =
            e.target.parentElement.className.includes("cursor-not-allowed") ||
            e.target.className.includes("cursor-not-allowed");
        if (!isDisabled) {
            const newObjectQuantity = {
                ...objToppingQuantity,
                [`${id}quantity`]: objToppingQuantity[`${id}quantity`] + 1,
                [`${id}enabledMinus`]: true,
                [`${id}enabledPlus`]: true,
            };
            if (newObjectQuantity[`${id}quantity`] === 2) {
                newObjectQuantity[`${id}enabledPlus`] = false;
            }

            setObjToppingQuantity(newObjectQuantity);
            const priceTopping =
                toppings?.find((topping) => topping.id === id)?.price || 0;
            const newTotal =
                totalPrice + priceTopping * objectQuantity.quantity;
            setTotalPrice(newTotal);
        }
    };

    const handleOnChangeSize = (value: number) => {
        const preSize = sizes?.find((size) => size.id === sizeId);
        const currentSize = sizes?.find((size) => size.id === value);
        const newTotal =
            totalPrice -
            (preSize?.price || 0) * objectQuantity.quantity +
            (currentSize?.price || 0) * objectQuantity.quantity;
        setTotalPrice(newTotal);
        setSizeId(value);
    };

    const handleOnSubmitCart = async () => {
        const toppingIds = Object.keys(objToppingQuantity).filter(
            (key) => key.includes("quantity") && objToppingQuantity[key],
        );
        const toppings = toppingIds.map((key) => ({
            toppingId: toNumber(key.replace("quantity", "")),
            quantity: toNumber(objToppingQuantity[key]),
        }));
        const orderInfo = {
            productId: productId as number,
            quantity: objectQuantity.quantity,
            sizeId: sizeId,
            toppings,
        };
        if (isEmpty(currentUser)) {
            sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));
            router.push("/sign-in");
        } else {
            await addOrder({
                addressReceiver: "",
                instructionAddressReceiver: "",
                nameReceiver: `${currentUser.firstName} ${currentUser.lastName}`,
                paymentMethod: "CASH",
                phoneReceiver: currentUser.phoneNumber || "",
                shippingFee: 0,
                orderDetail: orderInfo,
            });
            router.push("/order");
        }
    };

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center w-full h-screen">
                    <Spin />
                </div>
            ) : (
                <div
                    className="product-detail-page"
                    style={{ marginRight: "auto", marginLeft: "auto" }}
                >
                    <div className="left-cols">
                        <div className="container">
                            <div className="row items-center">
                                <Image src={product?.favIcon} />
                            </div>
                        </div>
                        <div className="card-product-description mt-12">
                            {product?.description ||
                                "There is no description available"}
                        </div>
                    </div>
                    <div className="right-cols">
                        <div>
                            <div className="card-product-detail flex">
                                <span
                                    className="card-product-name"
                                    style={{
                                        fontSize: "var(--space-30)",
                                        lineHeight: "var(--space-32)",
                                    }}
                                >
                                    {product?.nameProduct}
                                </span>
                                <div className="card-product-footer flex">
                                    <span className="card-product-price">
                                        {product?.price} $
                                    </span>
                                    <div
                                        className="card-product-quantity-config flex items-center justify-evenly"
                                        style={{ width: "140px" }}
                                    >
                                        <div
                                            onClick={(e) => {
                                                handleMinusQuantity(e);
                                            }}
                                            className={`minus-quantity card-product-decrease btn btn--orange-1 quantity-product add-to-cart ${
                                                objectQuantity.enabledMinus
                                                    ? "active"
                                                    : ""
                                            }`}
                                            style={{ padding: 0 }}
                                        >
                                            <img src={MINUS_CART_BTN} />
                                        </div>
                                        <span className="card-product-quantity">
                                            {objectQuantity.quantity}
                                        </span>
                                        <div
                                            onClick={(e) => {
                                                handlePlusQuantity(e);
                                            }}
                                            className={`plus-quantity ard-product-decrease btn btn--orange-1 quantity-product add-to-cart p-0 ${
                                                objectQuantity.enabledPlus
                                                    ? "active"
                                                    : ""
                                            }`}
                                            style={{ padding: 0 }}
                                        >
                                            <img src={ADD_CART_BTN} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section className="card-product-note">
                                <div className="card-product-note-item">
                                    <img
                                        src={NOTE_ICON}
                                        className="card-product-note-icon"
                                    />
                                    <Input
                                        placeholder="Note for your order"
                                        className="card-product-text"
                                    />
                                </div>
                            </section>
                            <section className="card-product-size">
                                <div
                                    className="card-product-option"
                                    style={{ marginLeft: 0, width: "100%" }}
                                >
                                    <span className="card-product-option-text">
                                        Choose Size (Required)
                                    </span>
                                </div>
                                <div className="justify-between card-product-option-size-item items-center flex mt-4">
                                    {!isLoading ? (
                                        <Radio.Group
                                            value={sizeId}
                                            onChange={(value) => {
                                                handleOnChangeSize(
                                                    value.target.value,
                                                );
                                            }}
                                        >
                                            {sizes?.map((size) => (
                                                <Radio
                                                    className="card-product-option-item"
                                                    key={size.id}
                                                    value={size.id}
                                                >
                                                    <div className="flex flex-col justify-center">
                                                        <span>{size.size}</span>
                                                        <span>
                                                            + {size.price}$
                                                        </span>
                                                    </div>
                                                </Radio>
                                            ))}
                                        </Radio.Group>
                                    ) : undefined}
                                </div>
                            </section>
                            {!isLoading ? (
                                !isEmpty(toppings) ? (
                                    <section className="card-product-topping">
                                        <div
                                            className="card-product-option"
                                            style={{
                                                marginLeft: 0,
                                                width: "100%",
                                            }}
                                        >
                                            <span className="card-product-option-text">
                                                Choose Topping (Optional)
                                            </span>
                                        </div>
                                        <div className="card-product-option-topping-item">
                                            {(toppings || []).map((topping) => (
                                                <div
                                                    className="card-product-option-topping flex"
                                                    key={topping.id}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="card-product-option-topping-name">
                                                            {
                                                                topping.nameTopping
                                                            }
                                                        </span>
                                                        <span className="card-product-option-topping-price">
                                                            + {topping.price} $
                                                        </span>
                                                    </div>
                                                    <div className="card-product-quantity-config flex items-center">
                                                        <div
                                                            onClick={(e) => {
                                                                handleMinusToppingQuantity(
                                                                    e,
                                                                    topping.id,
                                                                );
                                                            }}
                                                            className={`quantity-extra flex justify-center items-center cursor-pointer ${
                                                                objToppingQuantity[
                                                                    `${topping.id}enabledMinus`
                                                                ]
                                                                    ? ""
                                                                    : "hide"
                                                            }`}
                                                        >
                                                            <div className="decrease"></div>
                                                        </div>
                                                        <span className="card-product-quantity extra">
                                                            {
                                                                objToppingQuantity[
                                                                    `${topping.id}quantity`
                                                                ]
                                                            }
                                                        </span>
                                                        <div
                                                            onClick={(e) => {
                                                                handlePlusToppingQuantity(
                                                                    e,
                                                                    topping.id,
                                                                );
                                                            }}
                                                            className={`quantity-extra flex justify-center items-center cursor-pointer ${
                                                                objToppingQuantity[
                                                                    `${topping.id}enabledPlus`
                                                                ]
                                                                    ? ""
                                                                    : "cursor-not-allowed"
                                                            }`}
                                                        >
                                                            <div className="increase"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                ) : undefined
                            ) : undefined}
                        </div>
                        <button
                            className="btn-add-item block w-full mt-6"
                            onClick={handleOnSubmitCart}
                        >
                            {totalPrice} $ - Add To Cart
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
