const pjson = require('../package.json');
module.exports = {
    getInfo: async (req, res) => {
        return await res.json({
             'name': pjson.name,
             'version': pjson.version
         })
     }
}