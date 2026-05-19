import { useMemo, useState } from 'react'
import { consultarCnpj, type cnpjResult } from './lib/consult-cnpj'
// @ts-ignore: allow importing CSS for side effects without type declarations
import './index.css'
import { Button } from './components/ui/Button'

function App() {
  
  const [cnpj, setCnpj] = useState<string>()
  const [cnpjData, setCnpjData] = useState<cnpjResult>()
  const [cnpjError, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const ableToSearch = useMemo<boolean>(() => {
    // Verifica tamanho da string
    if(cnpj?.length != 14) return false
    // Verifica se é numero
    if(!Number(cnpj)) return false
    
    return true
  }, [cnpj])

  function handleSetCnpj(event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    setCnpj(event.target.value)
  }

  async function handleSearchCnpj() {
    setLoading(true)
    setError(undefined)
    setCnpjData(undefined)
    try {
      if(cnpj == undefined || null) {
        throw new Error('CNPJ obrigatório')
      }
      const resultado = await consultarCnpj({
        cnpj
      })
      setCnpjData(resultado)
      setLoading(false)
    } catch(error: any) {
      setError(error.message as string)
      setLoading(false)
    }
  }
  return (
    <>
      <div>
        <div className='bg-gray-600 text-center p-5'>
          <h1 className='text-3xl text-white'>Consulte o CNPJ</h1>
        </div>

        <section className='flex items-center justify-center p-5 bg-gray-600'>
          <div className='flex justify-start gap-2'>
            <input
              placeholder='Informe o CNPJ'
              className='border-2 rounded-md px-2 py-1 ring-blue-600 bg-gray-100 focus:outline-black border-gray-500 text-gray-900' type="text" value={cnpj} onChange={handleSetCnpj}/>
            <Button label='enviar' onClick={handleSearchCnpj} shortKey='Enter' disabled={loading || !ableToSearch}/>
          </div>
         </section>
         {cnpjError && (
          <div className='text-center p-2 bg-red-400 text-red-900'>
            {cnpjError}
          </div>
         )}
         {loading && (
          <div>Carregando...</div>
         )}
         {cnpjData && (
            <section className='grid grid-cols-1 gap-2 p-2'>
              <div className='border-2 p-2 rounded-md border-gray-500 text-gray-900 bg-gray-200'> UF: {cnpjData?.uf}</div>
              <div className='border-2 p-2 rounded-md border-gray-500 text-gray-900 bg-gray-200'> CEP: {cnpjData?.cep}</div>
              <div className='border-2 p-2 rounded-md border-gray-500 text-gray-900 bg-gray-200'> CNPJ: {cnpjData?.cnpj}</div>
              <div className='border-2 p-2 rounded-md border-gray-500 text-gray-900 bg-gray-200'> NOME_FANTASIA:{cnpjData?.nome_fantasia}</div>
              <div className='border-2 p-2 rounded-md border-gray-500 text-gray-900 bg-gray-200'>
                {cnpjData?.qsa.length > 0 && cnpjData?.qsa.map((item, index) => {
                  return (
                    <div className='border-b-2'>
                      {index+1}
                      <ul>
                        <li>Nome: {item?.nome_socio}</li>
                        <li>Faixa Etária: {item?.faixa_etaria}</li>
                      </ul>
                    </div>
                  )
                })}
              </div>
            </section>
         )}
      </div>
    </>
  )
}

export default App