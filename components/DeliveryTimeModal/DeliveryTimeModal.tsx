import { Modal, TimePicker, DatePicker, Form } from "antd";
import { useState, Dispatch, SetStateAction } from "react";
import { getNextHour, getPastHours } from "../../utils/helper";
import moment from "moment";
import { IDeliveryInfo } from "../AddressModal/AddressModal";
import dayjs from "dayjs";

const DeliveryTimeModal = ({ 
    isOpen,
    setIsOpen,
    setDeliveryInfo,
 }: { 
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    setDeliveryInfo: Dispatch<SetStateAction<IDeliveryInfo>>,
}) => {

    const [form] = Form.useForm();
    const handleOk = () => {
        form.validateFields().then(() => {
            form.submit();
            setIsOpen(false);
        });
      };
    
    const handleCancel = () => {
        setIsOpen(false);
    };

    const handleOnFinish = ({ date, time }: { date: dayjs.Dayjs, time: dayjs.Dayjs }) => {
        const dateStr = date.format("YYYY-MM-DD");
        const timeStr = time.format("HH:mm");

        setDeliveryInfo((pre) => ({
            ...pre,
            date: dateStr,
            time: timeStr,
        }))
    }

    const disabledDate = (current: any) => {
        const today = moment().startOf('day');
        const tomorrow = moment().add(1, 'days').startOf('day');
        const nextTomorrow = moment().add(2, 'days').startOf('day');
        return !(current.isSame(today, 'day') || current.isSame(tomorrow, 'day') || current.isSame(nextTomorrow, 'day'));
    }

    return (
        <Modal title="Delivery Time" open={isOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ typeof: "submit", style: { backgroundColor: "var(--orange-4)" } }} cancelButtonProps={{ style: { backgroundColor: "transparent" } }}>
            <Form form={form} onFinish={(values) => { handleOnFinish(values) }} initialValues={{
                date: dayjs(),
                time: getNextHour(),
            }}>
                <Form.Item name={"date"} rules={[
                    {
                        required: true,
                        message: "Please select one date"
                    }
                ]}>
                    <DatePicker className="w-full" disabledDate={disabledDate}/>
                </Form.Item>
                <Form.Item name={"time"} rules={[
                    {
                        required: true,
                        message: "Please select one time"
                    }
                ]}>
                    <TimePicker allowClear={false} className="w-full" minuteStep={30} format={"HH:mm"} showNow={false} disabledTime={() => ({ disabledHours: () => getPastHours() })}/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default DeliveryTimeModal;