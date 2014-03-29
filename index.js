var cryptic = require('cryptic')
  , ursa = require('ursa')
  , toPem = require('ssh-key-to-pem')
  , crypto = require('crypto')
  , BlockStream = require('block-stream')
  , combine = require('stream-combiner')
  , through = require('through2')

module.exports = function (options) {
  options || (options = {});

  var publicKey, privateKey;

  if (typeof options.publicKey === 'string' && options.publicKey.indexOf('ssh-') === 0) {
    publicKey = toPem(options.publicKey);
  }
  if (options.publicKey) publicKey = ursa.coerceKey(publicKey);
  if (options.privateKey) privateKey = ursa.coerceKey(privateKey);

  return {
    readHeaders: function (stream) {
      // find headers in the stream
      // return a stream that emits 'headers' object with
      // object-format headers, and then pauses. Resume for data.
    },
    writeHeaders: function (headers) {
      // write headers object as string, in camelcase form
      // note: Hash, Secret, and Signature fields always go last,
      // in that order.
    },
    hash: function (data, encoding) {
      // perform SHA256(data), the standard hash function
      return crypto.createHash('sha256')
        .update(data, encoding)
        .digest(encoding);
    },
    hashBase: function (headers) {
      // return a standardized buffer representation of
      // object-format headers for hashing.
    },
    hashHeaders: function (headers, cb) {
      // given object-format headers, generate hashcash, observing
      // optional Difficulty header, and excluding Hash, Secret,
      // and Signature fields. Add Hash header with result, and
      // call cb() when done.
    },
    sign: function (hash, encoding) {
      // return a hex-encoding signature of a hex-encoding hash
      // using private key. encoding defaults to hex.
      encoding || (encoding = 'hex');
      if (!privateKey) throw new Error('must provide private key to sign data');
      return privateKey.sign('sha256', hash, encoding, encoding);
    },
    verify: function (hash, sig, encoding) {
      // verify a signature of a hash using public key.
      // Return true if valid, false otherwise.
      // encoding defaults to hex and applies to both hash and sig.
      if (!publicKey) throw new Error('must provide public key to verify data');
      return publicKey.verify('sha256', hash, sig, encoding || 'hex');
    },
    encrypt: function (data, encoding) {
      // encrypt data using the public key.
      if (!publicKey) throw new Error('must provide public key to encrypt data');
      return publicKey.encrypt(data, encoding);
    },
    decrypt: function (data, encoding) {
      // decrypt data using the private key.
      if (!privateKey) throw new Error('must provide private key to decrypt data');
      return privateKey.decrypt(data, encoding);
    },
    createPassword: function () {
      // generate and return a suitable random 32-byte (256-bit) buffer.
      // note that this can throw, if there isn't enough entropy.
      return crypto.randomBytes(32);
    },
    encryptStream: function (stream, password, encoding) {
      // break into blocks and return encrypted stream.
      if (!publicKey) throw new Error('must provide public key to encrypt data');

      var blockSize = publicKey.getModulus().length
        , blockStream = new BlockStream(blockSize - 42, {nopad: true})

      var encrypt = through(function (buf, e, next) {
        this.push(cryptic(password, buf, encoding).encrypt().buf);
        next();
      });

      if (encoding === 'buffer' || typeof encoding === 'undefined') {
        return combine(blocks, encrypt);
      }
      return combine(blocks, encrypt, through({encoding: encoding}));
    },
    decryptStream: function (stream, password, encoding) {
      // break into blocks and return decrypted stream.
      if (!privateKey) throw new Error('must provide private key to decrypt data');
      
      var blockSize = privateKey.getModulus().length
        , blockStream = new BlockStream(blockSize, {nopad: true})

      var decrypt = through(function (buf, e, next) {
        var plaintext;
        try {
          plaintext = cryptic(password, buf).decrypt().buf;
        }
        catch (err) {
          return this.emit('error', err);
        }
        this.push(plaintext);
        next();
      });

      if (encoding === 'buffer' || typeof encoding === 'undefined') {
        return combine(blocks, decrypt);
      }
      var toBuffer = through(function (buf, e, next) {
        this.push(Buffer(buf.toString(), encoding));
      });
      return combine(toBuffer, blocks, decrypt);
    }
  };
};
