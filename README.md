## hmx-protocol

Library for working with HMX messages and blockchain

## Raw message format

```
HMX/(version)
Type: (private or public)
Content-Type: (content type for body)
Content-Length: (content length for body, excluding padding)
Part: 1/1
Digest: (hash of body)
Multi-Digest: (hash of all parts, only if not Part 1/1)
Date: (RFC whatever)
To: (HMX addresses)
Cc: (HMX addresses)
Bcc: (HMX addresses)
From: (HMX address w/ fingerprint)
Subject: (my subject)
User-Agent: (HXM client user-agent that created this)
Hash: (hash of above headers)
Signature: (signature of the above Hash, using From pubkey)

(This is the plaintext message body, can contain attachments, etc)
```

## PUT key

Difficulty may be scaled based on auth, type, size, etc.

```
PUT /000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
HMX/(version)
Type: key
Last: 00000000000008a3a41b85b8b29ad444def299fee21793cd8b9e567eab02cd81 (last hash pushed to server)
Digest: (hash of body)
Difficulty: (current server difficulty)
Time: (current timestamp)
Nonce: (cryptographic nonce)
Content-Encoding: octet-stream
Content-Length: (length, probably capped/padded anyway)
Hash: 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f (hash of above headers)
--- auth part ---
Secret: (shared secret between client and server, identifies "From" pubkey
Signature: (sign the Hash using "From" pubkey)
--- end auth ---

(this is the RSA-encrypted AES key)
```

## PUT message

Capped and padded at 128kb, let's say.

```
PUT /000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
HMX/(version)
Type: (public or private)
Last: 00000000000008a3a41b85b8b29ad444def299fee21793cd8b9e567eab02cd81 (last hash pushed to server)
Digest: (hash of body)
--- public only ---
Part: 1/1
Multipart-Digest: (hash of all parts)
Content-Type: (content type of body)
--- end public ---
--- private only ---
Key: 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f (hash of key record from blockchain)
--- end private ---
Difficulty: (current server difficulty)
Time: (current timestamp)
Nonce: (cryptographic nonce)
Content-Length: (length, probably capped/padded anyway)
Hash: 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f (hash of above headers)
--- auth part ---
Secret: (shared secret between client and server, identifies "From" pubkey
Signature: (sign the Hash using "From" pubkey)
--- end auth ---

(this is the raw message, AES-encrypted if Key specified, followed by random padding)
```

Note that if a message is public, Key header is not used, and body is not encrypted or padded, but still should be capped.

Also note that for group messages, the Key header will be repeated since each recipient has the AES key RSA-encrypted specifically for them in the blockchain.

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.
