'use client'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHttpClient } from '@/hooks/useHttpClient'

import Button from '../common/Button'
import Icons from '@/assets/icons'

import { STEP_ENUM } from '@/utils/constants'

const Documents = props => {
  const { step, onSubmitHandler } = props
  // const { step, onSubmitHandler, pstId } = props
  const { sendRequest, isLoading } = useHttpClient()
  const [documentsList, setDocumentsList] = useState([])
  const [filesList, setFilesList] = useState([])
  // const [idList, setIdList] = useState([])
  const showScreen = step === STEP_ENUM.DOCUMENTOS

  // TODO: Delete this mock psdId
  const pstId = 18

  useEffect(() => {
    getDocumentsList()
  }, [pstId])

  const getDocumentsList = async () => {
    if (!pstId) return
    const url = `/api/registro/cat_docs/${pstId}`
    try {
      const res = await sendRequest(url)
      if (!res.success) return
      setDocumentsList(res.result.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleFileUpload = (e, id) => {
    const file = e.target.files[0]
    const fileData = {id, file}
    setFilesList([...filesList, fileData])
    // const formData = new FormData()
    // formData.append('file', file)
    // formData.append('id', id)
    // console.log('formData', formData)
    // const url = `/api/registro/cat_docs/${pstId}`
    // try {
    //   const res = await sendRequest(url)
    //   if (!res.success) return
    //   setDocumentsList(res.result.data)
    // } catch (error) {
    //   console.log('error', error)
    // }
  }

  console.log(documentsList)

  return (
    <form
      className={`flex flex-col min-w-fit m-4 sm:w-2/3 gap-6 rounded-lg shadow-xl t-ease p-12 ${
        showScreen ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      <h1 className="font-GMX font-bold text-2xl">DOCUMENTOS</h1>
      {documentsList.map(item => {
        const isDocumentUploaded = true
        return (
          <div key={`i-${item.id}`} className="border-b border-silver pb-4">
            <h2 className="font-GMX font-bold">
              {item.nombre_completo}
              <span className="text-error"> *</span>
            </h2>
            <h3 className="font-GMX text-gray text-sm">{item.descripcion}</h3>
            <div className="flex items-center mt-2">
              {/* {isDocumentUploaded && (
                <Icons.Check className="text-seaGreen mr-1" />
              )} */}
              <input
                type="file"
                accept="image/png, image/jpeg, .pdf"
                className="block w-full text-sm text-black font-GMX file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-GMX file:bg-bigDipORuby file:text-white file:shadow-xl file:cursor-pointer"
                onChange={e => handleFileUpload(e, item.id)}
              />
              {/* {isDocumentUploaded && <Icons.Delete className="text-error" />} */}
            </div>
          </div>
        )
      })}
      <Button content="Siguiente" type="submit" className=" w-full sm:w-auto" />
    </form>
  )
}

export default Documents

Documents.propTypes = {
  documentsList: PropTypes.arrayOf(
    PropTypes.shape({
      documentId: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      fileTypes: PropTypes.string,
      isRequired: PropTypes.bool,
    }),
  ),
  step: PropTypes.number.isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
}
