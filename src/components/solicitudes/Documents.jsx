'use client'
import React from 'react'
import PropTypes from 'prop-types'
import Icons from '@/assets/icons'
import Button from '../common/Button'

const Documents = props => {
  const { documentsList, step, onSubmitHandler } = props

  return (
    <form
      className={`flex flex-col min-w-fit m-4 sm:w-2/3 gap-6 rounded-lg shadow-xl t-ease p-12 ${
        step === 0 ? '' : 'hide'
      }`}
      onSubmit={onSubmitHandler}>
      {documentsList.map(item => {
        const acceptFiles = item.fileTypes || 'image/png, image/jpeg, .pdf'
        const isDocumentUploaded = true
        return (
          <div
            key={`i-${item.documentId}`}
            className="border-b border-silver pb-4">
            <h2 className="font-GMX font-bold">{item.title}</h2>
            <h3 className="font-GMX text-gray text-sm">{item.subtitle}</h3>
            <div className="flex items-center mt-2">
              {isDocumentUploaded && (
                <Icons.Check className="text-seaGreen mr-1" />
              )}
              <input
                type="file"
                accept={acceptFiles}
                className="block w-full text-sm text-black font-GMX file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-GMX file:bg-bigDipORuby file:text-white file:shadow-xl file:cursor-pointer"
                onChange={e => handleFileUpload(item.documentId)}
              />
              {isDocumentUploaded && <Icons.Delete className="text-error" />}
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
