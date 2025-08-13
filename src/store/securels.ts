import SecureLS from 'secure-ls'
const secureLs = new SecureLS({
    encodingType: import.meta.env.VITE_LS_ENCRYPTION,
    isCompression: import.meta.env.VITE_LS_ENCRYPTION ? true : false,
    encryptionSecret: import.meta.env.VITE_LS_ENCRYPTION_KEY
})

export const SelfStorage = {
    setItem(key: any, value: any) {
        secureLs.set(key, value)
    },
    getItem(key: any) {
        return secureLs.get(key)
    }
}
