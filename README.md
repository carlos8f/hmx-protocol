## hmx-protocol

Library for working with HMX messages and blockchain

### private message

```
GET /jaMHiVNo_MpTmVUD

HTTP/1.1 200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Content-Length: 3473
Content-Type: application/hmx
Link: </eoiFDR1nq2libsxZvF7yiYUrfjVVyvl5iICffStv2kf>; rel="prev", </2h-92i_KZEb05u2_48JYCSnSbRZd_Hio32ZaJGJH3Vc>; rel="next"
HMX: 1.0/private
HMX-Key: igkopauD8k0GzuG8b0LLgfKMtpEOswSuqwW1OIHFpfv
HMX-Digest: nYmlRrhDTkc2SlDokGktVl9xucIUNlb1BChMUvXp1oy
HMX-Id: jaMHiVNo_MpTmVUDQH-VDDKR6x00r1Ejf1AKx-W98Ak

(encrypted private headers)
```

#### private headers

```
HMX-Location: https://mybucket.s3.amazonaws.com/myobject.encrypted
HMX-Content-Type: application/x-compressed
HMX-Content-Disposition: attachment; filename="encrypted.tar.gz"
HMX-Content-Digest: kkO7HiRigl-RUfNRNXqv-1y4qkBJCx0e-1hKleYjqsE
HMX-Cipher: aes-256-cbc
HMX-From: <carlos8f@h-mx.net> "6f:2a:cd:0b:02:19:35:ab:62:65:58:c7:91:be:32:64"
HMX-To: <alice@h-mx.net> "6f:2a:cd:0b:02:19:35:ab:62:65:58:c7:91:be:32:64"
HMX-Subject: Testing HMX
HMX-Time: 1396738992998
HMX-Signature: BQ53nHce1X-0XTlGgSIbd-kS5hF2rrRNHwtm2lpde3Y
```

### public message board

- posts are limited in byte size
- content-type MUST be `text/plain` or `text/x-markdown`.
- message MUST be signed by a registered public key
- group/thread is chosen by client but may be whitelisted/blackslisted by server

```
GET /public/comp.hackers/jaMHiVNo_MpTmVUD

HTTP/1.1 200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Content-Type: text/x-markdown
Content-Length: 3473
Link: </eoiFDR1nq2libsxZvF7yiYUrfjVVyvl5iICffStv2kf>; rel="prev", </2h-92i_KZEb05u2_48JYCSnSbRZd_Hio32ZaJGJH3Vc>; rel="next"
HMX: 1.0/public
HMX-Content-Digest: nYmlRrhDTkc2SlDokGktVl9xucIUNlb1BChMUvXp1oy
HMX-From: <carlos8f@h-mx.net> "6f:2a:cd:0b:02:19:35:ab:62:65:58:c7:91:be:32:64"
HMX-Subject: Testing HMX
HMX-Agent: node-hmx/1.0; https://h-mx.org/agent
HMX-Time: 1396738992998
HMX-Id: jaMHiVNo_MpTmVUDQH-VDDKR6x00r1Ejf1AKx-W98Ak
HMX-Signature: oqQz5gwGap7axNtsQsceTVbRtQj74wj0zptal21BpYn

(body)
```

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.
