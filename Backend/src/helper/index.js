
const allowedOperator = ["gt", "gte", "lt", "lte", "startsWith", "endsWith", "contains", "between", "in"]
function parseRequestQueries(query, allowedFilterFields = [], record_alias = '') {
    const { page, pageSize, sortBy, order, searchKey, ...filterOptions } = query;
    const result = {
        paginate: {},
        filter: {},
        sort: {},
    }

    result.sort.by = sortBy || (allowedFilterFields.length > 0 && allowedFilterFields[0]) || ""
    result.sort.order = (order && ["ASC", "DESC"].includes(order.toUpperCase()) && order.toUpperCase()) || "ASC" 

    let currentPage = (!isNaN(page)  && Number(page)) || 1
    let limit = (!isNaN(pageSize)  && Number(pageSize)) || 10
    result.paginate.limit = limit
    result.paginate.offset = limit * (currentPage - 1)
    result.paginate.page = currentPage
   
    if (searchKey) {
        result.searchKey = searchKey
    }


    const placeholders = [] 
    const params = []

    for (let key in filterOptions) {
        const conditions = key.split("_")    
        if (conditions.length === 1 && allowedFilterFields.includes(key) && filterOptions[key] !== "") {
            placeholders.push(` (${record_alias ? `${record_alias}.${key}` :  key} = ?) `)
            params.push(filterOptions[key])
        } else if (conditions.length === 2) {
            const [field,op] = conditions ;
            const fieldStr =   record_alias ? `${record_alias}.${field}` : field
            if (allowedFilterFields.includes(field) && allowedOperator.includes(op)) {
                switch (op) {
                    case "lt":
                        params.push(filterOptions[key])
                        placeholders.push(` (${fieldStr} < ?) `)
                        break;
                    case "lte":
                        params.push(filterOptions[key])
                        placeholders.push(` (${fieldStr} <= ?) `)
                        break;
                    case "gt":
                        params.push(filterOptions[key])
                        placeholders.push(` (${fieldStr} > ?) `)
                        break;
                    case "gte":
                        params.push(filterOptions[key])
                        placeholders.push(` (${fieldStr} >= ?) `)
                        break;
                    case "eq":
                        params.push(filterOptions[key])
                        placeholders.push(` (${fieldStr} = ?) `)
                        break;
                    case "neq":
                        params.push(filterOptions[key])
                        placeholders.push(` (${fieldStr} <> ?) `)
                        break;
                    case "startsWith":
                        params.push(`${filterOptions[key]}%`)
                        placeholders.push(` (${fieldStr} LIKE ?) `)
                        break;
                    case "endsWith":
                        params.push(`%${filterOptions[key]}`)
                        placeholders.push(` (${fieldStr} LIKE ?) `)
                        break;
                    case "contains":
                        params.push(`%${filterOptions[key]}%`)
                        placeholders.push(` (${fieldStr} LIKE ?) `)
                        break;
                    case "between":
                        let range = filterOptions[key].split(";")
                        if (range.length === 2) {
                            let [from, to] = range
                            placeholders.push(`( ${fieldStr} BETWEEN ? `)
                            params.push(from)
                            placeholders.push(` AND ? ) `)
                            params.push(to)
                        }
                        break;
                    case "in":
                        let options = filterOptions[key].split(";")
                        if (options.length >= 1) {
                            placeholders.push(` (${fieldStr} IN (${options.map(item => "?").join(",")})) `)
                            params.push(...options)
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    result.filter =  {placeholders, params}

    return result


    // console.log(filterOptions);
 
}



module.exports = {
    parseRequestQueries
}

