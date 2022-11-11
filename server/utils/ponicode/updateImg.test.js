const updateImg = require("../updateImg")
// @ponicode
describe("updateImg.updatePropertyPics", () => {
    test("0", async () => {
        await updateImg.updatePropertyPics({}, "script.py")
    })

    test("1", async () => {
        await updateImg.updatePropertyPics({}, "index.js")
    })

    test("2", async () => {
        await updateImg.updatePropertyPics({}, "note.txt")
    })

    test("3", async () => {
        await updateImg.updatePropertyPics({}, "image.png")
    })

    test("4", async () => {
        await updateImg.updatePropertyPics({}, "program.exe")
    })

    test("5", async () => {
        await updateImg.updatePropertyPics({}, "")
    })
})
