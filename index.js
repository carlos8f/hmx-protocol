var cryptic = require('cryptic')
  , ursa = require('ursa')
  , toPem = require('ssh-key-to-pem')
  , crypto = require('crypto')
  , BlockStream = require('block-stream')
  , combine = require('stream-combiner')
  , through = require('through2')
  , fs = require('fs')
  , ss = require('stream-stream')

module.exports = function (options) {
  options || (options = {});

  var publicKey, privateKey;

  if (typeof options.publicKey === 'string' && options.publicKey.indexOf('ssh-') === 0) {
    publicKey = toPem(options.publicKey);
  }
  if (options.publicKey) publicKey = ursa.coerceKey(publicKey);
  if (options.privateKey) privateKey = ursa.coerceKey(privateKey);

  return {
    composeMessage: function (headers, stream) {
      // given headers object and stream, compose an
      // HMX message envelope and return a readable stream.
      var headers = this.writeHeaders(headers)
        , headerStream = Stream = through()

      setImmediate(function () {
        headerStream.write(headers, 'utf8');
        headerStream.end();
      });
      var stream = ss({separator: '\n'});
      stream.write(headerStream);
      stream.write(fs.createReadStream(p));
      stream.end();
      return stream;
    },
    readHeaders: function (stream) {
      // find headers in the stream
      // return a stream that emits 'headers' object, and
      // then pauses. Resume for data.
      var str = '';
      stream.on('data', function (data) {
        str += data;
        if (str.length >= 3) {
          var versionMatch = str.match(/^HMX\/(\d+)/);
        }
        str = str.replace(/\r/g, '');
        var headerEnd = str.indexOf('\n\n');
        if (~headerEnd) {
          var lines = str.substr(, headerEnd + 1)
            .split('\n')
            .filter()
        }
      });
    },
    writeHeaders: function (headers) {
      // write headers object as string, in camelcase form
      // note: Hash, Secret, and Signature fields always go last,
      // in that order.
      return keys
        .sort(function (a, b) {
          a = a.toLowerCase();
          b = b.toLowerCase();
          if (a === b) return 0;
          switch (a) {
            case 'signature': return 1;
            case 'secret': return b === 'signature' ? -1 : 1;
            case 'hash': return b.match(/^(signature|secret)$/) ? -1 : 1;
            default: return a < b ? -1 : 1;
          }
        }
        .map(function (key) {
          return key
            .split('-').map(function (part) {
              return part.charAt(0).toUpperCase() + part.substr(1).toLowerCase();
            })
            .join('-') + ': ' + headers[key];
        });
    },
    hash: function (data, encoding) {
      // perform SHA256(data), the standard hash function
      return crypto.createHash('sha256')
        .update(data, encoding)
        .digest(encoding);
    },
    hashStream: function () {
      // return a writable, readable stream. data written to the
      // stream will have its hash calculated and returned on the
      // readable end as 'data'.
      return crypto.createHash('sha256');
    },
    hashBase: function (headers, encoding) {
      // given a headers object, return a standardized
      // string (with encoding) or buffer representation for hashing.
      var headersCopy = {};
      Object.keys(headers).forEach(function (k) {
        if (!k.match(/^(hash|secret|signature)$/i)) headersCopy[k] = headers[k];
      });
      var buf = Buffer(this.writeHeaders(headersCopy), 'utf8');
      return encoding
        ? buf.toString(encoding)
        : buf;
    },
    hashHeaders: function (headers, cb) {
      // given headers object, generate hashcash, observing
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
