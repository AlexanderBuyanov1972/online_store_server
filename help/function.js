class HelpFunction {
    // закрепление наименования в выпадающем списке в верхнем положении 
    arraySort(array, elementName) {
        const compare = (a, b) => a.name > b.name ? 1 : -1
        return [
            ...array.filter(item => item.name === elementName),
            ...array.filter(item => item.name !== elementName).sort(compare)
        ]
    }
}
export default new HelpFunction