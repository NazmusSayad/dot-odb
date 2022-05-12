const ODB = {
  json: function (input) {
    const firstArray = input.split("\r\n\r\n")
    const header = firstArray.shift().split(",")

    const finalData = []

    firstArray.filter((current) => {
      if (current !== "") {
        current = current.split("\r\n")
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
      }
    })

    return finalData
  },
}
