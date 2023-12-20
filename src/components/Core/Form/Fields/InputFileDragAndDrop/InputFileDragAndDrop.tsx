import { useState, useMemo } from 'react'

import { FileRejection, useDropzone } from 'react-dropzone'

import { useTheme } from 'styled-components'

import { Button } from 'components/Core/Buttons/Button'
import { Paragraph } from 'components/Core/Typography/Paragraph'
import { HelperText } from 'components/Core/Form/HelperText'

import { UploadBox, UploadWrapper } from './InputFileDragAndDrop.styles'

interface Props {
  disabled: boolean
  onDrop: (file: File) => void
}

export function InputFileDragAndDrop({ disabled, onDrop }: Props) {
  const theme = useTheme()

  const [error, setError] = useState('')

  function getError(errorCode: string) {
    switch (errorCode) {
      case 'file-invalid-type':
        return 'Só é permitido arquivos no formato PDF'

      case 'file-too-large':
        return 'O tamanho máximo permitido para o arquivo é 5MB'

      default:
        return 'Falha no carregamento. Por favor, tente novamente.'
    }
  }

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      maxFiles: 1,
      multiple: false,
      maxSize: 5000000,
      accept: {
        'application/pdf': ['.pdf']
      },
      onFileDialogOpen: () => setError(''),
      onDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (rejectedFiles.length) {
          setError(getError(rejectedFiles[0].errors[0].code))
          return
        }
        onDrop(acceptedFiles[0])
      }
    })

  const style = useMemo(
    () => ({
      ...(isDragAccept
        ? { borderColor: theme.colors.feedback.success.pure }
        : {}),
      ...(isDragReject
        ? { borderColor: theme.colors.feedback.warning.pure }
        : {})
    }),
    [theme, isDragAccept, isDragReject]
  )

  return (
    <UploadWrapper error={!!error}>
      <UploadBox {...getRootProps({ style })} disabled={disabled}>
        <div>
          <input {...getInputProps()} />
          <Button
            type="button"
            styles="primary"
            icon="cloud_upload"
            disabled={disabled}
          >
            Selecionar arquivo
          </Button>

          <Paragraph size="sm" className="mt-3">
            Ou arraste e solte seu arquivo
          </Paragraph>
        </div>
      </UploadBox>

      {error && <HelperText text={error} />}
    </UploadWrapper>
  )
}
