import { CheckCircledIcon, Cross2Icon } from '@radix-ui/react-icons'

import {
  KeyLike,
  SignJWT,
  decodeJwt,
  decodeProtectedHeader,
  importJWK,
  importPKCS8,
  importSPKI,
  jwtVerify
} from 'jose'
import { useRef, useState } from 'react'
import MoreInformation from '../../components/MoreInformation'
import ButtonClear from '../../components/ui/ButtonClear'
import ButtonClipboard from '../../components/ui/ButtonClipboard'
import ButtonCopy from '../../components/ui/ButtonCopy'
import ButtonSample from '../../components/ui/ButtonSample'
import { Input } from '../../components/ui/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/Select'
import { Textarea } from '../../components/ui/Textarea'
import { cn } from '../../lib/utils'
import './jwt.scss'

const defaultValue = {
  algorithm: 'HS256',
  header: {
    alg: 'HS256',
    typ: 'JWT'
  },
  payload: {
    sub: '1234567890',
    name: 'John Doe',
    admin: true,
    iat: 1516239022
  },
  secret: 'my-secret',
  verified: true
}

export default function Jwt() {
  const jwtInputRef = useRef<HTMLTextAreaElement>(null)
  const [jwt, setJwtValue] = useState(getSampleJwt(defaultValue.algorithm))

  const headerInputRef = useRef<HTMLTextAreaElement>(null)
  const [headerInputValue, setHeaderInputValue] = useState(
    JSON.stringify(defaultValue.header, null, 2)
  )
  const payloadInputRef = useRef<HTMLTextAreaElement>(null)
  const [payloadInputValue, setPayloadInputValue] = useState(
    JSON.stringify(defaultValue.payload, null, 2)
  )

  const [algorithm, setAlgorithm] = useState(defaultValue.algorithm)
  const [isSignatureVerified, setIsSignatureVerified] = useState<boolean>(defaultValue.verified)

  const inputSecretRef = useRef<HTMLInputElement>(null)
  const [secretValue, setSecretValue] = useState(defaultValue.secret)
  const publicKeyRef = useRef<HTMLTextAreaElement>(null)
  const [publicKeyValue, setPublicKeyValue] = useState('')
  const privateKeyRef = useRef<HTMLTextAreaElement>(null)
  const [privateKeyValue, setPrivateKeyValue] = useState('')

  const handleJwtInputChanged = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJwtValue(event.target.value)
    await parseHeader(event.target.value)
    await parsePayload(event.target.value)
    await verifySignature({
      algorithm,
      jwt: event.target.value,
      secret: secretValue,
      publicKey: publicKeyValue
    })
  }

  const handleHeaderInputChanged = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHeaderInputValue(event.target.value)
    try {
      const header = JSON.parse(event.target.value)
      const algo = header?.alg
      const supportedAlgos = algorithms.map(algo => algo.value)
      if (algo && supportedAlgos.includes(algo.toUpperCase())) {
        setAlgorithm(algo.toUpperCase())
        await signJWT(JSON.stringify({ ...header, alg: algo.toUpperCase() }), payloadInputValue)
      }
    } catch (e) {
      setJwtValue('Cannot sign JWT because of invalid header!')
      setIsSignatureVerified(false)
    }
  }

  const handlePayloadInputChanged = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPayloadInputValue(event.target.value)
    await signJWT(headerInputValue, event.target.value)
  }

  const handleJwtClipboardClicked = async (text: string) => {
    setJwtValue(text)
    await parseHeader(text)
    await parsePayload(text)
    await verifySignature({
      algorithm,
      jwt: text,
      secret: secretValue,
      publicKey: publicKeyValue
    })
  }

  const handleSampleClicked = async () => {
    if (!headerInputValue || headerInputValue === '{}') {
      setHeaderInputValue(JSON.stringify(defaultValue.header, null, 2))
    }

    let payload = payloadInputValue
    if (!payloadInputValue || payloadInputValue === '{}') {
      payload = JSON.stringify(defaultValue.payload, null, 2)
      setPayloadInputValue(payload)
    }

    if (!algorithm.startsWith('HS')) {
      const [publicKey, privateKey] = getPublicPrivateKeys(algorithm)
      if (!publicKeyValue) {
        setPublicKeyValue(publicKey)
        await verifySignature({ algorithm, jwt, secret: secretValue, publicKey })
      }
      if (!privateKeyValue) {
        setPrivateKeyValue(privateKey)
        const jwt = await signJWTWithPrivateKey({
          header: JSON.stringify({ alg: algorithm, typ: 'JWT' }),
          payload,
          key: privateKey
        })
        setJwtValue(jwt)
        await verifySignature({
          algorithm,
          jwt,
          secret: secretValue,
          publicKey: publicKeyValue || publicKey
        })
      }
    } else {
      if (!secretValue) {
        setSecretValue(defaultValue.secret)
        const jwt = await signJWTWithSecret({
          header: JSON.stringify({ alg: algorithm, typ: 'JWT' }),
          payload,
          key: defaultValue.secret
        })
        setJwtValue(jwt)
        await verifySignature({
          algorithm,
          jwt,
          secret: defaultValue.secret,
          publicKey: publicKeyValue
        })
      }
    }
  }

  const handleClearClicked = () => {
    setJwtValue('')
    setHeaderInputValue('{}')
    setPayloadInputValue('{}')
    setSecretValue('')
    setPublicKeyValue('')
    setPrivateKeyValue('')
  }

  const handleSelectAlgorithmChanged = async (algo: string) => {
    setAlgorithm(algo)

    // Change header
    const header = { alg: algo, typ: 'JWT' }
    setHeaderInputValue(JSON.stringify(header, null, 2))

    // Sign jwt
    await signJWT(JSON.stringify(header), payloadInputValue)
  }

  async function signJWT(header: string, payload: string) {
    try {
      const headerObj = JSON.parse(header)
      const algo = headerObj?.alg
      if (!algo) throw new Error('Invalid header')
      let jwt = ''
      if (algo.startsWith('HS')) {
        jwt = await signJWTWithSecret({
          header: JSON.stringify(headerObj),
          payload,
          key: secretValue
        })
      } else {
        jwt = await signJWTWithPrivateKey({
          header: JSON.stringify(headerObj),
          payload,
          key: privateKeyValue
        })
      }
      setJwtValue(jwt)
      await verifySignature({
        algorithm: algo,
        jwt,
        secret: secretValue,
        publicKey: publicKeyValue
      })
    } catch (error) {
      setJwtValue('Cannot sign JWT!')
      setIsSignatureVerified(false)
    }
  }

  async function parseHeader(jwt: string) {
    try {
      const protectedHeader = decodeProtectedHeader(jwt)
      setHeaderInputValue(JSON.stringify(protectedHeader, null, 2))
    } catch (error) {
      setHeaderInputValue('{}')
    }
  }

  async function parsePayload(jwt: string) {
    try {
      const claims = decodeJwt(jwt)
      setPayloadInputValue(JSON.stringify(claims, null, 2))
    } catch (error) {
      setPayloadInputValue('{}')
    }
  }

  async function verifySignature(options: {
    algorithm: string
    jwt: string
    secret: string
    publicKey: string
  }) {
    const { algorithm: algo, jwt, secret: secretVal, publicKey: publicKeyVal } = options
    try {
      if (algo.startsWith('HS')) {
        const secret = new TextEncoder().encode(secretVal)
        await jwtVerify(jwt, secret)
        setIsSignatureVerified(true)
      } else {
        const publicKey = await importSPKI(publicKeyVal, algo)
        await jwtVerify(jwt, publicKey)
        setIsSignatureVerified(true)
      }
    } catch (error) {
      setIsSignatureVerified(false)
    }
  }

  const handlePrivateKeyChanged = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrivateKeyValue(event.target.value)
    const jwt = await signJWTWithPrivateKey({
      header: JSON.stringify({ alg: algorithm, typ: 'JWT' }),
      payload: payloadInputValue,
      key: event.target.value
    })
    setJwtValue(jwt)
    await verifySignature({ algorithm, jwt, secret: secretValue, publicKey: publicKeyValue })
  }

  const handleSecretChanged = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecretValue(event.target.value)
    const jwt = await signJWTWithSecret({
      header: JSON.stringify({ alg: algorithm, typ: 'JWT' }),
      payload: payloadInputValue,
      key: event.target.value
    })
    setJwtValue(jwt)
    await verifySignature({
      algorithm,
      jwt,
      secret: event.target.value,
      publicKey: publicKeyValue
    })
  }

  const handlePublicKeyChanged = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPublicKeyValue(event.target.value)
    await verifySignature({
      algorithm,
      jwt,
      secret: secretValue,
      publicKey: event.target.value
    })
  }

  async function signJWTWithPrivateKey(options: {
    header: string
    payload: string
    key: string
  }): Promise<string> {
    const { header, payload, key } = options
    try {
      const headerObj = JSON.parse(header)
      const alg = headerObj?.alg
      if (!alg) throw new Error('Invalid header')
      const payloadObj = JSON.parse(payload)
      let privateKey: KeyLike | Uint8Array
      // PKCS#8
      try {
        privateKey = await importPKCS8(key, alg)
      } catch (err) {
        // JWK String format
        try {
          const jwk = JSON.parse(key)
          privateKey = await importJWK(jwk, alg)
        } catch (e) {
          throw new Error('Invalid key')
        }
      }
      const jwt = await new SignJWT(payloadObj).setProtectedHeader(headerObj).sign(privateKey)
      return jwt
    } catch (err) {
      setIsSignatureVerified(false)
      return 'Cannot sign JWT with given private key, public key and payload!'
    }
  }

  async function signJWTWithSecret(options: {
    header: string
    payload: string
    key: string
  }): Promise<string> {
    const { header, payload, key } = options
    try {
      const headerObj = JSON.parse(header)
      const payloadObj = JSON.parse(payload)
      const secret = new TextEncoder().encode(key)
      const jwt = await new SignJWT(payloadObj).setProtectedHeader(headerObj).sign(secret)
      return jwt
    } catch (err) {
      setIsSignatureVerified(false)
      return 'Cannot sign JWT with given secret and payload!'
    }
  }

  return (
    <div className="flex flex-col w-full gap-4 2xl:flex-row">
      {/* Encoded */}
      <div className="flex flex-col flex-1 gap-3 h-fit">
        <div className="flex flex-row flex-wrap gap-4">
          <div className="flex flex-row flex-wrap items-center gap-2">
            <div className="font-medium">Encoded</div>
            <Select
              defaultValue={defaultValue.algorithm}
              onValueChange={handleSelectAlgorithmChanged}
              name="algorithm-selection"
              value={algorithm}
            >
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="Select a version" />
              </SelectTrigger>
              <SelectContent>
                {algorithms.map(({ value, name }) => (
                  <SelectItem data-testid="select-option" key={value} value={value}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ButtonCopy text={jwt} />
            <ButtonClipboard handleClipText={handleJwtClipboardClicked} />
            <ButtonSample onClick={handleSampleClicked} />
            <ButtonClear onClick={handleClearClicked} disabled={!jwt} />
          </div>
          {jwt && (
            <div
              className={cn('flex items-center', {
                'text-success': isSignatureVerified,
                'text-danger': !isSignatureVerified
              })}
            >
              {isSignatureVerified && (
                <>
                  <CheckCircledIcon className="w-4 h-4 mr-1.5" />
                  Signature Verified
                </>
              )}
              {!isSignatureVerified && (
                <>
                  <Cross2Icon className="w-4 h-4 mr-1.5" />
                  Invalid Signature
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex-1 min-h-0">
          <div className="relative w-full h-full min-h-[150px]">
            {/* Make sure the classes are the same as the ones in Textarea component! */}
            <div
              className="absolute top-0 left-0 w-full h-full max-h-full px-3 py-2 text-sm break-words db-scrollbar dark:bg-[#1C1F27] font-mono border rounded-md"
              dangerouslySetInnerHTML={{ __html: getMarkup(jwt) }}
            ></div>
            <Textarea
              data-el="encoded-input"
              className="absolute top-0 left-0 w-full h-full text-transparent !bg-transparent db-scrollbar max-h-full resize-none font-mono"
              ref={jwtInputRef}
              value={jwt}
              onChange={handleJwtInputChanged}
              placeholder={
                'Type the encoded string here or click the "Sample" button to load the sample data.'
              }
            />
          </div>
        </div>
      </div>

      {/* Decoded */}
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-col flex-1 min-h-0 gap-4 md:flex-row 2xl:flex-col">
          <div className="flex flex-col flex-1 gap-3">
            <div className="flex flex-row flex-wrap items-center gap-4">
              <div className="font-medium">Header</div>
              <ButtonCopy text={headerInputValue} />
            </div>
            <div className="flex-1 min-h-0">
              <Textarea
                className="h-full min-h-[100px] max-h-full font-mono text-red-600 resize-none db-scrollbar dark:text-red-400"
                ref={headerInputRef}
                value={headerInputValue}
                onChange={handleHeaderInputChanged}
                placeholder={'{}'}
              />
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-3">
            <div className="flex flex-row flex-wrap items-center gap-4">
              <div className="font-medium">Payload</div>
              <ButtonCopy text={payloadInputValue} />
            </div>
            <div className="flex-1 min-h-0">
              <Textarea
                className="h-full min-h-[150px] max-h-full font-mono resize-none db-scrollbar text-fuchsia-600 dark:text-fuchsia-400"
                ref={payloadInputRef}
                value={payloadInputValue}
                onChange={handlePayloadInputChanged}
                placeholder={'{}'}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center flex-1 gap-3">
            <div className="flex items-center font-medium">
              Verify Signature
              <MoreInformation text='Click "Sample" button to load the sample data.' />
            </div>
            <div className="flex-1 min-h-0 text-sm">
              <div className="flex flex-col w-full h-full gap-2 p-3 overflow-auto font-mono border bg-accent">
                <div>{`${algoSignNameMap[`${algorithm}`]}(`}</div>
                <div className="pl-6 whitespace-nowrap">{`base64UrlEncode(header) + "." +`}</div>
                <div className="pl-6 whitespace-nowrap">{`base64UrlEncode(payload),`}</div>
                {algorithm.startsWith('HS') && (
                  <div className="pl-6">
                    <Input
                      ref={inputSecretRef}
                      value={secretValue}
                      onChange={handleSecretChanged}
                      type="text"
                      className="w-full bg-background h-7"
                      placeholder="your-secret"
                    />
                  </div>
                )}
                {!algorithm.startsWith('HS') && (
                  <div className="flex flex-col flex-1 min-h-0 gap-2 pl-6">
                    <Textarea
                      ref={publicKeyRef}
                      value={publicKeyValue}
                      onChange={handlePublicKeyChanged}
                      placeholder="Public key in SPKI, X.509 Certificate or JWK string format..."
                      className="flex-1 h-24 text-xs resize-none bg-background db-scrollbar"
                    />
                    <Textarea
                      ref={privateKeyRef}
                      value={privateKeyValue}
                      onChange={handlePrivateKeyChanged}
                      placeholder="Private key in PKCS #8, or JWK string format. The key never leaves your browser."
                      className="flex-1 h-24 text-xs resize-none bg-background db-scrollbar"
                    />
                  </div>
                )}
                <div>{`)`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getMarkup = (decoded: string) => {
  if (!decoded) return ''
  if (decoded.split('.').length === 0) return decoded
  let [firstPart, secondPart, rest] = ['', '', '']
  if (decoded.split('.').length >= 1) {
    firstPart = `<span class="text-danger">${decoded.split('.')[0]}</span>`
  }
  if (decoded.split('.').length >= 2) {
    secondPart = `.<span class="text-fuchsia-600 dark:text-fuchsia-400">${
      decoded.split('.')[1]
    }</span>`
  }
  if (decoded.split('.').length >= 3) {
    rest = `.<span class="text-sky-600 dark:text-sky-400">${decoded
      .split('.')
      .slice(2)
      .join('.')}</span>`
  }
  return `${firstPart}${secondPart}${rest}`
}

const algorithms = [
  { value: 'HS256', name: 'HS256' },
  { value: 'HS384', name: 'HS384' },
  { value: 'HS512', name: 'HS512' },
  { value: 'RS256', name: 'RS256' },
  { value: 'RS384', name: 'RS384' },
  { value: 'RS512', name: 'RS512' },
  { value: 'ES256', name: 'ES256' },
  { value: 'ES384', name: 'ES384' },
  { value: 'ES512', name: 'ES512' },
  { value: 'PS256', name: 'PS256' },
  { value: 'PS384', name: 'PS384' },
  { value: 'PS512', name: 'PS512' }
]

const algoSignNameMap: Record<string, string> = {
  HS256: 'HMACSHA256',
  HS384: 'HMACSHA384',
  HS512: 'HMACSHA512',
  RS256: 'RSASHA256',
  RS384: 'RSASHA384',
  RS512: 'RSASHA512',
  ES256: 'ECDSASHA256',
  ES384: 'ECDSASHA384',
  ES512: 'ECDSASHA512',
  PS256: 'RSAPSSSHA256',
  PS384: 'RSAPSSSHA384',
  PS512: 'RSAPSSSHA512'
}

const getPublicPrivateKeys = (algo: string) => {
  let [publicKey, privateKey] = ['', '']

  if (algo.startsWith('RS')) {
    publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo
4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0/IzW7yWR7QkrmBL7jTKEn5u
+qKhbwKfBstIs+bMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyeh
kd3qqGElvW/VDL5AaWTg0nLVkjRo9z+40RQzuVaE8AkAFmxZzow3x+VJYKdjykkJ
0iT9wCS0DRTXu269V264Vf/3jvredZiKRkgwlL9xNAwxXFg0x/XFw005UWVRIkdg
cKWTjpBP2dPwVZ4WWC+9aGVd+Gyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbc
mwIDAQAB
-----END PUBLIC KEY-----`
    privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC7VJTUt9Us8cKj
MzEfYyjiWA4R4/M2bS1GB4t7NXp98C3SC6dVMvDuictGeurT8jNbvJZHtCSuYEvu
NMoSfm76oqFvAp8Gy0iz5sxjZmSnXyCdPEovGhLa0VzMaQ8s+CLOyS56YyCFGeJZ
qgtzJ6GR3eqoYSW9b9UMvkBpZODSctWSNGj3P7jRFDO5VoTwCQAWbFnOjDfH5Ulg
p2PKSQnSJP3AJLQNFNe7br1XbrhV//eO+t51mIpGSDCUv3E0DDFcWDTH9cXDTTlR
ZVEiR2BwpZOOkE/Z0/BVnhZYL71oZV34bKfWjQIt6V/isSMahdsAASACp4ZTGtwi
VuNd9tybAgMBAAECggEBAKTmjaS6tkK8BlPXClTQ2vpz/N6uxDeS35mXpqasqskV
laAidgg/sWqpjXDbXr93otIMLlWsM+X0CqMDgSXKejLS2jx4GDjI1ZTXg++0AMJ8
sJ74pWzVDOfmCEQ/7wXs3+cbnXhKriO8Z036q92Qc1+N87SI38nkGa0ABH9CN83H
mQqt4fB7UdHzuIRe/me2PGhIq5ZBzj6h3BpoPGzEP+x3l9YmK8t/1cN0pqI+dQwY
dgfGjackLu/2qH80MCF7IyQaseZUOJyKrCLtSD/Iixv/hzDEUPfOCjFDgTpzf3cw
ta8+oE4wHCo1iI1/4TlPkwmXx4qSXtmw4aQPz7IDQvECgYEA8KNThCO2gsC2I9PQ
DM/8Cw0O983WCDY+oi+7JPiNAJwv5DYBqEZB1QYdj06YD16XlC/HAZMsMku1na2T
N0driwenQQWzoev3g2S7gRDoS/FCJSI3jJ+kjgtaA7Qmzlgk1TxODN+G1H91HW7t
0l7VnL27IWyYo2qRRK3jzxqUiPUCgYEAx0oQs2reBQGMVZnApD1jeq7n4MvNLcPv
t8b/eU9iUv6Y4Mj0Suo/AU8lYZXm8ubbqAlwz2VSVunD2tOplHyMUrtCtObAfVDU
AhCndKaA9gApgfb3xw1IKbuQ1u4IF1FJl3VtumfQn//LiH1B3rXhcdyo3/vIttEk
48RakUKClU8CgYEAzV7W3COOlDDcQd935DdtKBFRAPRPAlspQUnzMi5eSHMD/ISL
DY5IiQHbIH83D4bvXq0X7qQoSBSNP7Dvv3HYuqMhf0DaegrlBuJllFVVq9qPVRnK
xt1Il2HgxOBvbhOT+9in1BzA+YJ99UzC85O0Qz06A+CmtHEy4aZ2kj5hHjECgYEA
mNS4+A8Fkss8Js1RieK2LniBxMgmYml3pfVLKGnzmng7H2+cwPLhPIzIuwytXywh
2bzbsYEfYx3EoEVgMEpPhoarQnYPukrJO4gwE2o5Te6T5mJSZGlQJQj9q4ZB2Dfz
et6INsK0oG8XVGXSpQvQh3RUYekCZQkBBFcpqWpbIEsCgYAnM3DQf3FJoSnXaMhr
VBIovic5l0xFkEHskAjFTevO86Fsz1C2aSeRKSqGFoOQ0tmJzBEs1R6KqnHInicD
TQrKhArgLXX4v3CddjfTRJkFWDbE/CkvKZNOrcf1nhaGCPspRJj2KUkj1Fhl9Cnc
dn/RsYEONbwQSjIfMPkvxF+8HQ==
-----END PRIVATE KEY-----`
  }

  if (algo.startsWith('PS')) {
    publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo
4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0/IzW7yWR7QkrmBL7jTKEn5u
+qKhbwKfBstIs+bMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyeh
kd3qqGElvW/VDL5AaWTg0nLVkjRo9z+40RQzuVaE8AkAFmxZzow3x+VJYKdjykkJ
0iT9wCS0DRTXu269V264Vf/3jvredZiKRkgwlL9xNAwxXFg0x/XFw005UWVRIkdg
cKWTjpBP2dPwVZ4WWC+9aGVd+Gyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbc
mwIDAQAB
-----END PUBLIC KEY-----`
    privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC7VJTUt9Us8cKj
MzEfYyjiWA4R4/M2bS1GB4t7NXp98C3SC6dVMvDuictGeurT8jNbvJZHtCSuYEvu
NMoSfm76oqFvAp8Gy0iz5sxjZmSnXyCdPEovGhLa0VzMaQ8s+CLOyS56YyCFGeJZ
qgtzJ6GR3eqoYSW9b9UMvkBpZODSctWSNGj3P7jRFDO5VoTwCQAWbFnOjDfH5Ulg
p2PKSQnSJP3AJLQNFNe7br1XbrhV//eO+t51mIpGSDCUv3E0DDFcWDTH9cXDTTlR
ZVEiR2BwpZOOkE/Z0/BVnhZYL71oZV34bKfWjQIt6V/isSMahdsAASACp4ZTGtwi
VuNd9tybAgMBAAECggEBAKTmjaS6tkK8BlPXClTQ2vpz/N6uxDeS35mXpqasqskV
laAidgg/sWqpjXDbXr93otIMLlWsM+X0CqMDgSXKejLS2jx4GDjI1ZTXg++0AMJ8
sJ74pWzVDOfmCEQ/7wXs3+cbnXhKriO8Z036q92Qc1+N87SI38nkGa0ABH9CN83H
mQqt4fB7UdHzuIRe/me2PGhIq5ZBzj6h3BpoPGzEP+x3l9YmK8t/1cN0pqI+dQwY
dgfGjackLu/2qH80MCF7IyQaseZUOJyKrCLtSD/Iixv/hzDEUPfOCjFDgTpzf3cw
ta8+oE4wHCo1iI1/4TlPkwmXx4qSXtmw4aQPz7IDQvECgYEA8KNThCO2gsC2I9PQ
DM/8Cw0O983WCDY+oi+7JPiNAJwv5DYBqEZB1QYdj06YD16XlC/HAZMsMku1na2T
N0driwenQQWzoev3g2S7gRDoS/FCJSI3jJ+kjgtaA7Qmzlgk1TxODN+G1H91HW7t
0l7VnL27IWyYo2qRRK3jzxqUiPUCgYEAx0oQs2reBQGMVZnApD1jeq7n4MvNLcPv
t8b/eU9iUv6Y4Mj0Suo/AU8lYZXm8ubbqAlwz2VSVunD2tOplHyMUrtCtObAfVDU
AhCndKaA9gApgfb3xw1IKbuQ1u4IF1FJl3VtumfQn//LiH1B3rXhcdyo3/vIttEk
48RakUKClU8CgYEAzV7W3COOlDDcQd935DdtKBFRAPRPAlspQUnzMi5eSHMD/ISL
DY5IiQHbIH83D4bvXq0X7qQoSBSNP7Dvv3HYuqMhf0DaegrlBuJllFVVq9qPVRnK
xt1Il2HgxOBvbhOT+9in1BzA+YJ99UzC85O0Qz06A+CmtHEy4aZ2kj5hHjECgYEA
mNS4+A8Fkss8Js1RieK2LniBxMgmYml3pfVLKGnzmng7H2+cwPLhPIzIuwytXywh
2bzbsYEfYx3EoEVgMEpPhoarQnYPukrJO4gwE2o5Te6T5mJSZGlQJQj9q4ZB2Dfz
et6INsK0oG8XVGXSpQvQh3RUYekCZQkBBFcpqWpbIEsCgYAnM3DQf3FJoSnXaMhr
VBIovic5l0xFkEHskAjFTevO86Fsz1C2aSeRKSqGFoOQ0tmJzBEs1R6KqnHInicD
TQrKhArgLXX4v3CddjfTRJkFWDbE/CkvKZNOrcf1nhaGCPspRJj2KUkj1Fhl9Cnc
dn/RsYEONbwQSjIfMPkvxF+8HQ==
-----END PRIVATE KEY-----`
  }

  if (algo === 'ES256') {
    publicKey = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEEVs/o5+uQbTjL3chynL4wXgUg2R9
q9UU8I5mEovUf86QZ7kOBIjJwqnzD1omageEHWwHdBO6B+dFabmdT9POxg==
-----END PUBLIC KEY-----`
    privateKey = `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgevZzL1gdAFr88hb2
OF/2NxApJCzGCEDdfSp6VQO30hyhRANCAAQRWz+jn65BtOMvdyHKcvjBeBSDZH2r
1RTwjmYSi9R/zpBnuQ4EiMnCqfMPWiZqB4QdbAd0E7oH50VpuZ1P087G
-----END PRIVATE KEY-----`
  }

  if (algo === 'ES384') {
    publicKey = `-----BEGIN PUBLIC KEY-----
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEC1uWSXj2czCDwMTLWV5BFmwxdM6PX9p+
Pk9Yf9rIf374m5XP1U8q79dBhLSIuaojsvOT39UUcPJROSD1FqYLued0rXiooIii
1D3jaW6pmGVJFhodzC31cy5sfOYotrzF
-----END PUBLIC KEY-----`
    privateKey = `-----BEGIN PRIVATE KEY-----
MIG2AgEAMBAGByqGSM49AgEGBSuBBAAiBIGeMIGbAgEBBDCAHpFQ62QnGCEvYh/p
E9QmR1C9aLcDItRbslbmhen/h1tt8AyMhskeenT+rAyyPhGhZANiAAQLW5ZJePZz
MIPAxMtZXkEWbDF0zo9f2n4+T1h/2sh/fviblc/VTyrv10GEtIi5qiOy85Pf1RRw
8lE5IPUWpgu553SteKigiKLUPeNpbqmYZUkWGh3MLfVzLmx85ii2vMU=
-----END PRIVATE KEY-----`
  }

  if (algo === 'ES512') {
    publicKey = `-----BEGIN PUBLIC KEY-----
MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQBgc4HZz+/fBbC7lmEww0AO3NK9wVZ
PDZ0VEnsaUFLEYpTzb90nITtJUcPUbvOsdZIZ1Q8fnbquAYgxXL5UgHMoywAib47
6MkyyYgPk0BXZq3mq4zImTRNuaU9slj9TVJ3ScT3L1bXwVuPJDzpr5GOFpaj+WwM
Al8G7CqwoJOsW7Kddns=
-----END PUBLIC KEY-----`
    privateKey = `-----BEGIN PRIVATE KEY-----
MIHuAgEAMBAGByqGSM49AgEGBSuBBAAjBIHWMIHTAgEBBEIBiyAa7aRHFDCh2qga
9sTUGINE5jHAFnmM8xWeT/uni5I4tNqhV5Xx0pDrmCV9mbroFtfEa0XVfKuMAxxf
Z6LM/yKhgYkDgYYABAGBzgdnP798FsLuWYTDDQA7c0r3BVk8NnRUSexpQUsRilPN
v3SchO0lRw9Ru86x1khnVDx+duq4BiDFcvlSAcyjLACJvjvoyTLJiA+TQFdmrear
jMiZNE25pT2yWP1NUndJxPcvVtfBW48kPOmvkY4WlqP5bAwCXwbsKrCgk6xbsp12
ew==
-----END PRIVATE KEY-----`
  }

  return [publicKey, privateKey]
}

const getSampleJwt = (algo: string) => {
  switch (algo) {
    case 'HS256':
    default:
      return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.9SFk6mAZNpAgobLvAv9Z1G3ZWSnKuFdjkNVkPqRd5aw'

    case 'HS384':
      return 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.0tiCmlRdKoGYNDY8Dwvj2GOMT_OHk2BuubakATgzm5xCnC8Um0YlQAsh0oN9ugav'

    case 'HS512':
      return 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.MPdf3CfcpNGY018ydPyokSw36FUXE1-iyGfEnedvY1lGf0CnNXJUSKasVTMw_rgZVBF5Kdm20831IijYq1cRSQ'

    case 'RS256':
      return 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ'

    case 'RS384':
      return 'eyJhbGciOiJSUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.o1hC1xYbJolSyh0-bOY230w22zEQSk5TiBfc-OCvtpI2JtYlW-23-8B48NpATozzMHn0j3rE0xVUldxShzy0xeJ7vYAccVXu2Gs9rnTVqouc-UZu_wJHkZiKBL67j8_61L6SXswzPAQu4kVDwAefGf5hyYBUM-80vYZwWPEpLI8K4yCBsF6I9N1yQaZAJmkMp_Iw371Menae4Mp4JusvBJS-s6LrmG2QbiZaFaxVJiW8KlUkWyUCns8-qFl5OMeYlgGFsyvvSHvXCzQrsEXqyCdS4tQJd73ayYA4SPtCb9clz76N1zE5WsV4Z0BYrxeb77oA7jJhh994RAPzCG0hmQ'

    case 'RS512':
      return 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.jYW04zLDHfR1v7xdrW3lCGZrMIsVe0vWCfVkN2DRns2c3MN-mcp_-RE6TN9umSBYoNV-mnb31wFf8iun3fB6aDS6m_OXAiURVEKrPFNGlR38JSHUtsFzqTOj-wFrJZN4RwvZnNGSMvK3wzzUriZqmiNLsG8lktlEn6KA4kYVaM61_NpmPHWAjGExWv7cjHYupcjMSmR8uMTwN5UuAwgW6FRstCJEfoxwb0WKiyoaSlDuIiHZJ0cyGhhEmmAPiCwtPAwGeaL1yZMcp0p82cpTQ5Qb-7CtRov3N4DcOHgWYk6LomPR5j5cCkePAz87duqyzSMpCB0mCOuE3CU2VMtGeQ'

    case 'ES256': {
      return 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.tyh-VfuzIxCyGYDlkBA7DfyjrqmSHu6pQ2hoZuFqUSLPNY2N0mpHb3nk5K17HWP_3cYHBw7AhHale5wky6-sVA'
    }

    case 'ES384': {
      return 'eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.VUPWQZuClnkFbaEKCsPy7CZVMh5wxbCSpaAWFLpnTe9J0--PzHNeTFNXCrVHysAa3eFbuzD8_bLSsgTKC8SzHxRVSj5eN86vBPo_1fNfE7SHTYhWowjY4E_wuiC13yoj'
    }

    case 'ES512': {
      return 'eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.AbVUinMiT3J_03je8WTOIl-VdggzvoFgnOsdouAs-DLOtQzau9valrq-S6pETyi9Q18HH-EuwX49Q7m3KC0GuNBJAc9Tksulgsdq8GqwIqZqDKmG7hNmDzaQG1Dpdezn2qzv-otf3ZZe-qNOXUMRImGekfQFIuH_MjD2e8RZyww6lbZk'
    }

    case 'PS256':
      return 'eyJhbGciOiJQUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.iOeNU4dAFFeBwNj6qdhdvm-IvDQrTa6R22lQVJVuWJxorJfeQww5Nwsra0PjaOYhAMj9jNMO5YLmud8U7iQ5gJK2zYyepeSuXhfSi8yjFZfRiSkelqSkU19I-Ja8aQBDbqXf2SAWA8mHF8VS3F08rgEaLCyv98fLLH4vSvsJGf6ueZSLKDVXz24rZRXGWtYYk_OYYTVgR1cg0BLCsuCvqZvHleImJKiWmtS0-CymMO4MMjCy_FIl6I56NqLE9C87tUVpo1mT-kbg5cHDD8I7MjCW5Iii5dethB4Vid3mZ6emKjVYgXrtkOQ-JyGMh6fnQxEFN1ft33GX2eRHluK9eg'

    case 'PS384':
      return 'eyJhbGciOiJQUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.Lfe_aCQme_gQpUk9-6l9qesu0QYZtfdzfy08w8uqqPH_gnw-IVyQwyGLBHPFBJHMbifdSMxPjJjkCD0laIclhnBhowILu6k66_5Y2z78GHg8YjKocAvB-wSUiBhuV6hXVxE5emSjhfVz2OwiCk2bfk2hziRpkdMvfcITkCx9dmxHU6qcEIsTTHuH020UcGayB1-IoimnjTdCsV1y4CMr_ECDjBrqMdnontkqKRIM1dtmgYFsJM6xm7ewi_ksG_qZHhaoBkxQ9wq9OVQRGiSZYowCp73d2BF3jYMhdmv2JiaUz5jRvv6lVU7Quq6ylVAlSPxeov9voYHO1mgZFCY1kQ'

    case 'PS512':
      return 'eyJhbGciOiJQUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.J5W09-rNx0pt5_HBiydR-vOluS6oD-RpYNa8PVWwMcBDQSXiw6-EPW8iSsalXPspGj3ouQjAnOP_4-zrlUUlvUIt2T79XyNeiKuooyIFvka3Y5NnGiOUBHWvWcWp4RcQFMBrZkHtJM23sB5D7Wxjx0-HFeNk-Y3UJgeJVhg5NaWXypLkC4y0ADrUBfGAxhvGdRdULZivfvzuVtv6AzW6NRuEE6DM9xpoWX_4here-yvLS2YPiBTZ8xbB3axdM99LhES-n52lVkiX5AWg2JJkEROZzLMpaacA_xlbUz_zbIaOaoqk8gB5oO7kI6sZej3QAdGigQy-hXiRnW_L98d4GQ'
  }
}
