import { Input, Modal, Radio } from "antd";
import { useState, Dispatch, SetStateAction } from "react";
import { IDeliveryInfo } from "../AddressModal/AddressModal";
import { ADD_CART_BTN, MINUS_CART_BTN, NOTE_ICON } from "../../utils/variable";
import { Scrollbars } from "react-custom-scrollbars";

const AddProductModal = ({ 
    isOpen,
    setIsOpen,
    setDeliveryInfo,
 }: { 
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    setDeliveryInfo: Dispatch<SetStateAction<IDeliveryInfo>>,
}) => {

    const handleOk = () => {
        setIsOpen(false);
    };
    
    const handleCancel = () => {
        setIsOpen(false);
    };


    return (
        <Modal title="Edit Order"
            width={"430px"}
            open={isOpen} onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ typeof: "submit", style: { backgroundColor: "var(--orange-4)" } }}
            okText="Save Changes"
            cancelButtonProps={{ style: { backgroundColor: "transparent" } }}
        >
            <Scrollbars autoHide style={{ height: 500 }}>
                <div>
                    <div className="flex">
                        <div className="tch-product__image card-product-info-image relative">
                            <img className="card-product-info-image" src="https://minio.thecoffeehouse.com/image/admin/1681368048_kombucha-yuzu-new_400x400.jpg"/>
                        </div>
                        <div className="card-product-detail flex">
                            <span className="card-product-name">
                                Hi-Tea Yuzu Kombucha
                            </span>
                            <span className="card-product-description">
                            Trà hoa Hibiscus 0% caffeine thanh mát, hòa quyện cùng trà lên men Kombucha 100% tự nhiên và mứt Yuzu Marmalade (quýt Nhật) mang đến hương vị chua chua lạ miệng. Đặc biệt, Hi-Tea Yuzu Kombucha cực hợp cho team thích detox, muốn sáng da nhờ Kombucha Detox nhiều chất chống oxy hoá cùng Yuzu giàu vitamin C. Lưu ý: Khuấy đều trước khi dùng
                            </span>
                            <div className="card-product-footer flex">
                                <span className="card-product-price">90$</span>
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
                        <div className="card-product-option">
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
            </Scrollbars>
        </Modal>
    )
}

export default AddProductModal;