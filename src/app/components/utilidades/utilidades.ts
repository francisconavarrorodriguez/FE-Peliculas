export function toBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })
}

export function parsearErroresApi(response: any) {
    const resultado: string[] = []
    
    if(response.error){
        if(typeof response.error === 'string'){
            resultado.push(response.error)
        } else if(Array.isArray(response.error)){
            response.error.forEach((valor: any) => resultado.push(valor.description))
        } else {
            const mapaErrores = response.error.errors
            const entradas = Object.entries(mapaErrores)
            entradas.forEach((arreglo: any[]) => {
                const campo = arreglo[0]
                arreglo[1].forEach((mensajeError: any) => {
                    resultado.push(`${campo}: ${mensajeError}`)
                })
            })
        }
    }

    return resultado
}

export function formatearFecha(date: Date){
    date = new Date(date)
    const formato = new Intl.DateTimeFormat('en', {
     year: 'numeric',
     month: '2-digit',
     day: '2-digit'   
    })

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = formato.formatToParts(date)

    return `${year}-${month}-${day}`
}

