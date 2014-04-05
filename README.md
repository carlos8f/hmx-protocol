## hmx-protocol

Library for working with HMX messages and blockchain

### private message

```
HTTP/1.1 200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Content-Length: 3473
Link: </0000008e7e7a68b713b81393fda98ab78f6b32bc0987b8c2f82a41dab482a32c>; rel="prev"
X-HMX-Type: private
X-HMX-Key: 2aee42bbc5e4c4fddd82d0669630e7c73bf936b43865638bec38b95784fc645e
X-HMX-Digest: 408dda08d61eb5385bfd6ba1a3455c2ff1a4872a9ada0fc1a900de8373f5b018
X-HMX-Private: (encrypted private headers, base64)
X-HMX-Difficulty: 6
X-HMX-Nonce: 1
X-HMX-Hash: 00000012f95b5826c2c2816fd960252302492abbbd1f8a7dadabe6f3e029d0ba
X-HMX-Token: Y2NsLXBsYXktc29mdC1taWRpCj09PT09PT09PT0
X-HMX-Signature: AgICAgICAgICAgICAgIHJyZWYgU3ludGgtTm9kZSA6PGF1bj5vZGUpKSk=

(body)
```

### private message w/ external key list

```
HTTP/1.1 200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Content-Length: 3473
Link: </0000008e7e7a68b713b81393fda98ab78f6b32bc0987b8c2f82a41dab482a32c>; rel="prev", </000000ae26ee5322ef722a193a1cc01cdc41ae39b789df0d906bd6cf63d756bc>; rel="http://h-mx.org/spec/keys"
X-HMX-Type: private
X-HMX-Digest: 408dda08d61eb5385bfd6ba1a3455c2ff1a4872a9ada0fc1a900de8373f5b018
X-HMX-Private: (encrypted private headers, base64)
X-HMX-Difficulty: 6
X-HMX-Nonce: 1
X-HMX-Hash: 00000012f95b5826c2c2816fd960252302492abbbd1f8a7dadabe6f3e029d0ba
X-HMX-Token: Y2NsLXBsYXktc29mdC1taWRpCj09PT09PT09PT0
X-HMX-Signature: AgICAgICAgICAgICAgIHJyZWYgU3ludGgtTm9kZSA6PGF1bj5vZGUpKSk=

(body)
```

### key list

```
HTTP/1.1 200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Content-Length: 3473
Link: </0000008e7e7a68b713b81393fda98ab78f6b32bc0987b8c2f82a41dab482a32c>; rel="prev"
X-HMX-Type: keys
X-HMX-Digest: 408dda08d61eb5385bfd6ba1a3455c2ff1a4872a9ada0fc1a900de8373f5b018
X-HMX-Difficulty: 6
X-HMX-Nonce: 1
X-HMX-Hash: 00000012f95b5826c2c2816fd960252302492abbbd1f8a7dadabe6f3e029d0ba
X-HMX-Token: Y2NsLXBsYXktc29mdC1taWRpCj09PT09PT09PT0
X-HMX-Signature: AgICAgICAgICAgICAgIHJyZWYgU3ludGgtTm9kZSA6PGF1bj5vZGUpKSk=

876eb14acb3cd7a45f579768c06348afd4cb0ce9a44ba2900a1b6ea97738a19e carlos8f@h-mx.net
095a2daf3b2379394505b647297ca69ff83c54dcb9fb12f0f535a45d29ab9a41
1487e42256b263bb7c5a32d21cdfb254d5616f531b397108d5d64813dbdcb64b
fde06efaf57c164f6e87c451ef29b70f867cdcac64273274737ecb39d094bd0a chris
```

### public message board

```
HTTP/1.1 200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Content-Type: text/plain
Content-Length: 3473
Link: <hmx://h-mx.net/groups/test>; rel="section", <hmx://h-mx.net/groups/test/threads/mcpwAqQv>; rel="subsection"
X-HMX-Type: public
X-HMX-Last: 0000008e7e7a68b713b81393fda98ab78f6b32bc0987b8c2f82a41dab482a32c
X-HMX-Digest: 408dda08d61eb5385bfd6ba1a3455c2ff1a4872a9ada0fc1a900de8373f5b018
X-HMX-Part: 1/1
X-HMX-Multi-Digest: de64152f540f23b96a179e489ba3dacaf579dc8dc23ccc5a546f97660f174be1
X-HMX-From: carlos8f@h-mx.net
X-HMX-Subject: Testing HMX
X-HMX-Agent: node-hmx/1.0
X-HMX-Difficulty: 6
X-HMX-Nonce: 1
X-HMX-Hash: 00000012f95b5826c2c2816fd960252302492abbbd1f8a7dadabe6f3e029d0ba
X-HMX-Token: Y2NsLXBsYXktc29mdC1taWRpCj09PT09PT09PT0
X-HMX-Signature: AgICAgICAgICAgICAgIHJyZWYgU3ludGgtTm9kZSA6PGF1bj5vZGUpKSk=

(body)
```


- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.
