import { useState, useEffect, useRef } from 'react'

/*
  Nosso hook criado para fazer requisições, recebe o parâmetro url 
  e um objeto options assim como no fetch comum.
*/

const isObjectEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b)
}

export const useFetch = (url, options) => {

    // Estado para variável de resultado e loading
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
		// Flag para executar novamente o useFetch
    const [shouldLoad, setShouldLoad] = useState(false)
    const urlRef = useRef(url);
    const optionsRef = useRef(options)

    useEffect(() => {
				// Flag para capturar mudança do objeto
        let changed = false

        if (!isObjectEqual(url, urlRef.current)) {
            urlRef.current = url
            changed = true
        }

        if (!isObjectEqual(options, optionsRef.current)) {
            optionsRef.current = url
            changed = true
        }
				
				// Muda a flag e executa o useFecth novamente realizando outra requisição
        if (changed) setShouldLoad((s) => !s)

    }, [url, options])

    useEffect(() => {

        let wait = false

        const controller = new AbortController();
        const signal = controller.signal;

        // Registro da execução do useEffect
        console.log('EFFECT:', new Date().toLocaleString());

        // Iniciando Loading como true
        setLoading(true)

        // Requisição
        const fetchData = async () => {

            // Promise para fazer esperar 3 segundos para executar o resto da função
            await new Promise(r => setTimeout(r, 3000))

            try {

                // Pegando os dados da requisição
                const response = await fetch(urlRef.current, { signal, ...optionsRef.current })
                const jsonResult = await response.json()

                if (!wait) {
                    // Alterando o estado das minhas variáveis
                    setResult(jsonResult)
                    setLoading(false)
                }

            } catch (error) {
                if (!wait) setLoading(false);
                throw error
            }
        }


        fetchData()

        return () => {
            wait = true
            controller.abort()
        }

    }, [shouldLoad])

    return [result, loading]
}