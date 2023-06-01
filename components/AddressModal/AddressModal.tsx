import { Modal, AutoComplete } from "antd";
import { useState, Dispatch, SetStateAction } from "react";
import { getListAddress } from "../../apis/coffee-house";

export interface IDeliveryInfo {
    titleAddress: string;
    fullAddress: string;
    date: string;
    time: string;
}

const AddressModal = ({
    isOpen,
    setIsOpen,
    setAddress,
}: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setAddress: Dispatch<SetStateAction<IDeliveryInfo>>;
}) => {
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [value, setValue] = useState("");

    const handleOk = () => {
        const result = options.find((option) => option.value === value) as any;
        setAddress((pre) => {
            return {
                ...pre,
                titleAddress: result?.title || "",
                fullAddress: result?.value || "",
            };
        });
        setIsOpen(false);
        setOptions([]);
        setValue("");
    };

    const handleCancel = () => {
        setIsOpen(false);
        setValue("");
        setOptions([]);
    };

    const getPanelValue = async (searchText: string) => {
        const response = await getListAddress(searchText);
        const data = response?.map(
            (res: { full_address: string; title_address: string }) => ({
                value: res.full_address,
                title: res.title_address,
            }),
        );
        setOptions(data);
    };

    return (
        <Modal
            title="Delivery Address"
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ style: { backgroundColor: "var(--orange-4)" } }}
            cancelButtonProps={{ style: { backgroundColor: "transparent" } }}
        >
            <AutoComplete
                placeholder="Please input your address"
                className="w-full"
                options={options}
                value={value}
                onChange={(e) => {
                    setValue(e);
                }}
                onSearch={async (text) => await getPanelValue(text)}
            />
        </Modal>
    );
};

export default AddressModal;
