import { FilterStringInput } from "./FilterString"
import { FilterSelect } from "./FilterSelect"
import { FilterDate } from "./FilterDate"

export const FilterItem = (props) => {
    return <>
        {props.type === "input" &&
            (<FilterStringInput
                key={props.key} name={props.fieldName}
                title={props.title}
                onDelete={props.onDelete}
            />)
            || (props.type === "select" &&
                <FilterSelect
                    key={props.key}
                    name={props.fieldName}
                    title={props.title}
                    options={props.options}
                    onDelete={props.onDelete}
                />)
            || (props.type === "date" &&
                <FilterDate
                    key={props.key}
                    name={props.fieldName}
                    title={props.title}
                    onDelete={props.onDelete}
                />)}
    </>
}