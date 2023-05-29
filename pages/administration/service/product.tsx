import { useEffect, useState } from "react";
import { useCategoriesQuery } from "../../../apis/category";
import { useProductsQuery } from "../../../apis/product";
import ProductAdminComponent from "../../../components/ProductAdmin";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const ProductAdmin = ({}: {}) => {
    const {
        data: categories,
        isLoading: isLoadingCategory,
        refetch: refetchCategory,
    } = useCategoriesQuery({});
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        refetchCategory();
    }, []);

    return (
        <div className="w-full py-4 overflow-auto">
            <span className="flex justify-end pr-4 pb-4">
                <Button
                    className="hover-btn-custom"
                    icon={<PlusOutlined />}
                    style={{ backgroundColor: "var(--orange-1)" }}
                    onClick={() => {
                        setIsOpenModal(true);
                        setIsEdit(false);
                    }}
                >
                    New Product
                </Button>
            </span>
            <ProductAdminComponent
                categories={categories}
                isLoadingCategory={isLoadingCategory}
                isOpen={isOpenModal}
                setIsOpen={setIsOpenModal}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
            />
        </div>
    );
};

export default ProductAdmin;
