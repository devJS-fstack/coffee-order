import { Dropdown, Empty, Pagination, Spin } from "antd";
import { CoffeeOutlined } from "@ant-design/icons";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { ADD_CART_BTN, STATUS_USERS } from "../../utils/variable";
import { ICategory, useCategoriesQuery } from "../../apis/category";
import {
    IProduct,
    useDeleteProductMutation,
    useProductsQuery,
    useUpdateStatusProductMutation,
} from "../../apis/product";
import { useRouter } from "next/router";
import AddProductModal from "../AddProductModal/AddProductModal";
import NoData from "../NoData";
import { BsCaretRightFill, BsFillPencilFill } from "react-icons/bs";
import { FiTrash } from "react-icons/fi";
import { RiMoreFill } from "react-icons/ri";
import ProductModal from "../ProductModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { delay } from "../../utils/helper";
import { toast } from "react-toastify";
import { GrStatusDisabledSmall } from "react-icons/gr";

const ProductAdmin = ({
    categories,
    isLoadingCategory,
    isOpen,
    setIsOpen,
    isEdit,
    setIsEdit,
}: {
    categories?: ICategory[];
    isLoadingCategory: boolean;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isEdit: boolean;
    setIsEdit: Dispatch<SetStateAction<boolean>>;
}) => {
    const [categoryCurr, setCategoryCurr] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [isOpenStatus, setIsOpenStatus] = useState(false);
    const [isLoadingOkDelete, setIsLoadingOkDelete] = useState(false);
    const [mDeleteProduct] = useDeleteProductMutation();
    const [mUpdateStatusProduct] = useUpdateStatusProductMutation();

    const {
        data: dataProducts,
        refetch: refetchProduct,
        isFetching: isFetchingProducts,
    } = useProductsQuery(
        { categoryId: categoryCurr, pageNumber, enable: false },
        { refetchOnMountOrArgChange: true }
    );

    const products = dataProducts?.products;
    const total = dataProducts?.total;
    const [productCurr, setProductCurr] = useState({} as IProduct);

    const handleOnClickCategory = (id: number) => {
        setCategoryCurr(id);
    };

    useEffect(() => {
        setPageNumber(1);
    }, [categoryCurr]);

    const handleOnChangePage = (pageNumber: number) => {
        setPageNumber(pageNumber);
    };

    const handleOnDelete = async () => {
        setIsLoadingOkDelete(true);
        await delay(500);
        try {
            await mDeleteProduct({ productId: productCurr.id }).unwrap();
        } catch (error: any) {
            toast.error(error.message);
        }
        toast.success("Delete product successfully.");
        setIsLoadingOkDelete(false);
        setIsOpenConfirm(false);
        await refetchProduct();
    };

    const handleOnCancelDelete = () => {
        setIsOpenConfirm(false);
    };

    const handleOnUpdateStatus = async () => {
        setIsLoadingOkDelete(true);
        const status = productCurr.enable
            ? STATUS_USERS.DISABLED
            : STATUS_USERS.ACTIVE;
        await delay(500);
        try {
            await mUpdateStatusProduct({ id: productCurr.id, status }).unwrap();
        } catch (error: any) {
            toast.error(error.message);
        }
        toast.success(
            `${productCurr.enable ? "Disable" : "Enable"} product successfully`
        );
        setIsLoadingOkDelete(false);
        setIsOpenStatus(false);
        await refetchProduct();
    };

    const handleOnCancelUpdateStatus = () => {
        setIsOpenStatus(false);
    };

    return (
        <div className="container-lg container-fluid">
            <ProductModal
                isOpen={isOpen}
                refetchData={refetchProduct}
                setIsOpen={setIsOpen}
                product={productCurr}
                categories={categories}
                isEdit={isEdit}
            />
            <ConfirmModal
                isOpen={isOpenConfirm}
                okButtonProps={{ loading: isLoadingOkDelete }}
                handleCancel={handleOnCancelDelete}
                handleOk={handleOnDelete}
                title="Confirm Delete"
                okText="Delete"
                children={
                    <div className="flex flex-col justify-center pl-2 pt-2">
                        <span>
                            Are you sure you want to delete{" "}
                            <span className="font-bold">
                                {productCurr.nameProduct}
                            </span>{" "}
                            ?
                        </span>
                    </div>
                }
            />
            <ConfirmModal
                isOpen={isOpenStatus}
                okButtonProps={{ loading: isLoadingOkDelete }}
                handleCancel={handleOnCancelUpdateStatus}
                handleOk={handleOnUpdateStatus}
                title={`Confirm ${productCurr.enable ? "Disable" : "Enable"}`}
                okText={productCurr.enable ? "Disable" : "Enable"}
                children={
                    <div className="flex flex-col justify-center pl-2 pt-2">
                        <span>
                            Are you sure you want to{" "}
                            {productCurr.enable ? "disable" : "enable"} product{" "}
                            <span className="font-bold">
                                {productCurr.nameProduct}
                            </span>{" "}
                            ?
                        </span>
                    </div>
                }
            />
            <div className="tch-box__body">
                <ul className="tch-category-card-list tch-category-card-list--spacing flex justify-content-md-center flex-xl-wrap flex-lg-wrap border-0">
                    {!isLoadingCategory ? (
                        (categories ?? []).map((category) => (
                            <li
                                className="ml-2"
                                key={category.id}
                                onClick={(e) => {
                                    handleOnClickCategory(category.id);
                                }}
                            >
                                <a
                                    className={`nav-link nav-link-category m-0 border-0 ${
                                        categoryCurr === category.id
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <div className="tch-category-card flex flex-col">
                                        <div className="flex justify-center items-center tch-category-card__image tch-category-card--circle">
                                            <img src={category.favIcon} />
                                        </div>
                                        <div className="tch-category-card__content">
                                            <h5 className="tch-category-card__title text-center mb-0">
                                                {category.nameCategory}
                                            </h5>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))
                    ) : (
                        <Spin />
                    )}
                </ul>
                {isFetchingProducts ? (
                    <div className="text-center">
                        <Spin />
                    </div>
                ) : (
                    <div className="tab-content">
                        <div>
                            <div
                                className="row mb-4 mb-lg-5"
                                style={{
                                    justifyContent: products?.length
                                        ? ""
                                        : "center",
                                }}
                            >
                                {products?.length ? (
                                    (products || []).map(
                                        (product: IProduct) => (
                                            <div
                                                className="col-12 col-md-6 col-lg-3 col-xl-2 mt-2 mt-lg-3"
                                                key={product.id}
                                            >
                                                <div>
                                                    <div
                                                        className={`tch-product__card flex flex-lg-column ml-0 ${
                                                            product.enable
                                                                ? ""
                                                                : "disabled"
                                                        }`}
                                                    >
                                                        <div className="tch-product__image tch-product--lg__image tch-product-img-border">
                                                            <img
                                                                className="cursor-pointer"
                                                                src={
                                                                    product.favIcon
                                                                }
                                                                onClick={(
                                                                    e
                                                                ) => {}}
                                                            />
                                                        </div>
                                                        <div className="tch-product__content tch-product__content--mobile-padding flex flex-col">
                                                            <div
                                                                className="tch-product__content__top mb-1 mb-lg-3 cursor-pointer"
                                                                onClick={(
                                                                    e
                                                                ) => {}}
                                                            >
                                                                <h4 className="tch-product-content__title mb-0">
                                                                    {
                                                                        product.nameProduct
                                                                    }
                                                                </h4>
                                                            </div>
                                                            <div className="tch-product__content__footer flex justify-between items-center mt-auto">
                                                                <p className="mb-0">
                                                                    <span className="block">
                                                                        {
                                                                            product.price
                                                                        }{" "}
                                                                        $
                                                                    </span>
                                                                </p>
                                                                <Dropdown
                                                                    menu={{
                                                                        items: [
                                                                            {
                                                                                key: "1",
                                                                                label: (
                                                                                    <span
                                                                                        onClick={() => {
                                                                                            setProductCurr(
                                                                                                product
                                                                                            );
                                                                                            setIsEdit(
                                                                                                true
                                                                                            );
                                                                                            setIsOpen(
                                                                                                true
                                                                                            );
                                                                                        }}
                                                                                        className="flex justify-space-between items-center gap-2"
                                                                                    >
                                                                                        <BsFillPencilFill />
                                                                                        <span>
                                                                                            Modify
                                                                                        </span>
                                                                                    </span>
                                                                                ),
                                                                            },
                                                                            {
                                                                                key: "2",
                                                                                label: (
                                                                                    <span
                                                                                        className="flex justify-space-between items-center gap-2"
                                                                                        onClick={() => {
                                                                                            setProductCurr(
                                                                                                product
                                                                                            );
                                                                                            setIsOpenStatus(
                                                                                                true
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        {product.enable ? (
                                                                                            <>
                                                                                                <GrStatusDisabledSmall
                                                                                                    style={{
                                                                                                        color: "#F87171",
                                                                                                    }}
                                                                                                />
                                                                                                <span>
                                                                                                    Disable
                                                                                                </span>
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <BsCaretRightFill
                                                                                                    style={{
                                                                                                        color: "green",
                                                                                                        fontSize: 17,
                                                                                                    }}
                                                                                                />
                                                                                                <span>
                                                                                                    Enable
                                                                                                </span>
                                                                                            </>
                                                                                        )}
                                                                                    </span>
                                                                                ),
                                                                            },
                                                                            {
                                                                                key: "3",
                                                                                label: (
                                                                                    <span
                                                                                        onClick={() => {
                                                                                            setProductCurr(
                                                                                                product
                                                                                            );
                                                                                            setIsOpenConfirm(
                                                                                                true
                                                                                            );
                                                                                        }}
                                                                                        className="flex justify-space-between items-center gap-2"
                                                                                    >
                                                                                        <FiTrash color="red" />
                                                                                        <span>
                                                                                            Delete
                                                                                        </span>
                                                                                    </span>
                                                                                ),
                                                                            },
                                                                        ],
                                                                    }}
                                                                    placement="bottom"
                                                                    className="cursor-pointer"
                                                                >
                                                                    <div className="btn btn--orange-1 add-to-cart p-0">
                                                                        <span>
                                                                            <RiMoreFill
                                                                                className="text-white"
                                                                                style={{
                                                                                    fontSize: 18,
                                                                                }}
                                                                            />
                                                                        </span>
                                                                    </div>
                                                                </Dropdown>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <NoData title="No product are available" />
                                )}
                            </div>
                        </div>
                        {total ? (
                            <Pagination
                                onChange={(page) => {
                                    handleOnChangePage(page);
                                }}
                                current={pageNumber}
                                style={{ textAlign: "center" }}
                                total={total}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductAdmin;
