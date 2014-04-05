## hmx-protocol

Library for working with HMX messages and blockchain

### private message

```
HTTP/1.1 200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Content-Length: 3473
Expires: Tue, 15 Nov 1994 08:12:31 GMT
Link: </0000008e7e7a68b713b81393fda98ab78f6b32bc0987b8c2f82a41dab482a32c>; rel="prev"
X-HMX: 1.0/private
X-HMX-Cipher: aes-256-cbc
X-HMX-Last: 0000008e7e7a68b713b81393fda98ab78f6b32bc0987b8c2f82a41dab482a32c
X-HMX-Key: MjE5NTRlODNhZTFjODBmZTE5MjdjNzAxY2E5OGEzYTRjNjc2MWQ4MmRjNjUyODgzMDc4MWY4YmU4YzNlNWJhNyAgLQo=
X-HMX-Digest: 408dda08d61eb5385bfd6ba1a3455c2ff1a4872a9ada0fc1a900de8373f5b018
X-HMX-Key-Digest: af43c10ec41f68befd985956812211400b202259122c7ec1ca9f4253130fe48e
X-HMX-Private: (encrypted private headers, base64)
X-HMX-Nonce: 1
X-HMX-Hash: 00000012f95b5826c2c2816fd960252302492abbbd1f8a7dadabe6f3e029d0ba

(aes-encrypted body)
```

servers can enforce:

- `Expires` header w/ maximum date
- After expires date, `GET` request returns `410 Gone`, `HEAD` returns `204 No Content`
- `Authorization` header w/ current session ID/signature (not stored, not part of hash)
- max `Content-Length` per message
- `Difficulty` for hashcash

### private message w/ external key list

```
HTTP/1.1 200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Content-Length: 3473
Expires: Tue, 15 Nov 1994 08:12:31 GMT
Link: </0000008e7e7a68b713b81393fda98ab78f6b32bc0987b8c2f82a41dab482a32c>; rel="prev", </000000ae26ee5322ef722a193a1cc01cdc41ae39b789df0d906bd6cf63d756bc>; rel="http://h-mx.org/spec/key"
X-HMX: 1.0/private
X-HMX-Cipher: aes-256-cbc
X-HMX-Last: 0000008e7e7a68b713b81393fda98ab78f6b32bc0987b8c2f82a41dab482a32c
X-HMX-Digest: 408dda08d61eb5385bfd6ba1a3455c2ff1a4872a9ada0fc1a900de8373f5b018
X-HMX-Key-Digest: af43c10ec41f68befd985956812211400b202259122c7ec1ca9f4253130fe48e
X-HMX-Private: (encrypted private headers, base64)
X-HMX-Nonce: 1
X-HMX-Hash: 00000012f95b5826c2c2816fd960252302492abbbd1f8a7dadabe6f3e029d0ba

(aes-encrypted body)
```

### key list

```
HTTP/1.1 200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Content-Length: 3473
Expires: Tue, 15 Nov 1994 08:12:31 GMT
Link: </0000008e7e7a68b713b81393fda98ab78f6b32bc0987b8c2f82a41dab482a32c>; rel="prev"
X-HMX: 1.0/key
X-HMX-Last: 0000008e7e7a68b713b81393fda98ab78f6b32bc0987b8c2f82a41dab482a32c
X-HMX-Digest: 408dda08d61eb5385bfd6ba1a3455c2ff1a4872a9ada0fc1a900de8373f5b018
X-HMX-Key-Digest: af43c10ec41f68befd985956812211400b202259122c7ec1ca9f4253130fe48e
X-HMX-Nonce: 1
X-HMX-Hash: 00000012f95b5826c2c2816fd960252302492abbbd1f8a7dadabe6f3e029d0ba

(each line constitutes an rsa-encrypted version of the same key)

QWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKeVpXWWdVM2x1ZEdndFRtOWtaU0E2UEdGMWJqNXZaR1VwS1NrCg==
YTdkYWY3NTU5ZDk3OTdhMmZlNjZiYjNiNjgzYjg5ODhlNTM2OTI4YjU1NmM3YWRmOGI5YjNlZmZhYjc0YzQ4OCAgLQo=
MjE5NTRlODNhZTFjODBmZTE5MjdjNzAxY2E5OGEzYTRjNjc2MWQ4MmRjNjUyODgzMDc4MWY4YmU4YzNlNWJhNyAgLQo=
NzhkODYwMTYxNmVlMTVmOTIxNjZmZThkZWZjZDA4ZDNmMmIxNTJhZjQ5ODExMWU4MjljZWU1MzNjZDE2NDY0YyAgLQo=
```

### public message board

```
HTTP/1.1 200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Content-Type: text/plain
Content-Length: 3473
Link: </0000008e7e7a68b713b81393fda98ab78f6b32bc0987b8c2f82a41dab482a32c>; rel="prev", <hmx://h-mx.net/groups/test>; rel="section", <hmx://h-mx.net/groups/test/threads/mcpwAqQv>; rel="subsection"
X-HMX: 1.0/public
X-HMX-Last: 0000008e7e7a68b713b81393fda98ab78f6b32bc0987b8c2f82a41dab482a32c
X-HMX-Digest: 408dda08d61eb5385bfd6ba1a3455c2ff1a4872a9ada0fc1a900de8373f5b018
X-HMX-Part: 1/1
X-HMX-From: <carlos8f@h-mx.net> "6f:2a:cd:0b:02:19:35:ab:62:65:58:c7:91:be:32:64"
X-HMX-Subject: Testing HMX
X-HMX-Group: hackers
X-HMX-Thread-Id: rHzCv3LK
X-HMX-Agent: node-hmx/1.0
X-HMX-Time: 1396738992998
X-HMX-Nonce: 1
X-HMX-Hash: 00000012f95b5826c2c2816fd960252302492abbbd1f8a7dadabe6f3e029d0ba
X-HMX-Signature: TmpNY0RrQ0FrTEpaSDZVQjN6V2NlS3hyZlI1OGVJc3ZtZjRnUDAweAo=

(body)
```

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.
