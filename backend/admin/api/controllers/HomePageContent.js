
const updateHomePageContent = async (req, res) => {
    const conditions = {
        _id: req.params.id,
    };

    try {
        let result1 = await recordTenancyService.findOne(conditions);
        console.log(result1);
        if (!result1) {
            return res.status(200).send({
                message: "properties is not exists",
                code: 422,
            });
        } else {
            console.log(result1, "  ");
            const data = req.body
            const payload = {
                ...data
            }
            let result = await recordTenancyService.update(conditions, payload);
            return res.status(200).json({
                message: ' tenancy record  update  success full',
                status: 200,
                result:result
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error", error,
            status: 500,
        });
    }
}


module.exports = {
    updateHomePageContent
}