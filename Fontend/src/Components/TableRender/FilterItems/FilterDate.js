import { CloseOutlined } from "@ant-design/icons"
import { DatePicker, Form, Input, Select } from "antd"
import { Option } from "antd/es/mentions"
import { useState } from "react"


const options = [
    {
        key: "today",
        title: "Today",
        value: new Date(new Date().getTime() - - (7 * 24 * 60 * 60 * 1000))

    },
    {
        key: "last7day",
        title: "Last 7 days",
        value: new Date(new Date().getTime() - - (7 * 24 * 60 * 60 * 1000))

    },
    {
        key: "currentMonth",
        title: "Current month",
        value: new Date(new Date().getTime() - - (7 * 24 * 60 * 60 * 1000))

    },
    {
        key: "lastXDays",
        title: "Last X days",
        value: new Date(new Date().getTime() - - (7 * 24 * 60 * 60 * 1000))

    },
    {
        key: "before",
        title: "Before",
        value: ""

    },
    {
        key: "after",
        title: "After",
        value: ""
    },
    {
        key: "between",
        title: "Between",
        value: ""
    },
]

export const FilterDate = (props) => {
    const [activeKey, setActiveKey] = useState("")
    const handleDeleteFilterItem = () => {
        props.onDelete()
    }

    return <div className="w-1/5 space-y-1" key={props.key}>
        <div className="d-flex justify-content-between">
            <p>{props.title}</p>
            <CloseOutlined className="cursor-pointer" onClick={() => handleDeleteFilterItem()} />
        </div>
        <Form.Item name={[props.name, "expr"]} initialValue={options[0].key}>
            <Select className="w-full" onSelect={(value) => setActiveKey(value)}>
                {
                    options.map((item, index) => (
                        <Option key={String(index)} value={item.key}>{item.title}</Option>
                    ))}
            </Select>
        </Form.Item>
        {
            activeKey && ["before", "after"].includes(activeKey) && <Form.Item name={[props.name, "value"]}>
                <DatePicker placeholder="Value" />
            </Form.Item>
        }
        {
            activeKey && ["lastXDays"].includes(activeKey) && <Form.Item name={[props.name, "value"]}>
                <Input placeholder="Value" />
            </Form.Item>
        }

        {
            activeKey && ["betweeen"].includes(activeKey) &&
            <Form.Item name={[props.name, "value"]}>
                <Input placeholder="Value" />
            </Form.Item>
        }

    </div>
}