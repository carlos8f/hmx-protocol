## hmx-protocol

Library for working with HMX messages and blockchain

### private message

```
HTTP/1.1 200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Content-Length: 3473
Expires: Tue, 15 Nov 1994 08:12:31 GMT
Link: </eoiFDR1nq2libsxZvF7yiYUrfjVVyvl5iICffStv2kf>; rel="prev"
HMX: 1.0/private
HMX-Cipher: aes-256-cbc
HMX-Key: igkopauD8k0GzuG8b0LLgfKMtpEOswSuqwW1OIHFpfv
HMX-Digest: nYmlRrhDTkc2SlDokGktVl9xucIUNlb1BChMUvXp1oy
HMX-Key-Digest: oqQz5gwGap7axNtsQsceTVbRtQj74wj0zptal21BpYn
HMX-Private: (encrypted private headers, base64)
HMX-Id: jaMHiVNo_MpTmVUDQH-VDDKR6x00r1Ejf1AKx-W98Ak

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
Link: </eoiFDR1nq2libsxZvF7yiYUrfjVVyvl5iICffStv2kf>; rel="prev", </TzdNEPJ69p7LWSrL80tTDQodhTqsEaMEIv2Vbmk_KJ6>; rel="http://h-mx.org/spec/key"
HMX: 1.0/private
HMX-Cipher: aes-256-cbc
HMX-Digest: nYmlRrhDTkc2SlDokGktVl9xucIUNlb1BChMUvXp1oy
HMX-Key-Digest: eoiFDR1nq2libsxZvF7yiYUrfjVVyvl5iICffStv2kf
HMX-Private: (encrypted private headers, base64)

(aes-encrypted body)
```

### key list

```
HTTP/1.1 200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Content-Length: 3473
Expires: Tue, 15 Nov 1994 08:12:31 GMT
Link: </duI3FV22wUlx6k-pr54HvTmmbsxMb_vP4eunaYZkkw2>; rel="prev"
HMX: 1.0/key
HMX-Last: nYmlRrhDTkc2SlDokGktVl9xucIUNlb1BChMUvXp1oy
HMX-Digest: eoiFDR1nq2libsxZvF7yiYUrfjVVyvl5iICffStv2kf
HMX-Key-Digest: q5bQjv-GdCS_j1wlgiFgc6zwRh6tXsbxvmxNRibKUvP
HMX-Hash: kSjDj1PdufyYJj8axWvj7DqqHWwzdIGS_4X-HdkGlPh

(each line constitutes an rsa-encrypted version of the same key)

8kLZoiK2PqGPc1SlOwWRdVjATx6lQLdT0EynXxKttRo
duI3FV22wUlx6k-pr54HvTmmbsxMb_vP4eunaYZkkw2
oqQz5gwGap7axNtsQsceTVbRtQj74wj0zptal21BpYn
q5bQjv-GdCS_j1wlgiFgc6zwRh6tXsbxvmxNRibKUvP
```

### public message board

```
HTTP/1.1 200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Content-Type: text/plain
Content-Length: 3473
Link: </TzdNEPJ69p7LWSrL80tTDQodhTqsEaMEIv2Vbmk_KJ6>; rel="prev", <hmx://h-mx.net/groups/test>; rel="section", <hmx://h-mx.net/groups/test/threads/mcpwAqQv>; rel="subsection"
HMX: 1.0/public
HMX-Last: duI3FV22wUlx6k-pr54HvTmmbsxMb_vP4eunaYZkkw2
HMX-Digest: nYmlRrhDTkc2SlDokGktVl9xucIUNlb1BChMUvXp1oy
HMX-Part: 1/1
HMX-From: <carlos8f@h-mx.net> "6f:2a:cd:0b:02:19:35:ab:62:65:58:c7:91:be:32:64"
HMX-Subject: Testing HMX
HMX-Group: hackers
HMX-Thread-Id: rHzCv3LK
HMX-Agent: node-hmx/1.0
HMX-Time: 1396738992998
HMX-Hash: TzdNEPJ69p7LWSrL80tTDQodhTqsEaMEIv2Vbmk_KJ6
HMX-Signature: oqQz5gwGap7axNtsQsceTVbRtQj74wj0zptal21BpYn

(body)
```

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.
