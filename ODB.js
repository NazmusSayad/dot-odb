const ODB = {
  json: function (input) {
    input = input.replace(/\r/gim, "")

    const firstArray = input.split("\n\n")
    const header = firstArray.shift().split(",")

    const finalData = []

    firstArray.filter((current) => {
      if (current === "") return

      current = current.split("\n")
      const objectToPush = {}

      header.forEach((key, index) => {
        let calculatedData = current[index]

        if (calculatedData === undefined) {
          calculatedData = ""
        } else {
          calculatedData = calculatedData.startsWith(";") ? calculatedData.slice(1) : calculatedData
        }

        if (calculatedData) {
          objectToPush[key.trim()] = calculatedData
        }
      })
      if (Object.keys(objectToPush).length) {
        finalData.push(objectToPush)
      }
    })

    return finalData
  },
  jsonFile: async function (url) {
    const file = await (await fetch(url)).text()
    return this.json(file)
  },
}
