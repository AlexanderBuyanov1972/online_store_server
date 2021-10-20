class HelpFunction {
// закрепление в выпадающем списке в верхнем положении наименования
    arraySort(array, value) {
        const compare = (a, b) => a.name > b.name ? 1 : -1
        const one = array.filter(item => item.name === value)
        const rest = array.filter(item => item.name !== value)
        return [...one, ...rest.sort(compare)]
    }
}
module.exports = new HelpFunction




