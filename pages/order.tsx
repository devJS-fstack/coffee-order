
import { Form, Input, message } from "antd";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { BsFillFileEarmarkFill } from "react-icons/bs";


export default function LoginComponent() {

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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
