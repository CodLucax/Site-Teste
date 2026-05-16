export interface consultaCnpjParams {
    cnpj: string
}
export interface cnpjResult {
    uf: string
    cep: string
    cnpj: string
    nome_fantasia: string
}

const BRASIL_API_URL = 'https://brasilapi.com.br/api/cnpj/v1/'

export async function consultarCnpj(params:consultaCnpjParams): Promise<cnpjResult> {
    const url = BRASIL_API_URL + params.cnpj
    const result = await fetch(url)

    if(!result.ok) {
        if(result.status == 400) {
            throw new Error('Cnpj inválido')
        }
        if(result.status == 404) {
            throw new Error('CNPJ não encontrado')
        }
        throw new Error('Ocorreu um erro ao tentar buscar o CNPJ')
    }

    const resultJson = await result.json()
    return resultJson
} 