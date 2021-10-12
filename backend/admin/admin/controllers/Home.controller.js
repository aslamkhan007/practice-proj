const Joi = require("joi");
const homePageCollection = require("../../models/home.page.model")
const happyClientCollection = require("../../models/HappyClient.modal")
const updateCreditProofServices = async (req, res) => {
    const userPayload = req.body
    console.log(userPayload);
    let creditProofServicesImage;
    if (req.file === undefined) {
        console.log(req.body.creditProofServicesImage);
        creditProofServicesImage = req.body.creditProofServicesImage
    } else {
        creditProofServicesImage = req.file.filename
    }
    try {
        const existingUser = await homePageCollection.findOne({})
        if (existingUser && existingUser.length !== 0) {
            const payload = {
                creditProofServicesFrench: req.body.creditProofServicesFrench,
                creditProofServicesEnglish: req.body.creditProofServicesEnglish,
                creditProofServicesImage,
                createOn: new Date()
            }
            const condition = {
                _id: existingUser._id
            }
            const result = await homePageCollection.findByIdAndUpdate(condition, payload)
            return res.status(200).json({
                message: "Details updated Successfully",
                data: result,
                status: 200
            })

        } else {
            const payload = {
                ...userPayload,
                creditProofServicesImage: req.file.filename,
                createOn: new Date()
            }
            const result = await homePageCollection.create(payload)
            return res.status(200).json({
                message: "Details added successfully",
                status: 200,
                result
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error!,", error,
            status: 500,

        })
    }

}
const updateOurHappyClient = async (req, res) => {
    const userPayload = req.body
    try {
        const payload = {
            ...userPayload,
            clientImage: req.file.filename,
            createOn: new Date()
        }
        const result = await happyClientCollection.create(payload)
        return res.status(200).json({
            message: "Details added successfully",
            status: 200,
            result
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error!,", error,
            status: 500,

        })
    }

}
const updateContactUs = async (req, res) => {
    console.log(req.body);
    const userPayload = req.body
    const condition = {
        _id: req.body.homwPageId
    }
    try {
        const payload = {
            ...userPayload,
            createOn: new Date()
        }
        const result = await homePageCollection.findByIdAndUpdate(condition, payload)
        console.log(result, "hhhhhhhhhhh");
        return res.status(200).json({
            message: "Details added successfully",
            status: 200,
            result
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error!,", error,
            status: 500,

        })
    }
}


const updateHowCreditproofworks = async (req, res) => {
    const userPayload = req.body
    console.log(userPayload);
   
    let registerYourselfImage;
    let verifyCreditscoreImage;
    let reviewYourlandlordImage;

    if (req.files.registerYourselfImage == undefined) {
        registerYourselfImage = req.body.registerYourselfImage
    } else {
        registerYourselfImage = req.files.registerYourselfImage[0].filename
    }


    if (req.files.verifyCreditscoreImage == undefined) {
        registerYourselfImage = req.body.verifyCreditscoreImage
    } else {
        verifyCreditscoreImage = req.files.verifyCreditscoreImage[0].filename
    }


    if (req.files.reviewYourlandlordImage == undefined) {
        reviewYourlandlordImage = req.body.reviewYourlandlordImage
    } else {
        reviewYourlandlordImage = req.files.reviewYourlandlordImage[0].filename
    }

    const condition ={
        _id:req.body.homwPageId
    }
    try {
            const payload = {
                registerYourselfEnglish:req.body.registerYourselfEnglish,
                registerYourselfFrench:req.body.registerYourselfFrench,
                verifyCreditscoreEnglish:req.body.verifyCreditscoreEnglish,
                verifyCreditscoreFrench:req.body.verifyCreditscoreFrench,
                reviewYourlandlordEnglish:req.body.reviewYourlandlordEnglish,
                reviewYourlandlordFrench:req.body.reviewYourlandlordFrench,
                createOn: new Date(),
                registerYourselfImage: registerYourselfImage,
                verifyCreditscoreImage: verifyCreditscoreImage,
                reviewYourlandlordImage: reviewYourlandlordImage,
            }
            const result = await homePageCollection.findByIdAndUpdate(condition, payload)
            return res.status(200).json({
                message: "Details updated Successfully",
                data: result,
                status: 200
            })
            
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error!,", error,
            status: 500,

        })
    }
}




const getHomePageData = async (req, res) => {
    try {

        let result = await homePageCollection.findOne({})
        if (!result) {
            return res.status(200).json({
                message: "content  is not exists",
                code: 422,
            });
        } else {
            return res.status(200).json({
                message: ' content get successfull',
                status: 200,
                data: result
            })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error", error,
            status: 500,
        });
    }
}
module.exports = {
    updateCreditProofServices,
    getHomePageData,
    updateHowCreditproofworks,
    updateOurHappyClient,
    updateContactUs,
}