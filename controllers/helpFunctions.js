class HelpFunction {

    // закрепление в выпадающем списке в верхнем положении наименования c сортировкой - массив объектов
    sortArray(array, key_sort, key_filter, value) {
        const compare = (a, b) => a[key_sort] > b[key_sort] ? 1 : -1
        const one = array.filter(el => el[key_filter] === value)
        const rest = array.filter(el => el[key_filter] !== value)
        return [...one, ...rest.sort(compare)]
    }

    // закрепление в выпадающем списке в верхнем положении наименования c сортировкой - массив объектов со счётчиком
    sortFindAndCountAll(data, key_sort, key_filter, value) {
        const compare = (a, b) => a[key_sort] > b[key_sort] ? 1 : -1
        const array = []
        data.rows.map(el => array.push(el.dataValues) )
        const one = array.filter(el => el[key_filter] === value)
        const rest = array.filter(el => el[key_filter] !== value)
        return { rows: [...one, ...rest.sort(compare)], count: data.count }
    }
    
}

module.exports = new HelpFunction




