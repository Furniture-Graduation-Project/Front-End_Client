export const imageToBase64 = (url: string) => {
  return new Promise<string>((resolve, reject) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string) 
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
      .catch(reject)
  })
}
