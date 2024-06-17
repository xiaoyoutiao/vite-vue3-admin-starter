export async function uploadFileAPI(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const { json } = await fetch('/server/api/lardmee-base/file/upload', {
    method: 'POST',
    body: formData
  })

  const res = await json()
  console.log('res :>> ', res)
}
