import { Button, Form, Modal, message } from "antd"
import axios from "axios";
import { useState } from "react";

// export interface ICreateModal {
//     afterCreated: () => void,
//     formElement: React.ReactNode,
//     createUrl: string
// }
export const CreateModal = ({ afterCreated, formElement, createUrl }) => {
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleCreate = async (values) => {
        console.log(values)
        try {
            const result = await axios({
                method: "POST",
                url: `http://localhost:3001/api${createUrl}`,
                data: { ...values }
            })

            setOpen(false)
            afterCreated()

        } catch (error) {
            message.error(error)
        }
    }


    return <main className="ms-auto">
        <Button onClick={showModal}>New</Button>
        <Modal
            open={open}
            title="Tạo mới"
            okType="primary"
            okButtonProps={{ className: "bg-primary" }}
            cancelText="Cancel"
            onCancel={handleCancel}
            footer={null}
            width={800}
        >
            <Form variant="filled" layout="vertical" style={{ maxWidth: 1000 }} onFinish={handleCreate}>
                {formElement}
                <Form.Item>
                    <div className='d-flex justify-content-end gap-2'>
                        <Button type="default" htmlType="reset">
                            Clear
                        </Button>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: "#4A58EC", color: "white" }}>
                            Lưu
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    </main >
}