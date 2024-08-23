import * as XLSX from 'xlsx'

self.addEventListener('message', async (event: MessageEvent) => {
  const fileData = event.data as ArrayBuffer
  const workbook = XLSX.read(fileData, { type: 'array' })
  const sheetName = workbook.SheetNames[0]
  const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

  self.postMessage({ sheetName, jsonData })
})
