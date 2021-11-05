class HelpFunction {
    // закрепление наименования в выпадающем списке в верхнем положении 
    arraySort(array, elementName) {
        const compare = (a, b) => a.name > b.name ? 1 : -1
        return [
            ...array.filter(item => item.name === elementName),
            ...array.filter(item => item.name !== elementName).sort(compare)
        ]
    }

    async getArraydeviceCount(arrayDevices) {
        const map = new Map()
        for (let i = 0; i < arrayDevices.length; i++) {
            if (!map.has(arrayDevices[i].deviceId)) {
                map.set(arrayDevices[i].deviceId, 1)
            } else {
                map.set(arrayDevices[i].deviceId, map.get(arrayDevices[i].deviceId) + 1)
            }
        }
        let result = []
        for (let key of map.keys()) {
            let dev = await Device.findOne({ where: { id: key } })
            result.push({ device: dev, count: map.get(key) })
        }
        return result
    }
}

export default new HelpFunction