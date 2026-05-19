export interface consultaCnpjParams {
    cnpj: string
}

// interface usuario: { nome: string, sobrenome: string, activated: boolean, age: number }
// interface listaUsuarios: usuario[]
// Ex: listaExemplo: string[]
// listaExemplo = ['item1', 'item2']

export interface QsaItem {
   pais: string | null
   nome_socio: string
   codigo_pais: number | null
   faixa_etaria: string
   cnpj_cpf_do_socio: string
   qualificacao_socio: string
   codigo_faixa_etaria: number
   data_entrada_sociedade: Date
   identificador_de_socio: number
   cpf_representante_legal: string | null
   nome_representante_legal: string| null
   codigo_qualificacao_socio: number
   qualificacao_representante_legal: string
   codigo_qualificacao_representante_legal: number
}

export interface cnpjResult {
    uf: string
    cep: string
    cnpj: string
    nome_fantasia: string
    qsa: QsaItem[]
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