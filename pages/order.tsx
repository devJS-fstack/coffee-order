
import { Form, Input, Button } from "antd";
import { DeleteFilled } from "@ant-design/icons"
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { BsFillFileEarmarkFill, BsChevronRight, BsPencilFill } from "react-icons/bs";


export default function LoginComponent() {
    const [form] = Form.useForm();

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="container-lg container-fluid custom-checkout">
                <div className="row justify-center">
                    <div className="col-12 col-lg-10">
                        <div className="tch-checkout-header">
                            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
                                <div className="max-w-md w-full space-y-8">
                                    <div className="flex justify-center items-center">
                                        <div className="h-full">
                                            <BsFillFileEarmarkFill size={30} color="#fad207"/>
                                        </div>
                                        <h2 className="ml-4 text-center text-3xl font-semibold text-gray-900">Confirm your order</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-lg--50 block">
                            <div className="tch-checkout-box tch-checkout-box--delivery tch-checkout-border float-lg-left">
                                <div className="tch-checkout-custom-mobile flex justify-between">
                                    <h4 className="tch-checkout-box__title">Delivery Information</h4>
                                </div>
                                <div className="flex flex-row items-start tch-delivery-card tch-delivery-card--border">
                                    <div className="tch-delivery-card__image">
                                        <img width={40} src="https://minio.thecoffeehouse.com/images/tch-web-order/Delivery2.png"/>
                                    </div>
                                    <div className="flex justify-between items-start tch-delivery-card__content">
                                        <div>
                                            <h5 className="tch-delivery-card__title mb-0">14/1c Đường Số 359</h5>
                                            <p className="tch-delivery-card__description mb-0">
                                            14/1c Đường Số 359, Phước Long B, Quận 9, Thành phố Hồ Chí Minh, Việt Nam
                                            </p>
                                        </div>
                                        <span className="icon mt-2">
                                            <BsChevronRight/>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start tch-delivery-card tch-delivery-card--border">
                                    <div className="tch-delivery-card__image">
                                        <img width={40} src="https://img.freepik.com/free-vector/man-holding-clock-time-management-concept_23-2148823171.jpg?w=826&t=st=1683185468~exp=1683186068~hmac=c2cb79e2c96b57a8f893607c59d97de3ae2b610451961b251ec125390ceb5da3"/>
                                    </div>
                                    <div className="flex justify-between items-start tch-delivery-card__content">
                                        <div>
                                            <h5 className="tch-delivery-card__title mb-0">Nhận hàng trong ngày 15-30 phút</h5>
                                            <p className="tch-delivery-card__description mb-0">
                                            Vào lúc: 15:15
                                            </p>
                                        </div>
                                        <span className="icon mt-2">
                                            <BsChevronRight/>
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Form
                                        form={form}
                                        {...{
                                            labelCol: {
                                                xs: { span: 24 },
                                                sm: { span: 6 },
                                              },
                                            wrapperCol: {
                                                xs: { span: 12 },
                                                sm: { span: 24 },
                                            },
                                        }}
                                    >
                                        <Form.Item label="Name" name="name">
                                            <Input style={{
                                                padding: "4px 11px"
                                            }}/>
                                        </Form.Item>
                                        <Form.Item label="Phone" name="phone">
                                            <Input style={{
                                                padding: "4px 11px"
                                            }}/>
                                        </Form.Item>
                                        <Form.Item label="Delivery Instructions" name="deliveryInstruction">
                                            <Input.TextArea allowClear/>
                                        </Form.Item>
                                    </Form>
                                </div>
                                <div className="tch-checkout-custom-mobile flex justify-between">
                                    <h4 className="tch-checkout-box__title">Payment Method</h4>
                                </div>
                                <ul className="tch-list-payment-method mb-0 list-none">
                                    <li className="tch-payment-method-item">
                                        <div className="custom-control custom-radio mb-0">
                                            <input type="radio" name="payment-method" className="custom-control-input cursor-pointer" id="COD"/>
                                            <label htmlFor="COD" className="custom-control-label tch-custom-radio cursor-pointer inline-block" style={{ paddingLeft: 6 }}>
                                                <span className="icon ml-3 mr-2">
                                                    <img className="inline-block" src="https://minio.thecoffeehouse.com/image/tchmobileapp/1000_photo_2021-04-06_11-17-08.jpg" />
                                                </span>
                                            </label>
                                            <span className="text">Cash</span>
                                        </div>
                                    </li>
                                    <li className="tch-payment-method-item">
                                        <div className="custom-control custom-radio mb-0">
                                            <input type="radio" name="payment-method" className="custom-control-input cursor-pointer" id="MOMO"/>
                                            <label htmlFor="MOMO" className="custom-control-label tch-custom-radio cursor-pointer inline-block" style={{ paddingLeft: 6 }}>
                                                <span className="icon ml-3 mr-2">
                                                    <img className="inline-block" src="https://minio.thecoffeehouse.com/image/tchmobileapp/386_ic_momo@3x.png" />
                                                </span>
                                            </label>
                                            <span className="text">MoMo</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="none tch-checkout-box tch-checkout-box--lg-shadowbox d-lg-block float-lg-right pb-0 pt-0">
                                <div className="ptl-20">
                                    <div className="tch-checkout-box tch-checkout-box--list-ordered tch-checkout-border w-full">
                                        <div className="flex justify-between">
                                            <h4 className="tch-checkout-box__title mb-0">Selected Orders</h4>
                                            <a>
                                                <p className="tch-checkout-box__btn-outline">Add more</p>
                                            </a>
                                        </div>
                                        <div className="tch-order-card flex items-center justify-between">
                                            <div className="tch-order-card__left flex">
                                                <span className="tch-order-card__icon flex items-center">
                                                    <BsPencilFill/>
                                                </span>
                                                <div className="tch-order-card__content">
                                                    <h5 className="tch-order-card__title mb-0">1 x Black Sugar Ice Milk</h5>
                                                    <p className="tch-order-card__description mb-0">2 x Size small</p>
                                                </div>
                                            </div>
                                            <div className="tch-order-card__right flex items-center">
                                                <p className="tch-order-card__price mb-0 mr-4">90$</p>
                                                <DeleteFilled style={{
                                                    color: "#F87171"
                                                }} />
                                            </div>
                                        </div>
                                        <div className="tch-checkout-box tch-checkout-box--list-total tch-checkout-border w-full">
                                            <div className="mb--12">
                                                <h4 className="tch-checkout-box__title">Total Payment</h4>
                                            </div>
                                            <div className="
                                                    tch-order-card tch-order-card--border
                                                    flex
                                                    items-center
                                                    justify-between
                                                ">
                                                    <div className="tch-order-card__left flex">
                                                        <p className="tch-order-card__text mb-0">Amount</p>
                                                    </div>
                                                    <div className="tch-order-card__right">
                                                        <p className="tch-order-card__price mb-0 mr-4">90$</p>    
                                                    </div>
                                            </div>
                                            <div className="
                                                    tch-order-card tch-order-card--border
                                                    flex
                                                    items-center
                                                    justify-between
                                                ">
                                                    <div className="tch-order-card__left flex">
                                                        <p className="tch-order-card__text mb-0">Shipping Fee</p>
                                                    </div>
                                                    <div className="tch-order-card__right">
                                                        <p className="tch-order-card__price mb-0 mr-4">5$</p>    
                                                    </div>
                                            </div>
                                            <div className="
                                                    tch-order-card tch-order-card--border
                                                    flex
                                                    items-center
                                                    justify-between
                                                ">
                                                    <div className="tch-order-card__left flex">
                                                        <p className="tch-order-card__text orange mb-0 font-medium">Voucher Discount</p>
                                                    </div>
                                                    <div className="tch-order-card__right">
                                                        <p className="tch-order-card__price mb-0 mr-4">-15$</p>    
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="
                                        tch-checkout-box tch-checkout-box--list-submited
                                        flex
                                        justify-between
                                        items-center
                                        w-full
                                        position-static
                                    ">
                                        <div>
                                            <p className="tch-order-card__text text-white mb-0">Total</p>
                                            <p className="tch-order-card__text text-white font-medium mb-0">80$</p>
                                        </div>
                                        <Button className="font-medium" type="primary" shape="round" size="middle" style={{
                                            backgroundColor: "white",
                                            color: "var(--orange-2)",
                                        }}>Place Order</Button>
                                </div>
                            </div>
                            <div className="
                                    tch-checkout-box tch-checkout-box--remove-card float-lg-right
                                ">
                                    <div className="tch-checkout-box__text text-center mb-0">
                                        <DeleteFilled style={{
                                                    color: "#F87171"
                                                }} className="mr-2 cursor-pointer text-base"/>
                                        <span className="font-medium cursor-pointer text-base">Remove your order</span>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
