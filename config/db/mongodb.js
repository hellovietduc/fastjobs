const mongoose = require('mongoose');
const { mongodb, environment } = require('../env');
const log = require('../log');

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const autoIndex = environment !== 'production';

exports.init = () => {
  mongoose.connect(`${mongodb.uri}/${mongodb.dbname}`, { autoIndex })
    .then(() => log.info('MongoDB connected'))
    .catch(err => log.error(err));
};
