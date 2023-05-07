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
    const [disabledHours, setDisableHours] = useState(getPastHours());

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

    const handleOnSelectDate = (date: dayjs.Dayjs) => {
        const currentDate = dayjs().date();
        const selectDate = date.date();

        if (selectDate > currentDate) {
            console.log("set empty");
            setDisableHours([]);
        } else {
            console.log("set past");
            setDisableHours(getPastHours());
        }
    }

    const handleOnSelectTime = (time: dayjs.Dayjs) => {

    }

    return (
        <Modal title="Delivery Time" open={isOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ typeof: "submit", style: { backgroundColor: "var(--orange-4)" } }} cancelButtonProps={{ style: { backgroundColor: "transparent" } }}>
            <Form form={form} onFinish={(values) => { handleOnFinish(values) }} initialValues={{
                date: dayjs(),
                time: getNextHour(),
            }}>
                <Form.Item label={"Received Date"} name={"date"} rules={[
                    {
                        required: true,
                        message: "Please select one date"
                    }
                ]}>
                    <DatePicker 
                        onSelect={(date) => handleOnSelectDate(date)}
                        className="w-full"
                        disabledDate={disabledDate}
                    />
                </Form.Item>
                <Form.Item label={"Received Time"} name={"time"} rules={[
                    {
                        required: true,
                        message: "Please select one time"
                    }
                ]}>
                    <TimePicker 
                        onSelect={(time) => handleOnSelectTime(time)} 
                        allowClear={false} 
                        className="w-full" 
                        minuteStep={30} 
                        format={"HH:mm"} 
                        showNow={false} 
                        disabledTime={() => ({ 
                            disabledHours: () => disabledHours,
                            disabledMinutes(hour) {
                                if (disabledHours.includes(hour) || hour === -1) {
                                    return [0, 30];
                                }
                                const day = dayjs();

                                if (hour === day.hour()) {
                                    if (day.minute() < 30) {
                                        return [0];
                                    } else {
                                        return [0, 30];
                                    }
                                }

                                return [];
                            },
                        })}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default DeliveryTimeModal;