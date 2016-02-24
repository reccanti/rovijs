var Echonest = require('../'),
    expect = require('chai').expect,
    config = require('../config/config');

describe('Echonest module testing.', function () {
    describe('Error case in no key', function () {
        it('should return an error object when no api key is set.', function (done) {
            Echonest.get('name/aliases', { name: 'Kanye West' }, function (err, res) {
                expect(res).to.be.an('undefined');
                expect(err.message).to.equal('API KEY is not set.');

                done();
            });
        });
    });

    describe('Echonest api key is set: ', function () {
        before(function (done) {
            Echonest.init(config.api_key, config.secret);
            done();
        });

        describe('Error case in no valid endpoint', function () {
            it('should return an error when an invalid echonest endpoint is used.', function (done) {
                Echonest.get('pane/paliases', { artist: 'Kanye West' }, function (err, res) {
                    expect(err).to.equal('<h1>596 Service Not Found</h1>');
                    done();
                });
            });
        });

        describe('Success case', function () {
            it('should return a results object.', function (done) {
                Echonest.get('name/aliases', { name: 'Kanye West' }, function (err, res) {
                    expect(res.status).to.equal('ok');
                    expect(res.aliases).to.be.an('array');

                    done();
                });
            });
        });
    });
});
