import type { IMessageContent, IMailPackage, IPart, IBasicPart } from '@/types'
import { ref } from 'vue'
import { decode } from 'js-base64'
import { load } from 'cheerio'

function sanitizeText(text: string) {
  const charMap = {
    А: 'A',
    В: 'B',
    Е: 'E',
    К: 'K',
    М: 'M',
    Н: 'H',
    О: 'O',
    Р: 'P',
    С: 'C',
    Т: 'T',
    У: 'Y',
    Х: 'X',
    Ь: ''
  } as Record<string, string>

  return text.replace(/[А-Я]/gi, (char) => charMap[char] || char)
}

export default function foundPackage(message: IMessageContent) {
  const multipart = ref<IPart>()
  const htmlPart = ref<IBasicPart>()
  const htmlData = ref<string>('')
  const textPart = ref<IBasicPart>()
  const textData = ref<string>('')
  let lastTable = null
  const internalDate = Number(message.internalDate)

  const form = ref<IMailPackage>({
    emailId: message.id,
    tracking: '',
    grossWeight: 0,
    type: '',
    client: '',
    description: '',
    createdAt: internalDate ? new Date(internalDate) : new Date()
  })

  multipart.value = message.payload?.parts.find((p) => p.mimeType === 'multipart/alternative')

  if (multipart.value) {
    textPart.value = multipart.value.parts?.find((p) => p.mimeType === 'text/plain')
    htmlPart.value = multipart.value.parts?.find((p) => p.mimeType === 'text/html')

    if (htmlPart.value && htmlPart.value.body?.data) {
      htmlData.value = decode(htmlPart.value.body.data)
      const $ = load(htmlData.value)
      const allDescriptions = ref<string[]>([])
      lastTable = $('table').last()

      lastTable.find('tr').each(function () {
        const th = $(this).find('th').text().trim()
        const td = $(this).find('td').text().trim()

        if (th.includes('Tracking')) {
          form.value.tracking = td.replace(/\s/g, '')
          form.value.tracking = sanitizeText(form.value.tracking)
        }

        if (th === 'Medio de Envío') {
          form.value.type = td
        }

        if (th === 'Nombre del Cliente') {
          form.value.client = td
        }

        if (th === 'Peso') {
          form.value.grossWeight = Number(td)
        }

        if (th === 'Producto General' || th === 'Producto Especifico' || th === 'Descripción') {
          allDescriptions.value.push(td)
        }
      })

      if (allDescriptions.value.length) {
        form.value.description = allDescriptions.value.join(' | ')
      }
    }

    if (textPart.value && textPart.value.body?.data) {
      textData.value = decode(textPart.value.body.data)
      const match = textData.value.match(/siguiente numero:\s*\*?(\d{1,3}(?:,\d{3})*)\*?/i)

      if (match) {
        form.value.guide = match[1].replace(/,/g, '')
      }
    }
  }

  return form.value
}
