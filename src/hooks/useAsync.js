import { useState, useEffect, useCallback } from 'react'

// Nosso hook para lidar com código assíncrono
export const useAsync = (asyncFunction, shouldRun) => {

    // Estado para manipular o resultado da função assíncrona
    const [state, setState] = useState({
      result: null,
      error: null,
      status: 'idle'
    })
  
    /*
      A função run tem o propósito de executar nossa função assíncrona e 
      gerenciar os estados dessa função
  
      useCallback para memeoizar nossa função run, que só muda quando a função
      a ser executada muda também
    */
    const run = useCallback(() => {
      console.log('EFFECT', new Date().toLocaleString())
  
      setState({
        result: null,
        error: null,
        status: 'pending'
      })
  
      return asyncFunction()
        .then(response => {
          setState({
            result: response,
            error: null,
            status: 'settled'
          })
        })
        .catch(err => {
          setState({
            result: null,
            error: err,
            status: 'error'
          })
        })
    }, [asyncFunction])
  
    // Verificação se o usuário deseja executar a função
    useEffect(() => {
  
      if (shouldRun) run()
  
    }, [run, shouldRun])
  
    return [run, state.result, state.error, state.status]
  }